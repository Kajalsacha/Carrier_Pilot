import { Link } from "react-router-dom";
import Button from "./Button";

function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      {Icon && <Icon className="mb-3 h-10 w-10 text-[#9CA3AF]" />}

      <p className="font-medium text-[#1F2937]">{title}</p>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-[#6B7280]">{description}</p>
      )}

      {actionLabel && actionTo && (
        <Link to={actionTo} className="mt-5">
          <Button size="sm">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
