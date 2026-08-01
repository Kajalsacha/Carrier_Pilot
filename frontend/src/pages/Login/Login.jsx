import { Compass } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";
import ProductPreview from "../../components/auth/ProductPreview";

function Login() {
  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="mb-10 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#23364D]">
              <Compass className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="text-lg font-semibold text-[#1F2937]">
              CareerPilot
            </span>
          </div>

          <LoginForm />
        </div>

        <ProductPreview />
      </div>
    </div>
  );
}

export default Login;
