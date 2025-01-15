import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = ({ job }) => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Jobs Section */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5 order-2 lg:order-1">
            {filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((jobItem) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={jobItem?._id}
                  >
                    {/* Pass down job prop or override it with jobItem */}
                    <Job job={job || jobItem} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Section */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <FilterCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
