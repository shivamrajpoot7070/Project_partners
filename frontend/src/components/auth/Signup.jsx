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
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {

  
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();

const submitHandler = async (e) => {
  e.preventDefault();

  console.log(input);

  try {
    dispatch(setLoading(true));

    const res = await axios.post(
      `${USER_END_POINT}/register`,
      {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: input.role,
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  } catch (e) {
    console.error(e);

    toast.error(
      e.response?.data?.message || "Registration failed"
    );
  } finally {
    dispatch(setLoading(false));
  }
};


  function changeEventHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function changeFileHandler(e) {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      <Navbar />
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 my-10">
        <h1 className="font-bold text-3xl text-center text-[#6A38C2] mb-8">Sign Up for an Account</h1>
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Shivam Kumar"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#6A38C2] transition duration-300"
            />
          </div>

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
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="7492839362"
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

          <div className="flex flex-wrap items-center justify-between my-5">
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

          {loading ? (
            <Button className="w-full my-4 bg-[#6A38C2] hover:bg-[#360985] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#360985] text-white">
              Signup
            </Button>
          )}

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#6A38C2] hover:text-[#360985]">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
