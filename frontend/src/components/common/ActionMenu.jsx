import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "../../lib/utils";

function ActionMenu({ children, trigger, ariaLabel, align = "right" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={ariaLabel || (trigger ? "Open menu" : "Open actions menu")}
        className={
          trigger
            ? "flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-[#F8FAFC]"
            : "rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F8FAFC] hover:text-[#1F2937]"
        }
      >
        {trigger ?? <MoreVertical size={18} />}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[#E8EDF3] bg-white py-1 shadow-lg shadow-slate-200/40",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
