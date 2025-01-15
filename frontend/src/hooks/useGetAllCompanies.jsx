import { setCompanies } from "@/redux/companySlice";
import { COMPANY_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const res = await axios.get(`${COMPANY_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
          withCredentials: true, // Include cookies
        });

        console.log("API call to fetch companies executed.");
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch companies"
        );
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
