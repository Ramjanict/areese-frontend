import DashboardSearch from "@/components/shared/DashboardSearch";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import BlogList, { initialBlogs, type Blog } from "@/features/blog/BlogList";
import CreateBlogForm from "@/features/blog/CreateBlogForm";
import { useState } from "react";
import { toast } from "react-toastify";

const Blogs = () => {
  const [isBlogCreated, setIsBlogCreated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectBlog, setSelectBlog] = useState<Blog | null>(null);

  const filteredCategories = blogs.filter((blog) => {
    const keyword = debouncedSearch.toLowerCase();
    return (
      blog.category.toLowerCase().includes(keyword) ||
      blog.status.toLowerCase().includes(keyword) ||
      blog.title.toLowerCase().includes(keyword) ||
      blog.slug.toLowerCase().includes(keyword)
    );
  });

  const handleDelete = (id: number) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    setSelectBlog(null);
    toast.success("Blog deleted successfully");
  };

  const handleEdit = (blog: Blog) => {
    setSelectBlog(blog);
    setIsBlogCreated(true);
  };

  const handleSave = (data: Omit<Blog, "id">) => {
    if (selectBlog) {
      setBlogs((prev) =>
        prev.map((p) => (p.id === selectBlog.id ? { ...p, ...data } : p)),
      );
    } else {
      setBlogs((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    setSelectBlog(null);
    setIsBlogCreated(false);
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
      {isBlogCreated ? (
        <CreateBlogForm
          onCancel={() => {
            setIsBlogCreated(false);
            setSelectBlog(null);
          }}
          onSave={handleSave}
          defaultValues={selectBlog}
          selectBlog={selectBlog}
        />
      ) : (
        <>
          <DashboardTopSection
            title="Blogs"
            description="View and manage all your blogs efficiently"
            buttonText="Create blog"
            action={() => setIsBlogCreated(true)}
          />
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <SectionHeader
              title="Blogs List"
              description="Here the all blogs list will be shown"
            />
            <DashboardSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <BlogList
            blogs={paginatedCategory}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
