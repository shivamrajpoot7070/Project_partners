import { setAllJobs } from '@/redux/jobSlice'
import store from '@/redux/store'
import { JOB_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {

    const dispatch=useDispatch();
    const {searchedQuery}=useSelector(store=>store.job)
  
     useEffect(()=>{
        const fetchAllJobs = async () => {

            // jha get all job kr rhe wha option hai query se v search kr sktee

            try{
                const res=await axios.get(`${JOB_END_POINT}/get`,{withCredentials:true});

                console.log(res);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            }
            catch(e){
                console.log(e);

            }

        }
        fetchAllJobs();
     },[])
}

export default useGetAllJobs;