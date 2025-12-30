import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
    >
      <div>
        <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name || job?.company}</h1>
        <p className="text-sm text-gray-500 mt-1">{job?.location}</p>
      </div>

      <div className="mt-3">
        <h1 className="font-extrabold text-lg text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-lg shadow-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-lg shadow-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-lg shadow-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;