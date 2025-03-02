import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      console.log("Fetching all admin Projects...");
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const res = await axios.get(`${JOB_END_POINT}/getadminjobs`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
          withCredentials: true, // Include cookies
        });

        console.log(res.data.jobs);
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error.response?.data?.message || "Failed to fetch jobs");
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
