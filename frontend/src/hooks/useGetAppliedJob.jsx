import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve Bearer token from localStorage
        const res = await axios.get(`${APPLICATION_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
          withCredentials: true, // Include cookies
        });

        console.log("Fetched applied jobs:", res.data);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application)); // application is coming from the backend
        }
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch applied jobs"
        );
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
