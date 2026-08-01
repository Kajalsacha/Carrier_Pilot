import LoginImage from "../../assets/images/login-illustration.png";

function ProductPreview() {
  return (
    <div className="hidden flex-col items-center justify-center gap-8 border-l border-[#E8EDF3] bg-[#F8FAFC] p-10 lg:flex">
      <img
        src={LoginImage}
        alt="CareerPilot product preview"
        className="w-full max-w-2xl object-contain"
      />

      <div className="max-w-md text-center">
        <p className="text-lg font-medium text-[#1F2937]">
          Your career, organized.
        </p>
        <p className="mt-1.5 text-sm leading-6 text-[#9CA3AF]">
          Track applications, get AI resume feedback, and follow a
          personalized roadmap to your next role.
        </p>
      </div>
    </div>
  );
}

export default ProductPreview;
