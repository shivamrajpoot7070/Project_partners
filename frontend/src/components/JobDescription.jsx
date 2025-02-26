import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    const isIntiallyApplied=
        singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const applyJobHandler = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await axios.get(`${APPLICATION_END_POINT}/apply/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (e) {
            toast.error(e.response?.data?.message || 'Error applying for the job');
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${JOB_END_POINT}/get/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some((application) => application.applicant === user?._id)
                    );
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-2xl text-gray-800">{singleJob?.title}</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <Badge className="bg-blue-100 text-blue-700 font-semibold px-4 py-1 rounded-lg shadow-sm">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className="bg-red-100 text-red-700 font-semibold px-4 py-1 rounded-lg shadow-sm">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 font-semibold px-4 py-1 rounded-lg shadow-sm">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg text-white font-semibold px-6 py-2 transition-all duration-300 ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className="border-b-2 border-gray-300 font-semibold text-lg py-4 mt-6">Project Description</h1>
                <div className="my-4 space-y-2">
                    <p className="font-semibold text-indigo-700">Role: <span className="font-normal text-gray-800">{singleJob?.title}</span></p>
                    <p className="font-semibold text-indigo-700">Location: <span className="font-normal text-gray-800">{singleJob?.location}</span></p>
                    <p className="font-semibold text-indigo-700">Description: <span className="font-normal text-gray-800">{singleJob?.description}</span></p>
                    <p className="font-semibold text-indigo-700">Experience: <span className="font-normal text-gray-800">{singleJob?.experienceLevel} Yrs</span></p>
                    <p className="font-semibold text-indigo-700">Salary: <span className="font-normal text-gray-800">{singleJob?.salary} LPA</span></p>
                    <p className="font-semibold text-indigo-700">Total Applicants: <span className="font-normal text-gray-800">{singleJob?.applications?.length}</span></p>
                    <p className="font-semibold text-indigo-700">Posted Date: <span className="font-normal text-gray-800">{singleJob?.createdAt.split('T')}</span></p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
