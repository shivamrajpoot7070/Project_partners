import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { USER_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useEffect } from 'react'

const UpdateProfileDialog = ({ open, setOpen }) => {
    //  const USER = "http://localhost:1000/api/v1/user";
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);  // user already i have

    // Initialize the input state with user data or empty string
    const [input, setInput] = useState({
  fullname: user?.fullname || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  bio: user?.profile?.bio || "",
  skills: user?.profile?.skills?.join(", ") || "",
  resumeLink: user?.profile?.resume || "",
});

useEffect(() => {
  if (user) {
    setInput({
      fullname: user.fullname || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      bio: user.profile?.bio || "",
      skills: user.profile?.skills?.join(", ") || "",
      resumeLink: user.profile?.resume || "",
    });
  }
  console.log("User data loaded into form:", user);
}, [user]);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${USER_END_POINT}/profile/update`,
      {
        fullname: input.fullname,
        email: input.email,
        phoneNumber: input.phoneNumber,
        bio: input.bio,
        skills: input.skills,
        resumeLink: input.resumeLink, // Google Drive link
      },
      {
        withCredentials: true, // ✅ cookie-based auth
      }
    );

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Error updating profile");
  } finally {
    setLoading(false);
    setOpen(false);
  }
};

    return (
        <Dialog open={open}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    >
                        &times;
                    </button>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                disabled/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="Comma-separated skills"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Resume Link (Google Drive)
                            </Label>
                            <Input
                                id="file"
                                name="resumeLink"
                                type="text"
                                value={input.file}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="Paste your Google Drive link here"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;