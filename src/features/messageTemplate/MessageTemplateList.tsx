import SectionHeader from "@/components/shared/SectionHeader";
import { brandColors } from "@/components/shared/StatCards";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { templateData } from "./data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
        copied ? "completed-bg-500 text-white" : "bg-cta  text-white"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 text-white" />
          Copy
        </>
      )}
    </button>
  );
}
const MessageTemplateList = () => {
  const [openId, setOpenId] = useState<string | null>(
    "appointment-confirmations",
  );

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="">
      <SectionHeader title="Template List" />
      <div className="p-4 space-y-2">
        {templateData.map((section) => {
          const isOpen = openId === section.id;

          return (
            <div
              key={section.id}
              className="rounded-xl overflow-hidden border border-border shadow-sm"
            >
              <button
                onClick={() => toggle(section.id)}
                className={`w-full flex items-center cursor-pointer justify-between px-4 py-3 text-left transition-colors duration-200 group ${
                  isOpen
                    ? "bg-cta"
                    : "bg-white hover:bg-cta/90 hover:text-white"
                }`}
              >
                <span
                  className={` ${isOpen ? "text-white" : ""}  text-sm font-medium`}
                >
                  {section.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4   transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 text-white"
                      : " text-text group-hover:text-white "
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.templates.map((tpl, i) => {
                      const bgColor = brandColors[i % brandColors.length];

                      return (
                        <div
                          key={tpl.title}
                          className={`${bgColor} border border-border rounded-lg p-4 bg-50 flex flex-col gap-3`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-text leading-tight">
                              {tpl.title}
                            </h3>
                            <CopyButton text={tpl.body} />
                          </div>
                          <p className="text-xs text-text leading-relaxed">
                            {tpl.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MessageTemplateList;
