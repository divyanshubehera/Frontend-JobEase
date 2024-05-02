import React, {useEffect} from 'react'
import Hero from './components/Hero'
import Main from './components/Main'
import './JobDetails.css'
import baseURL from '../../../config'
import  axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const JobDetails = () => {
  document.title = "Job Ease | Job Details"
  const companyId = localStorage.getItem("companyId");
  const applicantId = localStorage.getItem("applicantId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyResponse = await axios.get(`${baseURL}/api/companyprofiledata/${companyId}`);
        const applicantResponse = await axios.get(`${baseURL}/api/applicantprofiledata/${applicantId}`);
        if (companyResponse.data.length == 0 && applicantResponse.data.length == 0) {
          Swal.fire({
            title: 'error!',
            text: "Create Profile First",
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
              if(applicantId){
                window.location.href = '/applicant/createprofile';
              }else if(companyId){
                window.location.href = '/company/createprofile';
              }
            }
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'error!',
          text: "Create Profile First",
          icon: 'error',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
            if(applicantId){
              window.location.href = '/applicant/createprofile';
            }else if(companyId){
              window.location.href = '/company/createprofile';
            }
          }
        });
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    const company = localStorage.getItem("companyId");
    const applicant = localStorage.getItem("applicantId");
    if(!adminLogin && !company && !applicant){
      window.location.href = "/";
    }
  }, []);

  return (
    <div className='job-details'>
      <Hero />
      <Main />
    </div>
  )
}

export default JobDetails