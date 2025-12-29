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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const CompaniesTable = () => {

  useGetAllCompanies();
  
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 shadow-lg rounded-lg p-4">
      <Table className="w-full">
        <TableCaption className="text-gray-600">A list of recent registered Organizations</TableCaption>
        <TableHeader className="bg-purple-300">
          <TableRow>
            <TableHead className="font-semibold text-purple-800">Logo</TableHead>
            <TableHead className="font-semibold text-purple-800">Name</TableHead>
            <TableHead className="font-semibold text-purple-800">Date</TableHead>
            <TableHead className="text-right font-semibold text-purple-800">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id} className="hover:bg-pink-100">
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="text-gray-700">{company.name}</TableCell>
              <TableCell className="text-gray-700">{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-pink-600 hover:text-pink-800" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white shadow-md rounded-lg p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 p-2 hover:bg-purple-200 rounded cursor-pointer text-purple-800"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default CompaniesTable;