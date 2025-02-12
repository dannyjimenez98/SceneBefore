import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${API_URL}/user/register/`, formData);
      console.log("success", response.data);
      setSuccessMessage("Registration successful");

      // Save tokens and update authentication state
      const { access, refresh } = response.data.tokens;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      login(access); // Update the AuthContext

      navigate("/"); // redirect to home page after sign up and login
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error during registration!", error.response.data);

        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = (
            error.response!.data as Record<string, string[]>
          )[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {error && <small className="pl-4 text-error">{error}</small>}
      <form
        className="w-full max-w-md p-6 bg-base-300 shadow-lg rounded-lg flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-primary"> Register</h1>

        {/* USERNAME */}
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            title="Only letters, numbers or dash"
            className="w-full p-2 rounded-md"
          />
        </label>

        {/* EMAIL */}
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full p-2 rounded-md"
          />
        </label>

        {/* PASSWORD */}
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password1"
            required
            placeholder="Password"
            onChange={handleChange}
            value={formData.password1}
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            className="w-full p-2 rounded-md"
          />
        </label>

        {/* CONFIRM PASSWORD */}
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password2"
            required
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.password2}
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            className="w-full p-2 rounded-md"
          />
        </label>

        {/* SUBMIT BUTTON */}
        <button
          className=" btn btn-primary text-white font-bold py-2 px-4"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
    </div>
  );
}
