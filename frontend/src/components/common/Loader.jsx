import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export function Skeleton({ className = "" }) {
  return <div className={cn("animate-pulse rounded-lg bg-[#F8FAFC]", className)} />;
}

export function Spinner({ className = "" }) {
  return <Loader2 className={cn("animate-spin text-[#23364D]", className)} aria-hidden="true" />;
}

export default Spinner;
