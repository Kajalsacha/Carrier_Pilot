function StatusFilter({ status, setStatus }) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="rounded-xl border border-[#E8EDF3] bg-white px-4 py-2.5 text-sm text-[#1F2937] outline-none transition focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
    >
      <option value="">All Status</option>
      <option value="Applied">Applied</option>
      <option value="OA">OA</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}

export default StatusFilter;
