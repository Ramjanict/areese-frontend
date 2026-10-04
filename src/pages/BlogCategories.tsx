import DashboardSearch from "@/components/shared/DashboardSearch";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import CategoryList, {
  initialCategories,
  type Category,
} from "@/features/Category/CategoryList";
import CreateCategory from "@/features/Category/CreateCategory";
import { useState } from "react";
import { toast } from "react-toastify";

const BlogCategories = () => {
  const [isCategoryCreated, setIsCategoryCreated] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [categories, setCategories] = useState(initialCategories);
  const [selectCategory, setSelectCategory] = useState<Category | null>(null);

  // handle search

  const filteredCategories = categories.filter((category) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      category.name.toLowerCase().includes(keyword) ||
      category.status.toLowerCase().includes(keyword)
    );
  });
  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
    setSelectCategory(null);
    toast.success("Category deleted successfully");
  };

  const handleEdit = (category: Category) => {
    setSelectCategory(category);
    setIsCategoryCreated(true);
  };
  type PlanInput = Omit<Category, "id">;
  const handleSave = (data: PlanInput) => {
    if (selectCategory) {
      setCategories((prev) =>
        prev.map((p) => (p.id === selectCategory.id ? { ...p, ...data } : p)),
      );
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), ...data }]);
    }

    setSelectCategory(null);
    setIsCategoryCreated(false);
  };

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategory = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <div>
      {isCategoryCreated ? (
        <CreateCategory
          onCancel={() => {
            setIsCategoryCreated(false);
            setSelectCategory(null);
          }}
          onSave={handleSave}
          defaultValues={selectCategory}
          selectCategory={selectCategory}
        />
      ) : (
        <>
          <DashboardTopSection
            title="Category"
            description="View and manage all your category efficiently"
            buttonText="Create Category"
            action={() => setIsCategoryCreated(true)}
          />

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <SectionHeader
              title="Category List"
              description="Here the all user list will be shown"
            />
            <DashboardSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <CategoryList
            category={paginatedCategory}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {paginatedCategory.length > 0 && (
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

export default BlogCategories;
