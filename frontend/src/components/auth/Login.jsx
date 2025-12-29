import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Allows cookies to be sent/received
      });

      if (res.data.success) {
        const { user, token, message } = res.data;  // user, token, message is coming from backend

        // Save the token to localStorage for future use
        localStorage.setItem("token", token);

        // Save user details in Redux store
        // authslice is the slice name
        dispatch(setUser(user));

        navigate("/"); // Navigate to home page
        toast.success(message);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      <Navbar />
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 my-10">
        <h1 className="font-bold text-3xl text-center text-[#6A38C2] mb-8">Login to Your Account</h1>
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="youremail@example.com"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6A38C2] transition duration-300"
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6A38C2] transition duration-300"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            {loading ? (
              <Button className="w-full my-4 bg-[#6A38C2] hover:bg-[#360985] text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-[#6A38C2] hover:bg-[#360985] text-white"
              >
                Login
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#6A38C2] hover:text-[#360985]">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;