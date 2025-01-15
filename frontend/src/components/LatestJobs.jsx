import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job); // Access "job" state
  const { user } = useSelector((store) => store.auth); // Check if user is logged in (check if user is not null)
  const navigate = useNavigate(); // Hook to navigate to the login page

  // Enhanced dummy job data with more imaginative names and job titles
  const dummyJobs = [
    { _id: 1, title: "AI Research Intern", company: "Quantum Dynamics", location: "India", description: "Join us to innovate and develop next-gen AI models for real-world applications.", position: "5", jobType: "Internship", salary: "15", },
    { _id: 2, title: "Blockchain Developer", company: "ChainForge Labs", location: "India", description: "Develop cutting-edge decentralized applications and blockchain technology.", position: "3", jobType: "Full-time", salary: "30", },
    { _id: 3, title: "Product Manager", company: "Solaris Technologies", location: "India", description: "Lead product development for next-gen solar-powered solutions.", position: "2", jobType: "Full-time", salary: "40", },
    { _id: 4, title: "Data Scientist", company: "NeuroTech", location: "India", description: "Leverage data to uncover insights for developing AI-driven healthcare solutions.", position: "4", jobType: "Full-time", salary: "35", },
    { _id: 5, title: "Full Stack Developer", company: "FusionTech", location: "India", description: "Build scalable web apps and contribute to full-stack development in an innovative environment.", position: "6", jobType: "Full-time", salary: "20", },
    { _id: 6, title: "Cybersecurity Specialist", company: "SecureNet Solutions", location: "India", description: "Protect and secure enterprise-level networks from evolving cyber threats.", position: "2", jobType: "Full-time", salary: "50", },
  ];

  const handleJobClick = (jobId) => {
    if (!user) {
      // If user is not authenticated (user is null), redirect to login page
      navigate("/login");
    }
    // If authenticated, handle the job click (e.g., show job details)
  };

  // Use dummyJobs if no jobs are available or if user is not logged in
  const jobsToDisplay = !user || allJobs.length <= 0 ? dummyJobs : allJobs;

  return (
    <div className="max-w-7xl mx-auto my-20 text-center">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Ongoing Projects Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {jobsToDisplay.slice(0, 6).map((job) => (
          <div key={job._id} onClick={() => handleJobClick(job._id)}>
            <LatestJobCards job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
