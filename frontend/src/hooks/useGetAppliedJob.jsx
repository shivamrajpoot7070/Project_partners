import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

// to get all applied jobs

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_END_POINT}/get`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                   dispatch(setAllAppliedJobs(res.data.application)); // application is coming from backend
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;