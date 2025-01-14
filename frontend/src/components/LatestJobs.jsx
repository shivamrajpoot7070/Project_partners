import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  


  const { allJobs } = useSelector((store) => store.job); // Access "job" state

  return (
    <div className="max-w-7xl mx-auto my-20 text-center">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Ongoing Projects Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {allJobs?.length <= 0 ? (
          <span className="text-gray-500">No Ongoing Projects</span>
        ) : (
          allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
