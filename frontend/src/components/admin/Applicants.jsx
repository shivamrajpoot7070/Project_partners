import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
// import ApplicantsTable from './ApplicantsTable' // Uncomment if needed
import axios from 'axios';
import { APPLICATION_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApplicantsTable from './ApplicantsTable';
import { setAllApplicants } from '@/redux/applicationSlice';


const Applicants = () => {
    
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {

        const fetchAllApplicants = async () => {

            try {
                // fetch applied students for clicked project..param id is project id 
                const token = localStorage.getItem('token'); // Get token from localStorage
                const res = await axios.get(`${APPLICATION_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the request headers
                        'Content-Type': 'application/json'
                    }
                });
                dispatch(setAllApplicants(res.data.job)); // Update the state with fetched applicants job is coming from the backend having all the applicants
                console.log(res.data);
            }

            catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]); // Added `params.id` to the dependency array for correct re-fetching

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
}

export default Applicants;
