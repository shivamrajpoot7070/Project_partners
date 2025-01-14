import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_END_POINT } from '@/utils/constant'
import { COMPANY_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            console.log("hii");
            try {
                const res = await axios.get(`${JOB_END_POINT}/get`,{withCredentials:true});
                console.log(res.data.jobs);
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs