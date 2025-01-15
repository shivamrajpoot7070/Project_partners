
import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job); // Access "job" state
  const { user } = useSelector((store) => store.auth); // Check if user is logged in

  // Dummy data if user is not logged in
  const dummyJobs = [
    {
      _id: "1",
      title: "Software Developer",
      company: { name: "Tech Corp" },
      description: "Develop cutting-edge software solutions.",
      position: 2,
      jobType: "Full-time",
      salary: "5",
    },
    {
      _id: "2",
      title: "Project Manager",
      company: { name: "Innovative Solutions" },
      description: "Lead projects to success and ensure delivery.",
      position: 1,
      jobType: "Full-time",
      salary: "8",
    },
    {
      _id: "3",
      title: "UI/UX Designer",
      company: { name: "Creative Minds" },
      description: "Design user-friendly interfaces and experiences.",
      position: 3,
      jobType: "Part-time",
      salary: "4",
    },
    {
      _id: "4",
      title: "Backend Developer",
      company: { name: "CodeBase" },
      description: "Develop server-side logic and maintain databases.",
      position: 2,
      jobType: "Full-time",
      salary: "6",
    },
    {
      _id: "5",
      title: "Data Scientist",
      company: { name: "Data Solutions" },
      description: "Analyze large datasets to extract actionable insights.",
      position: 1,
      jobType: "Contract",
      salary: "7",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-20 text-center">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Ongoing Projects Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {(user ? allJobs : dummyJobs)?.length <= 0 ? (
          <span className="text-gray-500">No Ongoing Projects</span>
        ) : (
          (user ? allJobs : dummyJobs).slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
