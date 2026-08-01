import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const SIZE_CLASSES = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  full: "max-w-6xl",
};

function Modal({ open, onClose, title, subtitle, size = "md", children }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/40 sm:p-8",
          SIZE_CLASSES[size]
        )}
      >
        {title && (
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#1F2937]">{title}</h2>

              {subtitle && <p className="mt-1 text-sm text-[#9CA3AF]">{subtitle}</p>}
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="text-[#9CA3AF] hover:text-[#1F2937]"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default Modal;
