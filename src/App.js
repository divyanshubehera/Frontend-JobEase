import { Route, Routes } from 'react-router-dom';

import './App.css';

import Layout from './GlobalCompnents/Navbar/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
import Signin from './pages/Authentication/Signin/Signin';
import Signup from './pages/Authentication/Signup/Signup';

import SearchJob from './pages/commonPages/SearchJob/SearchJob';
import JobDetails from './pages/commonPages/JobDetails/JobDetails';

import UserProfile from './pages/applicant/UserProfile/UserProfile';
import ApplicantProfile from './pages/applicant/ProfileCreation/ApplicantProfile';
import EditApplicantProfile from './pages/applicant/EditProfile/EditApplicantProfile';
import EditApplicantPassword from './pages/applicant/EditPassword/EditPassword';
import SalaryEstimate from './pages/applicant/SalaryEstimate/SalaryEstimate';
import ResumeBuilder from './pages/applicant/ResumeBuilder/ResumeBuilder';
import Courses from './pages/applicant/Courses/Courses';
import QuizModule from './pages/applicant/Quiz/QuizModule';
import Read from './pages/applicant/Courses/Read';
import ApplicantEmailSend from './pages/applicant/SendMail/EmailSend';

import CreateProfile from './pages/company/CreateProfile/CreateProfile';
import CompanyProfile from './pages/company/CompanyProfile/CompanyProfile';
import EditCompanyProfile from './pages/company/EditProfile/EditCompanyProfile';
import EditCompanyPassword from './pages/company/EditPassword/EditPassword';
import CompanyDashboard from './pages/company/Dashboard/CompanyDashboard';
import MyJobs from './pages/company/MyJob/MyJobs';
import PostJobs from './pages/company/PostJob/PostJobs';
import EditJob from './pages/company/EditJob/EditJob';
import CompanyEmailSend from './pages/company/SendMail/EmailSend';

import Login from './pages/admin/Login/Login';
import PdfUpload from './pages/admin/PdfUpload/PdfUpload';
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard';
import AdminEmailSend from './pages/admin/SendMail/EmailSend';
import ViewApplicantProfile from './pages/commonPages/ApplicantProfile/ViewApplicantProfile';
import ViewCompanyProfile from './pages/commonPages/CompanyProfile/ViewCompanyProfile';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/applicant/profile/view/:id' element={<ViewApplicantProfile />} />
        <Route path='/company/profile/view/:id' element={<ViewCompanyProfile />} />

        <Route path='/searchjob' element={<SearchJob />} />
        <Route path='/jobdetails/:id' element={<JobDetails />} />

        <Route path='/applicant/createprofile' element={<ApplicantProfile />} />
        <Route path='/applicant/viewprofile/:id' element={<UserProfile />} />
        <Route path='/applicant/editprofile/:id' element={<EditApplicantProfile />} />
        <Route path='/applicant/editpassword/:id' element={<EditApplicantPassword />} />
        <Route path='/applicant/salaryestimate' element={<SalaryEstimate />} />
        <Route path='/applicant/resumebuilder' element={<ResumeBuilder />} />
        <Route path='/applicant/courses' element={<Courses />} />
        <Route path='/applicant/readpdf/:id' element={<Read />} />
        <Route path='/applicant/quiz' element={<QuizModule />} />
        <Route path='/applicant/contact' element={<ApplicantEmailSend />} />

        <Route path='/company/createprofile' element={<CreateProfile />} />
        <Route path='/company/viewprofile/:id' element={<CompanyProfile />} />
        <Route path='/company/editprofile/:id' element={<EditCompanyProfile />} />
        <Route path='/company/editpassword/:id' element={<EditCompanyPassword />} />
        <Route path='/company/dashboard/:id' element={<CompanyDashboard />} />
        <Route path='/company/myjobs/:id' element={<MyJobs />} />
        <Route path='/company/postjobs' element={<PostJobs />} />
        <Route path='/company/editjob/:id' element={<EditJob />} />
        <Route path='/company/contact' element={<CompanyEmailSend />} />

        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/pdfupload' element={<PdfUpload />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/contact' element={<AdminEmailSend />} />

      </Route>
    </Routes>
  );
}

export default App;
