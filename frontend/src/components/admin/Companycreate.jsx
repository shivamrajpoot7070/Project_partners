import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { COMPANY_END_POINT } from '@/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';

const Companycreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the bearer token from localStorage

      const res = await axios.post(
        `${COMPANY_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
          },
          withCredentials: true, // Send cookies along with the request
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (e) {
      console.error(e);
      toast.error('Company creation failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your  Project Name</h1>
          <p className="text-gray-500">
            What would you like to give your Project name? You can change this later.
          </p>
        </div>

        <Label>Project Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default Companycreate;
