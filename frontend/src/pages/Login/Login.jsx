import LoginForm from "../../components/auth/LoginForm";
import ProductPreview from "../../components/auth/ProductPreview";

function Login() {
  return (
    <div className="min-h-screen bg-[#121212]">

      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">

        <div className="flex items-center justify-center px-16">

          <LoginForm />

        </div>

        <ProductPreview />

      </div>

    </div>
  );
}

export default Login;