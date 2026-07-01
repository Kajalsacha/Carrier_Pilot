function StatusFilter() {
  return (
    <select
      className="rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] px-5 text-white outline-none"
    >
      <option value="">All Status</option>

      <option>Applied</option>

      <option>OA</option>

      <option>Interview</option>

      <option>Offer</option>

      <option>Rejected</option>

    </select>
  );
}

export default StatusFilter;