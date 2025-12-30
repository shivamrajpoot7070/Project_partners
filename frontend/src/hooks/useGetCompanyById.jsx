import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {

  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchSingleCompany = async () => {

      try {
        const token = localStorage.getItem("token"); // Retrieve Bearer token from localStorage
        const res = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
          },
          withCredentials: true, // Include cookies
        });

        console.log("Fetched single company:", res.data.company);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      }
       catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch company by ID"
        );
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
