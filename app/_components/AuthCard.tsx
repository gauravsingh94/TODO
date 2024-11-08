import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "./Spinner";
import { signUp, login } from "@/clientRequest/httpRequests";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthForm({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully Login.");
          router.push("/tasks");
        }
      } else {
        // Sign up
        const response = await signUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          toast.success("Successfully Signup.");
          router.push("/tasks");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // @ts-ignore
      if (error && error.response && error.response.data.message) {
        // @ts-ignore
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Signup"}</h2>
        <p className="text-sm text-gray-600">
          {isLogin
            ? "Enter your email and password to sign in"
            : "Fill out the form below to create your account"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                required
                className="mt-1"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                className="mt-1"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="mt-1"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            className="mt-1"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {!isLogin && (
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              className="mt-1"
            />
          </div>
        )}

        <Button
          className="w-full mt-4 bg-black text-white hover:bg-gray-800 flex items-center justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button
          variant="link"
          className="text-black font-semibold hover:underline p-0"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Button>
      </div>
    </div>
  );
}
