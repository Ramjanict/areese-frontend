import DashboardSearch from "@/components/shared/DashboardSearch";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import CreateUser from "@/features/user/CreateUser";
import UserList, { initialUsers, type User } from "@/features/user/UserList";
import { useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [isUserCreated, setIsUserCreated] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [users, setUsers] = useState(initialUsers);
  const [selectUser, setSelectUser] = useState<User | null>(null);


  const filteredUsers = users.filter((plan) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      plan.name.toLowerCase().includes(keyword) ||
      plan.email.toLowerCase().includes(keyword) ||
      plan.role.toLowerCase().includes(keyword)
    );
  });
  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setSelectUser(null);
    toast.success("User deleted successfully");
  };

  const handleEdit = (user: User) => {
    setSelectUser(user);
    setIsUserCreated(true);
  };
  type PlanInput = Omit<User, "id">;
  const handleSave = (data: PlanInput) => {
    if (selectUser) {
      setUsers((prev) =>
        prev.map((p) => (p.id === selectUser.id ? { ...p, ...data } : p)),
      );
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...data }]);
    }

    setSelectUser(null);
    setIsUserCreated(false);
  };

  // handle pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUser = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <div>
      {isUserCreated ? (
        <CreateUser
          onCancel={() => {
            setIsUserCreated(false);
            setSelectUser(null);
          }}
          onSave={handleSave}
          defaultValues={selectUser}
          selectUser={selectUser}
        />
      ) : (
        <>
          <DashboardTopSection
            title="User"
            description="View and manage all your users efficiently"
            buttonText="Create user"
            action={() => setIsUserCreated(true)}
          />

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <SectionHeader
              title="User List"
              description="Here the all user list will be shown"
            />
            <DashboardSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <UserList
            users={paginatedUser}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />

          {paginatedUser?.length > 0 && (
            <div className="my-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
