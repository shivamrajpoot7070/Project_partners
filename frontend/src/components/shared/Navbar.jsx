import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Menu, X, LogOut, User2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-14">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-extrabold text-black">
            <Link to="/">Project<span className="text-[#F83002]">Partners</span></Link>
          </h1>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-black font-medium relative group transition duration-300"
          >
            Home
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          {user && (
            <>
              <Link
                to="/jobs"
                className="text-black font-medium relative group transition duration-300"
              >
                Latest Projects
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/browse"
                className="text-black font-medium relative group transition duration-300"
              >
                Browse
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#F83002] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-black text-black hover:border-[#F83002] hover:text-[#F83002]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-black text-white hover:bg-[#F83002]">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <img src={user?.profile?.profilePhoto} alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <User2 className="text-gray-700" />
                    <span>Hello, {user?.fullname}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="hover:text-[#6A38C2] flex items-center gap-2"
                  >
                    <User2 /> View Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logouthandler();
                    }}
                    className="hover:text-red-500 flex items-center gap-2"
                  >
                    <LogOut /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-3">
          <ul className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-black">
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/jobs"
                  onClick={() => setMenuOpen(false)}
                  className="text-black"
                >
                  Latest Projects
                </Link>
                <Link
                  to="/browse"
                  onClick={() => setMenuOpen(false)}
                  className="text-black"
                >
                  Browse
                </Link>
              </>
            )}
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-black"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-black"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                {user.role === "recruiter" && (
                  <>
                    <Link
                      to="/admin/companies"
                      onClick={() => setMenuOpen(false)}
                      className="text-black"
                    >
                      Companies
                    </Link>
                    <Link
                      to="/admin/jobs"
                      onClick={() => setMenuOpen(false)}
                      className="text-black"
                    >
                      Projects
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logouthandler();
                  }}
                  className="text-black"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
