import { setAllJobs } from "@/redux/jobSlice";
import { JOB_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  const { searchedQuery } = useSelector((store) => store.job);        // Retrieve the search query from Redux

  useEffect(() => {

    const fetchAllJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve Bearer token from localStorage
        const res = await axios.get(`${JOB_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
          withCredentials: true,                         // Include cookies
          params: {
            query: searchedQuery || undefined,          // Optional query parameter for filtering jobs
          },
        });

        console.log("API call to fetch all jobs executed.");
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      }

      catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch jobs"
        );
      }
    };

    fetchAllJobs();
  },[dispatch, searchedQuery]);    // Add `searchedQuery` as a dependency to re-fetch when it changes
};

export default useGetAllJobs;
