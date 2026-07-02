function StatusFilter({
  status,
  setStatus,
}) {
  return (
    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      className="rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] px-5 text-white outline-none"
    >
      <option value="">
        All Status
      </option>

      <option value="Applied">
        Applied
      </option>

      <option value="OA">
        OA
      </option>

      <option value="Interview">
        Interview
      </option>

      <option value="Offer">
        Offer
      </option>

      <option value="Rejected">
        Rejected
      </option>

    </select>
  );
}

export default StatusFilter;