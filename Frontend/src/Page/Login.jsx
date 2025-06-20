import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice"; // Make sure this thunk returns `message`
import { useNavigate, Link } from "react-router-dom";
import Button from "../Components/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    if (!formData.username || !formData.password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/");
      } else {
        setError("Access token not found. Login failed.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials or server error.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {error && (
        <div className="relative mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="absolute top-1 right-2 text-red-500"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-2 right-3 text-sm text-gray-600"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="px-6 w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600 mt-2">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
