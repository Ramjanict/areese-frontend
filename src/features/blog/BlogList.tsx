import CardAction from "@/components/shared/CardAction";
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
  { label: "Category", align: "text-left " },
  { label: "img", align: "text-left hidden sm:table-cell " },
  { label: "title", align: "text-left hidden sm:table-cell" },
  { label: "Slug", align: "text-left hidden lg:table-cell " },
  { label: "Status", align: "text-left hidden md:table-cell" },

  { label: "Edit", align: "text-left " },
  { label: "Delete", align: "text-left " },
];

export type Blog = {
  id: number;
  category: string;
  img: string;
  title: string;
  slug: string;
  status: string;
};
export const initialBlogs: Blog[] = [
  {
    id: 1,
    category: "Technology",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Latest AI Innovations",
    slug: "latest-ai-innovations",
    status: "active",
  },
  {
    id: 2,
    category: "Health",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    title: "Healthy Living Tips",
    slug: "healthy-living-tips",
    status: "active",
  },
  {
    id: 3,

    category: "Business",
    img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    title: "Startup Growth Strategies",
    slug: "startup-growth-strategies",
    status: "inactive",
  },
  {
    id: 4,
    category: "Education",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    title: "Online Learning Platforms",
    slug: "online-learning-platforms",
    status: "active",
  },
  {
    id: 5,
    category: "Travel",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Top Beach Destinations",
    slug: "top-beach-destinations",
    status: "active",
  },
  {
    id: 6,
    category: "Food",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "Delicious Street Foods",
    slug: "delicious-street-foods",
    status: "inactive",
  },
  {
    id: 7,
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    title: "Summer Fashion Trends",
    slug: "summer-fashion-trends",
    status: "active",
  },
  {
    id: 8,
    category: "Sports",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    title: "Football Championship Highlights",
    slug: "football-championship-highlights",
    status: "active",
  },
  {
    id: 9,
    category: "Photography",
    img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    title: "Landscape Photography Guide",
    slug: "landscape-photography-guide",
    status: "inactive",
  },
  {
    id: 10,
    category: "Lifestyle",
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
    title: "Minimalist Lifestyle Tips",
    slug: "minimalist-lifestyle-tips",
    status: "active",
  },
];

interface BlogListProps {
  blogs: Blog[];
  handleDelete: (id: number) => void;
  handleEdit: (user: Blog) => void;
}
export const BlogList: React.FC<BlogListProps> = ({
  blogs,
  handleDelete,
  handleEdit,
}) => {
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
              {blogs.length === 0 ? (
                <tr className={tableDesign.tr}>
                  <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                    No blogs data
                  </td>
                </tr>
              ) : (
                blogs.map((assessment, index) => (
                  <tr key={assessment.slug} className={tableDesign.tr}>
                    <td className={` hidden xl:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block `}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td className={` ${tableDesign.td}  `}>
                      {assessment.category}
                    </td>
                    <td className={`${tableDesign.td} hidden sm:table-cell`}>
                      <div className="w-12 h-12 mx-auto  overflow-hidden rounded-full">
                        <img
                          className="w-full h-full object-cover"
                          src={assessment.img}
                          alt={assessment.title}
                        />
                      </div>
                    </td>

                    <td className={` ${tableDesign.td}   hidden sm:table-cell`}>
                      {assessment.title}
                    </td>
                    <td className={` ${tableDesign.td} hidden lg:table-cell  `}>
                      {assessment.slug}
                    </td>
                    <td className={` ${tableDesign.td} hidden md:table-cell  `}>
                      <div>
                        <span
                          className={`${assessment.status === "active" ? "bg-info  " : "bg-cta "} text-white px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block `}
                        >
                          {assessment.status}
                        </span>
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
    </>
  );
};
export default BlogList;
