import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  setBusinessName,
  setImage,
} from "@/store/dashboardStore/dashboardSlice";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { inputClass } from "../task/CreateDashboardForm";

const BrandingPanel = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setLogo(null);
    setPreview(null);
  };
  const { image, businessName } = useSelector(
    (state: RootState) => state.dashboard,
  );
  const dispatch = useDispatch();

  console.log("image", image);
  console.log("businessName", businessName);
  const handleSave = () => {
    if (preview) {
      dispatch(setImage(preview));
      toast.success("Branding updated successfully");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      <SectionHeader
        title="Workspace Branding"
        description="Upload a logo and choose a color to personalize booking pages and
        dashboards."
      />
      <div className="space-y-5 mt-4">
        <div>
          <label className={inputClass.label}>Business Name</label>
          <input
            onChange={(e) => dispatch(setBusinessName(e.target.value))}
            type="text"
            placeholder="Business Name"
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>Logo</label>
          <div className="flex items-center gap-3 mb-2">
            <label className="cursor-pointer px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Choose file
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif,.svg,.webp"
                onChange={handleFileChange}
              />
            </label>

            <span className="text-sm text-text">
              {logo ? logo.name : "No file chosen"}
            </span>
          </div>
          <p className="text-xs text-text mb-2">
            Upload a logo image (max 2MB, formats: JPEG, PNG, GIF, SVG, WebP)
          </p>
        </div>

        <div className="w-24 h-24 bg-bg rounded border border-dashed border-border flex items-center justify-center mb-5 relative">
          {preview ? (
            <>
              <img
                src={preview}
                alt="logo preview"
                className="w-full h-full object-cover rounded"
              />

              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full cursor-pointer"
              >
                ×
              </button>
            </>
          ) : image ? (
            <img
              src={preview || image}
              alt="logo preview"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <span className="text-xs text-today-accent p-1 h-5! w-full ">
              Logo preview
            </span>
          )}
        </div>

        <CommonButton onClick={handleSave} className="">
          Update
        </CommonButton>
      </div>
    </div>
  );
};

export default BrandingPanel;
