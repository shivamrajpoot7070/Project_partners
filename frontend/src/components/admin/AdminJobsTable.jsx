import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 shadow-lg rounded-lg p-4">
      <Table className="w-full">
        <TableCaption className="text-gray-600">A list of your recent posted projects</TableCaption>
        <TableHeader className="bg-purple-300">
          <TableRow>
            <TableHead className="font-semibold text-purple-800">Company</TableHead>
            <TableHead className="font-semibold text-purple-800">Role</TableHead>
            <TableHead className="font-semibold text-purple-800">Date</TableHead>
            <TableHead className="text-right font-semibold text-purple-800">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="hover:bg-pink-100">
              <TableCell className="text-gray-700">{job?.company?.name}</TableCell>
              <TableCell className="text-gray-700">{job?.title}</TableCell>
              <TableCell className="text-gray-700">{job?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-pink-600 hover:text-pink-800" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white shadow-md rounded-lg p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 hover:bg-purple-200 rounded cursor-pointer text-purple-800"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 p-2 hover:bg-purple-200 rounded cursor-pointer mt-1 text-purple-800"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;