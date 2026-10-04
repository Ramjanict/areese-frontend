import React, { useEffect, useRef, useState } from "react";
import { BiPaste } from "react-icons/bi";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiAnchor,
  FiBold,
  FiCheckSquare,
  FiCircle,
  FiClipboard,
  FiCode,
  FiCopy,
  FiEye,
  FiFile,
  FiGrid,
  FiHelpCircle,
  FiImage,
  FiItalic,
  FiLayout,
  FiLink,
  FiLink2,
  FiMaximize2,
  FiMinus,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiSave,
  FiScissors,
  FiSearch,
  FiSmile,
  FiTable,
  FiUnderline,
} from "react-icons/fi";
import {
  MdFormatClear,
  MdFormatIndentDecrease,
  MdFormatIndentIncrease,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdLinkOff,
  MdPageview,
  MdSubscript,
  MdSuperscript,
} from "react-icons/md";
import { inputClass } from "../task/CreateDashboardForm";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TBtnProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

interface TDropOption {
  value: string;
  label: string;
}

interface TDropProps {
  value: string;
  onChange: (val: string) => void;
  options: TDropOption[];
  width?: string; // Tailwind width class e.g. "w-20"
}

interface ColorBtnProps {
  title: string;
  color: string;
  onChange: (color: string) => void;
  label: string;
}

