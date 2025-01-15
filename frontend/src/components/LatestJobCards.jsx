// import React from "react";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// const LatestJobCards = ({job}) => {

//   const navigate=useNavigate();

//   return (
//     <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
//       <div onClick={()=>navigate(`/description/${job._id}`)}>
//         <h1 className="font-medium text-lg">{job?.company?.name}</h1>
//         <p className="text-sm text-gray-500">india</p>
//       </div>

//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className="text-sm text-gray-600"> {job?.description}</p>
//       </div>
//       <div className="flex items-center gap-2 mt-4 ml-10">
//         <Badge className={"text-blue-700 font-bold"} variant="ghost">
//           {job?.position} Positions
//         </Badge>
//         <Badge className={"text-[#F83002] font-bold"} variant="ghost">
//           {job?.jobType}
//         </Badge>
//         <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
//           {job?.salary} LPA
//         </Badge>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;
import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux store

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // Access "user" state to check if logged in

  const handleClick = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } 
    else {
      navigate(`/description/${job._id}`);
    }
  };

  return (
    <div onClick={handleClick} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">india</p>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600"> {job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 ml-10">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
