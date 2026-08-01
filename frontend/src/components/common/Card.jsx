import { cn } from "../../lib/utils";

function Card({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E8EDF3] bg-white shadow-lg shadow-slate-200/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
