import LoginImage from "../../assets/images/login-illustration.png";

function ProductPreview() {
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#181818] p-10">

      <img
        src={LoginImage}
        alt="CareerPilot"
        className="w-full max-w-2xl object-contain"
      />

    </div>
  );
}

export default ProductPreview;