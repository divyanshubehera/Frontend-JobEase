import React, { useEffect } from 'react'
import Hero from './components/Hero'
import CourseModules from './components/CourseModules'
import './Courses.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import baseURL from '../../../config'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  document.title = "Job Ease | Courses"
  const navigate = useNavigate();
  const id = localStorage.getItem("applicantId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/applicantprofiledata/${id}`);
        if (response.data.length == 0) {
          Swal.fire({
              title: 'error!',
              text: "Create Profile First",
              icon: 'error',
              confirmButtonText: 'Ok'
          }).then((result) => {
              if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                  navigate('/applicant/createprofile');
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
                  navigate('/applicant/createprofile');
              }
          });
      }
    };

    fetchData();
  }, [id]);

  useEffect(()=>{
    const appliantToken = localStorage.getItem("applicantToken");
    if(!appliantToken){
      window.location.href = "/";
    }
  }, [])
  

  return (
    <section className="coursemodules">
      <Hero />
      <div className='container'>
        <CourseModules />
      </div>
    </section>
  )
}

export default Courses