import CommonButton from "@/components/shared/CommonButton";
import CommonSelect from "@/components/shared/CommonSelect";
import SectionHeader from "@/components/shared/SectionHeader";
import type { FC } from "react";
import { inputClass } from "../task/CreateDashboardForm";
import { initialBlogs, type Blog } from "./BlogList";
import CKStyleEditor from "./CKStyleEditor";

import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export const blogSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  status: z.string().min(1, "Status is required"),
  img: z.string().min(1, "Image is required"),
  content: z.string().min(1, "Content is required"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

interface CreateBlogProps {
  onCancel: () => void;
  defaultValues?: any;
  onSave: (data: any) => void;
  selectBlog: Blog | null;
}

const categoryOptions = initialBlogs.map((blog) => ({
  label: blog.category,
  value: blog.category,
}));

const CreateBlogForm: FC<CreateBlogProps> = ({
  onCancel,
  onSave,
  selectBlog,
  defaultValues,
}) => {
  const [content, setContent] = useState(defaultValues?.content || "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.img && typeof defaultValues.img === "string"
      ? defaultValues.img
      : null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValues || {
      category: "",
      title: "",
      slug: "",
      shortDescription: "",
      status: "active",
      img: "",
      content: "",
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    await new Promise((res) => setTimeout(res, 600));
    if (selectBlog) {
      toast.success("Blog updated successfully");
    } else {
      toast.success("Blog created successfully");
    }
    onSave({
      ...data,
      content,
      img: imagePreview ?? "",
    });
  };

  return (
    <div>
      <form className={inputClass.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title={selectBlog ? "Update blog" : "Create blog"}
          description={selectBlog ? "Update a blog" : "Add a new blog"}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Category</label>
              <CommonSelect
                item={categoryOptions}
                value={watch("category")}
                placeholder="Select Category"
                onValueChange={(val) => setValue("category", val)}
                className="w-full"
              />
              {errors.category && (
                <p className={inputClass.error}>{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Title</label>
              <input
                type="text"
                placeholder="Enter title"
                className={inputClass.input}
                {...register("title")}
              />
              {errors.title && (
                <p className={inputClass.error}>{errors.title.message}</p>
              )}
            </div>

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className={inputClass.label}>Slug</label>
                <input
                  type="text"
                  placeholder="Enter slug"
                  className={inputClass.input}
                  {...register("slug")}
                />
                {errors.slug && (
                  <p className={inputClass.error}>{errors.slug.message}</p>
                )}
              </div>
              <CommonButton type="button" className="py-2.5!">
                Generate slug
              </CommonButton>
            </div>

            <div>
              <label className={inputClass.label}>Short Description</label>
              <input
                type="text"
                placeholder="Enter short description"
                className={inputClass.input}
                {...register("shortDescription")}
              />
              {errors.shortDescription && (
                <p className={inputClass.error}>
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            <div className="">
              <label className={inputClass.label}>Images</label>
              {imagePreview ? (
                <div className="relative w-full h-60 rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setValue("img", "");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className={inputClass.input}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const result = reader.result as string;
                        setImagePreview(result);
                        setValue("img", result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              )}
              {errors.img && (
                <p className={inputClass.error}>{errors.img.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Status</label>
              <CommonSelect
                item={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                value={watch("status")}
                placeholder="Select Status"
                onValueChange={(val) => setValue("status", val)}
                className="w-full"
              />
              {errors.status && (
                <p className={inputClass.error}>{errors.status.message}</p>
              )}
            </div>
          </div>

          <CKStyleEditor
            value={content}
            onChange={(val) => {
              setContent(val);
              setValue("content", val);
            }}
          />
          {errors.content && (
            <p className={inputClass.error}>{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <CommonButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <ButtonWithLoading
                title={selectBlog ? "Updating..." : "Creating..."}
              />
            ) : selectBlog ? (
              "Update blog"
            ) : (
              "Create blog"
            )}
          </CommonButton>

          <CommonButton onClick={onCancel} variant="secondary">
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
