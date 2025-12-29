import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const AppliedJobTable = () => {

    const {allAppliedJobs}=useSelector(store=>store.job);  // to get all the applied jobs from store which we have putten while calling hook

  return (
    <div>
        
        <Table>
            <TableCaption>
                <h2>List of your applied Projects</h2>
            </TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>

                {
                    allAppliedJobs.length<=0 ? <span>You have not applied for any Project Yet</span> : allAppliedJobs.map((item)=>(
                        <TableRow key={item?.id}>
                            <TableCell>{item.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company.name}</TableCell>
                            <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{item.status.toUpperCase()}</Badge></TableCell>
                            
                        </TableRow>
                    ))
                }

            </TableBody>

        </Table>
    </div>
  )
}

export default AppliedJobTable