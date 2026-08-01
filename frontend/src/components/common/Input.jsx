import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Input = forwardRef(function Input(
  { label, error, className = "", id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-[#1F2937]">
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-xl border border-[#E8EDF3] bg-white px-3.5 py-2.5 text-[15px] text-[#1F2937]",
          "placeholder:text-[#9CA3AF] outline-none transition-colors",
          "focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10",
          error && "border-red-400 focus:border-red-500 focus:ring-red-600/10",
          className
        )}
        {...props}
      />

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
