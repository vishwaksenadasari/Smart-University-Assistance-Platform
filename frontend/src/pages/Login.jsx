import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="w-full p-2 border mb-3" placeholder="Email" />
        <input className="w-full p-2 border mb-3" type="password" placeholder="Password" />
        <button 
          className="w-full bg-blue-600 text-white p-2"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </button>
      </div>
    </div>
  );
}