import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth); // Check if the user is logged in

    const searchJobHandler = () => {
        if (!user) {
            // If user is not logged in, redirect to login page
            navigate("/login");
        } 
        else {
            // If logged in, proceed with search
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Website To find and make Projects
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Get a <span className='text-[#6A38C2]'>Chance to work on Live Projects</span>
                </h1>
                <p>We will Provide You Chance to work on a Project and to get hands-on experience</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your Projects'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
