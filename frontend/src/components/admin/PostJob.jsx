import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.post(`${JOB_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error posting the job');
        } finally {
            setLoading(false);
        }
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200">
            <Navbar />
            <div className="flex items-center justify-center w-full py-10">
                <form onSubmit={submitHandler} className="p-10 max-w-4xl bg-white shadow-2xl rounded-2xl">
                    <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">Post a New Project</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(input).map((key) => key !== "companyId" && (
                            <div key={key}>
                                <Label className="text-purple-700">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                <Input
                                    type={key === "position" ? "number" : "text"}
                                    name={key}
                                    value={input[key]}
                                    onChange={changeEventHandler}
                                    className="focus:ring-purple-500 border-gray-300 my-1"
                                />
                            </div>
                        ))}
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full border-gray-300 focus:ring-purple-500">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem value={company?.name?.toLowerCase()} key={company._id}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    {loading ? (
                        <Button className="w-full my-6 bg-purple-600 text-white flex justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-6 bg-purple-600 hover:bg-purple-700 text-white">
                            Post New Project
                        </Button>
                    )}
                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            *Please register an Organization first before posting a Project
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
