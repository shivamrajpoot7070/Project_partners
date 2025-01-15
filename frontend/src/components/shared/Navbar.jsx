import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { USER_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth); // Access the user from the Redux store

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logouthandler = async (e) => {
    try {
      const res = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16 md:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            Project<span className="text-[#F83002]">Partners</span>
          </h1>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`flex-col md:flex-row md:flex items-center gap-12 md:static fixed bg-white w-full md:w-auto left-0 md:top-0 top-16 transition-transform duration-300 ease-in-out md:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col md:flex-row font-medium items-center gap-5 md:gap-12 py-4 md:py-0">
            <li>
              <Link to="/">Home</Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/jobs">Latest Projects</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            ) : (
              <li>
                <span className="text-gray-500">Please log in to access projects</span>
              </li>
            )}

            {user && user.role === "recruiter" && (
              <>
                <li>
                  <Link to="/admin/companies">Company Name</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Projects</Link>
                </li>
                <li>
                  <Link to="/admin/interview">Schedule Interview</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col md:flex-row items-center gap-5">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#360985]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <img src={user?.profile?.profilePhoto} alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-3 space-y-2">
                    <Avatar className="cursor-pointer">
                      <img
                        src={user?.profile?.profilePhoto}
                        alt="User Avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Hello {user?.fullname}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-700">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logouthandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
