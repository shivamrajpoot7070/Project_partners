import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import Companycreate from "./components/admin/Companycreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import Interview from "./components/admin/Interview"
const approuter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>

  },
  {
    path:"/login",
    element:<Login/>

  },
  {
    path:"/signup",
    element:<Signup/>
  },

  {
    path:"/jobs",
    element:<Jobs/>
  },

  {

    path:"/description/:id",
    element:<JobDescription/>
  },

  {
    path:"/browse",
    element:<Browse/>
  },

  {
    path:"/profile",
    element:<Profile/>
  },

  {

    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>

  },

  {

    path:"/admin/companies/create",
    element:<ProtectedRoute><Companycreate/></ProtectedRoute>

  },

  {

    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>

  },

  {

    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>

  } ,

  {

    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>

  }

  ,{

    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },

  {
    path:"/admin/interview",
    element:<ProtectedRoute><Interview/></ProtectedRoute>
  }

])

function App() {

  return (
    <>
    <RouterProvider router={approuter}/>
    </>
  )
}

export default App
