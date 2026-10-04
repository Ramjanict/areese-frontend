import CardAction from "@/components/shared/CardAction";
import { useState } from "react";
import UserModal from "./UserModal";
export const tableDesign = {
  table:
    "w-full border-separate border-spacing-0 border border-[#EEF2FF] rounded-lg overflow-hidden",
  thead: "bg-[#EEF2FF] text-black",
  tbody: "text-[#101828]",
  tr: "border-b last:border-b-0 border-[#EEF2FF] ",
  th: " text-center! py-3 px-4 text-sm font-bold text-black border-b border-r border-[#EEF2FF] first:rounded-tl-lg last:rounded-tr-lg",
  td: "text-center! py-3 px-4 text-sm text-[#101828] border-b border-r border-[#EEF2FF] last:border-r-0",
};
const tableHeaders = [
  { label: "#", align: "text-center hidden xl:table-cell" },
  { label: "Name", align: "text-left " },
  { label: "Email", align: "text-left hidden lg:table-cell" },
  { label: "role", align: "text-left" },
  { label: "View", align: "text-left hidden lg:table-cell" },
  { label: "Edit", align: "text-left " },
  { label: "Delete", align: "text-left " },
];

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}
export const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "assistant",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "manager",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 5,
    name: "Chris Wilson",
    email: "chris.wilson@example.com",
    role: "assistant",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 6,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    role: "admin",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 7,
    name: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    role: "assistant",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 8,
    name: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    role: "manager",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 9,
    name: "William Thomas",
    email: "william.thomas@example.com",
    role: "assistant",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
  {
    id: 10,
    name: "Ava Jackson",
    email: "ava.jackson@example.com",
    role: "admin",
    password: "Ramjan@123",
    confirmPassword: "Ramjan@123",
  },
];

interface UserListProps {
  users: User[];
  handleDelete: (id: number) => void;
  handleEdit: (user: User) => void;
}
export const UserList: React.FC<UserListProps> = ({
  users,
  handleDelete,
  handleEdit,
}) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <>
      <div className=" bg-white rounded-xl border border-gray-200 overflow-hidden mt-6 ">
        <div className="block w-full overflow-x-auto">
          <table className={tableDesign.table}>
            <thead className={tableDesign.thead}>
              <tr className={tableDesign.tr}>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={` ${header.align} ${tableDesign.th} `}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={tableDesign.tbody}>
              {users.length === 0 ? (
                <tr className={tableDesign.tr}>
                  <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                    No users data
                  </td>
                </tr>
              ) : (
                users.map((assessment, index) => (
                  <tr key={assessment.name} className={tableDesign.tr}>
                    <td className={` hidden xl:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block `}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td
                      onClick={() => {
                        setSelectedUser(assessment);
                        setIsUserModalOpen(true);
                      }}
                      className={` ${tableDesign.td} cursor-pointer `}
                    >
                      {assessment.name}
                    </td>

                    <td className={` ${tableDesign.td} hidden lg:table-cell  `}>
                      {assessment.email}
                    </td>
                    <td className={` ${tableDesign.td} hidden lg:table-cell  `}>
                      {assessment.role}
                    </td>

                    <td className={` ${tableDesign.td}  `}>
                      <div className="flex justify-center">
                        <CardAction
                          onDetails={() => {
                            setSelectedUser(assessment);
                            setIsUserModalOpen(true);
                          }}
                        />
                      </div>
                    </td>
                    <td className={` ${tableDesign.td}  `}>
                      <div className="flex justify-center">
                        <CardAction
                          onEdit={() => {
                            handleEdit(assessment);
                          }}
                        />
                      </div>
                    </td>
                    <td className={` ${tableDesign.td}  `}>
                      <div className="flex justify-center">
                        <CardAction
                          onDelete={() => {
                            handleDelete(assessment.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isUserModalOpen && (
        <UserModal
          user={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
    </>
  );
};
export default UserList;
