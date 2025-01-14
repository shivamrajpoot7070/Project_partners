import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  useGetAllJobs();  // to get all the jobs from backend so that i can diplay on render

  const {user}=useSelector(store=>store.auth);
  const navi=useNavigate();
  
  // ye jab user aayga login krk
  // to role se check krega
  // agr recruiter rhega to sidha redirect kr do company wle route pr

  useEffect(()=>{
    if(user?.role==='recruiter'){
      navi('/admin/companies');
    }
  },[])

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
    </div>
  )
}

export default Home;