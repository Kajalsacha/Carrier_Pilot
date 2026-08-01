import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const VARIANT_CLASSES = {
  primary: "bg-[#23364D] text-white hover:bg-[#1A2838] focus-visible:ring-[#23364D]/30",
  secondary:
    "bg-white text-[#6B7280] border border-[#E8EDF3] hover:bg-[#F8FAFC] focus-visible:ring-[#23364D]/20",
  ghost: "bg-transparent text-[#6B7280] hover:bg-[#F8FAFC] focus-visible:ring-[#23364D]/20",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600/30",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
};

function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