interface ActiveFormats {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeThrough: boolean;
  insertUnorderedList: boolean;
  insertOrderedList: boolean;
  justifyLeft: boolean;
  justifyCenter: boolean;
  justifyRight: boolean;
  justifyFull: boolean;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────
const TBtn: React.FC<TBtnProps> = ({
  title,
  active = false,
  onClick,
  disabled = false,
  children,
}) => {
  const [hov, setHov] = useState<boolean>(false);

  const borderClass = active
    ? "border border-[#91a0b3]"
    : hov
      ? "border border-[#aab3be]"
      : "border border-transparent";

  const bgClass = active
    ? "bg-gradient-to-b from-[#dce4ed] to-[#c8d2dc]"
    : hov
      ? "bg-gradient-to-b from-[#f5f8fa] to-[#e4eaf0]"
      : "bg-transparent";

  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!disabled) onClick?.();
      }}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={[
        "inline-flex items-center justify-center",
        "w-[22px] h-[22px] p-px my-px",
        "rounded-[2px] flex-shrink-0 outline-none box-border",
        borderClass,
        bgClass,
        disabled ? "opacity-[0.38] cursor-default" : "cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
};

// ─── Separator ────────────────────────────────────────────────────────────────
const Sep: React.FC = () => (
  <span className="inline-block w-px h-[17px] bg-bg mx-[3px] align-middle flex-shrink-0" />
);

// ─── Toolbar Dropdown ─────────────────────────────────────────────────────────
const TDrop: React.FC<TDropProps> = ({
  value,
  onChange,
  options,
  width = "w-20",
}) => (
  <select
    value={value}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange(e.target.value)
    }
    onMouseDown={(e: React.MouseEvent<HTMLSelectElement>) =>
      e.stopPropagation()
    }
    className={[
      width,
      "h-[22px] mx-0.5 px-1 pr-[14px]",
      "text-[11px] font-[Tahoma,Arial,sans-serif] text-[#333]",
      "border border-border rounded-[2px] bg-white",
      "cursor-pointer outline-none appearance-none",
    ].join(" ")}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='7' height='4'%3E%3Cpath d='M0 0l3.5 4L7 0z' fill='%23555'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 3px center",
    }}
  >
    {options.map((o: TDropOption) => (
      <option key={o.value + o.label} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

// ─── Color Button ─────────────────────────────────────────────────────────────
const ColorBtn: React.FC<ColorBtnProps> = ({
  title,
  color,
  onChange,
  label,
}) => (
  <span
    title={title}
    className="inline-flex flex-col items-center cursor-pointer relative px-0.5 py-px"
  >
    <span
      className="font-bold font-serif text-text leading-none"
      style={{ fontSize: label.length > 1 ? 9 : 11 }}
    >
      {label}
    </span>
    <span className="relative inline-block">
      <input
        type="color"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer border-none"
      />
      <span
        className="block w-[15px] h-1 border border-border mt-px"
        style={{ background: color }}
      />
    </span>
  </span>
);

interface CKStyleEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}
const CKStyleEditor: React.FC<CKStyleEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSel = useRef<Range | null>(null);

  const [activeFormats, setActiveFormats] = useState<ActiveFormats>({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
  });
  const [showSource, setShowSource] = useState<boolean>(false);
  const [sourceVal, setSourceVal] = useState<string>("");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [textColor, setTextColor] = useState<string>("#000000");
  const [hlColor, setHlColor] = useState<string>("#ffff00");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  const [blockStyle, setBlockStyle] = useState<string>("p");
  const [blockFormat, setBlockFormat] = useState<string>("p");
  const [showLink, setShowLink] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");

  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);
  const updateFormats = (): void => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
      justifyFull: document.queryCommandState("justifyFull"),
    });

    // ✅ ADD THIS
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const pushUndo = (): void => {
    setUndoStack((p: string[]) => [
      ...p.slice(-50),
      editorRef.current?.innerHTML ?? "",
    ]);
    setRedoStack([]);
  };

  const exec = (cmd: string, val: string | null = null): void => {
    pushUndo();
    editorRef.current?.focus();
    document.execCommand(cmd, false, val ?? undefined);
    updateFormats();
  };

  const handleUndo = (): void => {
    if (!undoStack.length) return;
    setRedoStack((r: string[]) => [...r, editorRef.current?.innerHTML ?? ""]);
    const prev = undoStack[undoStack.length - 1];
    setUndoStack((u: string[]) => u.slice(0, -1));
    if (editorRef.current) editorRef.current.innerHTML = prev;
  };

  const handleRedo = (): void => {
    if (!redoStack.length) return;
    setUndoStack((u: string[]) => [...u, editorRef.current?.innerHTML ?? ""]);
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r: string[]) => r.slice(0, -1));
    if (editorRef.current) editorRef.current.innerHTML = next;
  };

  const toggleSource = (): void => {
    if (!showSource) setSourceVal(editorRef.current?.innerHTML ?? "");
    else if (editorRef.current) editorRef.current.innerHTML = sourceVal;
    setShowSource((s: boolean) => !s);
  };

  const insertLink = (): void => {
    if (savedSel.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSel.current);
      }
    }
    exec(
      "createLink",
      linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`,
    );
    setShowLink(false);
    setLinkUrl("");
  };

  // Shared toolbar row classes
  const rowCls =
    "flex flex-wrap items-center px-1 py-0.5 border-b border-[#d0d8e0] bg-gradient-to-b from-[#f8f9fa] to-[#edf0f3] min-h-[28px]";
  const iconSize = 13;

  return (
    <div className="font-[Tahoma,Arial,sans-serif] text-xs  flex flex-col items-center justify-center">
      <div className="w-full">
        {/* Label */}
        <div className={inputClass.label}>Details</div>

        {/* Editor container */}
        <div className="border border-border bg-white shadow-[1px_1px_4px_rgba(0,0,0,0.12)]">
          {/* ── ROW 1 ── */}
          <div className={rowCls}>
            <TBtn title="Source" active={showSource} onClick={toggleSource}>
              <FiCode size={iconSize} color="#444" />
            </TBtn>
            <Sep />
            <TBtn title="Save">
              <FiSave size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="New Document">
              <FiFile size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Preview">
              <FiEye size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Print">
              <FiPrinter size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Templates">
              <FiLayout size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Cut">
              <FiScissors size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Copy">
              <FiCopy size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Paste">
              <FiClipboard size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Paste as Plain Text">
              <BiPaste size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Paste from Word">
              <span className="text-[9px] font-bold text-[#2b5797] leading-none">
                W
              </span>
            </TBtn>
            <Sep />
            <TBtn
              title="Undo (Ctrl+Z)"
              onClick={handleUndo}
              disabled={!undoStack.length}
            >
              <FiRotateCcw size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Redo (Ctrl+Y)"
              onClick={handleRedo}
              disabled={!redoStack.length}
            >
              <FiRotateCw size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Find">
              <FiSearch size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Find & Replace">
              <FiSearch size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Select All" onClick={() => exec("selectAll")}>
              <FiGrid size={iconSize} color="#aaa" />
            </TBtn>
            <TBtn title="Spell Check">
              <span className="text-[8px] font-[Arial] text-[#555] leading-none">
                abc
              </span>
            </TBtn>
            <Sep />
            <TBtn title="Checkbox">
              <FiCheckSquare size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Radio">
              <FiCircle size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Insert Table">
              <FiTable size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Insert Horizontal Line"
              onClick={() => exec("insertHorizontalRule")}
            >
              <FiMinus size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Insert Special Character">
              <span className="text-[11px] font-serif text-[#555] leading-none">
                Ω
              </span>
            </TBtn>
            <Sep />
            <TBtn title="Insert Image">
              <FiImage size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Maximize">
              <FiMaximize2 size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Show Blocks">
              <FiGrid size={iconSize} color="#888" />
            </TBtn>
          </div>

          {/* ── ROW 2 ── */}
          <div className={rowCls}>
            <TBtn
              title="Bold (Ctrl+B)"
              active={activeFormats.bold}
              onClick={() => exec("bold")}
            >
              <FiBold size={iconSize} color="#222" />
            </TBtn>
            <TBtn
              title="Italic (Ctrl+I)"
              active={activeFormats.italic}
              onClick={() => exec("italic")}
            >
              <FiItalic size={iconSize} color="#222" />
            </TBtn>
            <TBtn
              title="Underline (Ctrl+U)"
              active={activeFormats.underline}
              onClick={() => exec("underline")}
            >
              <FiUnderline size={iconSize} color="#222" />
            </TBtn>
            <TBtn
              title="Strikethrough"
              active={activeFormats.strikeThrough}
              onClick={() => exec("strikeThrough")}
            >
              <MdFormatStrikethrough size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn title="Subscript" onClick={() => exec("subscript")}>
              <MdSubscript size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn title="Superscript" onClick={() => exec("superscript")}>
              <MdSuperscript size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn
              title="Remove Formatting"
              onClick={() => exec("removeFormat")}
            >
              <MdFormatClear size={iconSize + 2} color="#c00" />
            </TBtn>
            <Sep />
            <TBtn
              title="Bullet List"
              active={activeFormats.insertUnorderedList}
              onClick={() => exec("insertUnorderedList")}
            >
              <MdFormatListBulleted size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn
              title="Numbered List"
              active={activeFormats.insertOrderedList}
              onClick={() => exec("insertOrderedList")}
            >
              <MdFormatListNumbered size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn title="Decrease Indent" onClick={() => exec("outdent")}>
              <MdFormatIndentDecrease size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn title="Increase Indent" onClick={() => exec("indent")}>
              <MdFormatIndentIncrease size={iconSize + 2} color="#555" />
            </TBtn>
            <TBtn
              title="Blockquote"
              onClick={() => exec("formatBlock", "blockquote")}
            >
              <MdFormatQuote size={iconSize + 2} color="#bbb" />
            </TBtn>
            <TBtn title="Insert Div">
              <FiGrid size={iconSize} color="#888" />
            </TBtn>
            <Sep />
            <TBtn
              title="Align Left"
              active={activeFormats.justifyLeft}
              onClick={() => exec("justifyLeft")}
            >
              <FiAlignLeft size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Center"
              active={activeFormats.justifyCenter}
              onClick={() => exec("justifyCenter")}
            >
              <FiAlignCenter size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Align Right"
              active={activeFormats.justifyRight}
              onClick={() => exec("justifyRight")}
            >
              <FiAlignRight size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Justify"
              active={activeFormats.justifyFull}
              onClick={() => exec("justifyFull")}
            >
              <FiAlignJustify size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Left to Right">
              <span className="text-[9px] text-[#555] font-mono">LTR→</span>
            </TBtn>
            <TBtn title="Right to Left">
              <span className="text-[9px] text-[#555] font-mono">←RTL</span>
            </TBtn>
            <Sep />
            <TBtn
              title="Insert/Edit Link"
              onClick={() => {
                const sel = window.getSelection();
                if (sel?.rangeCount)
                  savedSel.current = sel.getRangeAt(0).cloneRange();
                setShowLink((s: boolean) => !s);
              }}
            >
              <FiLink size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Remove Link" onClick={() => exec("unlink")}>
              <MdLinkOff size={iconSize + 2} color="#c00" />
            </TBtn>
            <TBtn title="Anchor">
              <FiAnchor size={iconSize} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Insert Image">
              <FiImage size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Table">
              <FiTable size={iconSize} color="#555" />
            </TBtn>
            <TBtn
              title="Insert Horizontal Rule"
              onClick={() => exec("insertHorizontalRule")}
            >
              <FiMinus size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Page Break">
              <MdPageview size={iconSize + 2} color="#555" />
            </TBtn>
            <Sep />
            <TBtn title="Insert Smiley">
              <FiSmile size={iconSize} color="#f90" />
            </TBtn>
            <TBtn title="Special Character">
              <span className="text-[11px] font-serif text-[#555]">Ω</span>
            </TBtn>
            <TBtn title="Iframe">
              <FiLink2 size={iconSize} color="#555" />
            </TBtn>
          </div>

          {/* ── ROW 3 ── */}
          <div className={`${rowCls} !border-b border-[#b8c8d8]`}>
            <TDrop
              value={blockStyle}
              width="w-[90px]"
              onChange={(v: string) => {
                setBlockStyle(v);
                exec("formatBlock", v);
              }}
              options={[
                { value: "p", label: "Styles" },
                { value: "h1", label: "Heading 1" },
                { value: "h2", label: "Heading 2" },
                { value: "h3", label: "Heading 3" },
                { value: "pre", label: "Preformatted" },
              ]}
            />
            <TDrop
              value={blockFormat}
              width="w-[90px]"
              onChange={(v: string) => {
                setBlockFormat(v);
                exec("formatBlock", v);
              }}
              options={[
                { value: "p", label: "Format" },
                { value: "p", label: "Paragraph" },
                { value: "h1", label: "Heading 1" },
                { value: "h2", label: "Heading 2" },
                { value: "h3", label: "Heading 3" },
                { value: "div", label: "Div" },
              ]}
            />
            <TDrop
              value={fontFamily}
              width="w-[108px]"
              onChange={(v: string) => {
                setFontFamily(v);
                exec("fontName", v);
              }}
              options={[
                { value: "", label: "Font" },
                { value: "Arial,sans-serif", label: "Arial" },
                { value: "Georgia,serif", label: "Georgia" },
                { value: "Tahoma,sans-serif", label: "Tahoma" },
                { value: "Verdana,sans-serif", label: "Verdana" },
                { value: "'Times New Roman',serif", label: "Times New Roman" },
                { value: "'Courier New',monospace", label: "Courier New" },
              ]}
            />
            <TDrop
              value={fontSize}
              width="w-[64px]"
              onChange={(v: string) => {
                setFontSize(v);
                exec("fontSize", v);
              }}
              options={[
                { value: "", label: "Size" },
                { value: "1", label: "8pt" },
                { value: "2", label: "10pt" },
                { value: "3", label: "12pt" },
                { value: "4", label: "14pt" },
                { value: "5", label: "18pt" },
                { value: "6", label: "24pt" },
                { value: "7", label: "36pt" },
              ]}
            />
            <Sep />
            <ColorBtn
              title="Text Color"
              color={textColor}
              onChange={(c: string) => {
                setTextColor(c);
                exec("foreColor", c);
              }}
              label="A"
            />
            <ColorBtn
              title="Background/Highlight Color"
              color={hlColor}
              onChange={(c: string) => {
                setHlColor(c);
                exec("hiliteColor", c);
              }}
              label="ab"
            />
            <Sep />
            <TBtn title="Maximize">
              <FiMaximize2 size={iconSize} color="#555" />
            </TBtn>
            <TBtn title="Show Blocks">
              <FiGrid size={iconSize} color="#888" />
            </TBtn>
            <Sep />
            <TBtn title="Help">
              <FiHelpCircle size={iconSize} color="#555" />
            </TBtn>
          </div>

          {/* ── Link Bar ── */}
          {showLink && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#fffbe6] border-b border-[#d4bc00]">
              <span className="text-[11px] text-[#555]">URL:</span>
              <input
                autoFocus
                value={linkUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLinkUrl(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") insertLink();
                }}
                placeholder="https://..."
                className="flex-1 h-5 text-[11px] border border-[#a0a8b0] rounded-[2px] px-1 font-[Tahoma,Arial,sans-serif] outline-none"
              />
              <button
                onClick={insertLink}
                className="h-[22px] px-2.5 text-[11px] bg-[#4a76a8] text-white border-none rounded-[2px] cursor-pointer hover:bg-[#3d6490]"
              >
                Insert
              </button>
              <button
                onClick={() => setShowLink(false)}
                className="h-[22px] px-2 text-[11px] bg-[#e0e0e0] border border-[#aaa] rounded-[2px] cursor-pointer hover:bg-[#d0d0d0]"
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── Content Area ── */}
          {showSource ? (
            <textarea
              value={sourceVal}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setSourceVal(e.target.value)
              }
              className="w-full min-h-[220px] p-2.5 box-border font-['Courier_New',monospace] text-xs border-none resize-y outline-none bg-white text-[#333] leading-relaxed"
            />
          ) : (
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateFormats}
              onKeyUp={updateFormats}
              onMouseUp={updateFormats}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.ctrlKey || e.metaKey) {
                  if (e.key === "z") {
                    e.preventDefault();
                    handleUndo();
                  }
                  if (e.key === "y") {
                    e.preventDefault();
                    handleRedo();
                  }
                  if (e.key === "b") {
                    e.preventDefault();
                    exec("bold");
                  }
                  if (e.key === "i") {
                    e.preventDefault();
                    exec("italic");
                  }
                  if (e.key === "u") {
                    e.preventDefault();
                    exec("underline");
                  }
                }
              }}
              className="min-h-[220px] px-2.5 py-2 outline-none font-[Tahoma,Arial,sans-serif] text-[13px] text-[#333] leading-[1.65] bg-white cursor-text"
            />
          )}
        </div>
      </div>

      <style>{`
        [contenteditable] h1 { font-size:2em; font-weight:bold; margin:.4em 0 }
        [contenteditable] h2 { font-size:1.5em; font-weight:bold; margin:.4em 0 }
        [contenteditable] h3 { font-size:1.17em; font-weight:bold; margin:.4em 0 }
        [contenteditable] h4 { font-size:1em; font-weight:bold; margin:.3em 0 }
        [contenteditable] blockquote { border-left:3px solid #ccc; margin:.5em 0; padding-left:1em; color:#666 }
        [contenteditable] pre { background:#f5f5f5; border:1px solid #ddd; padding:8px; font-family:'Courier New',monospace; font-size:12px }
        [contenteditable] ul { list-style:disc; padding-left:2em }
        [contenteditable] ol { list-style:decimal; padding-left:2em }
        [contenteditable] a { color:#0066cc }
        [contenteditable] hr { border:none; border-top:1px solid #ccc; margin:.5em 0 }
      `}</style>
    </div>
  );
};

export default CKStyleEditor;
