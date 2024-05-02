import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Salaries from './components/Salaries'
import './EstimateSalary.css'
import baseURL from '../../../config';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const SalaryEstimate = () => {
  document.title = "Job Ease | Salary Estimate"
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

  const [formData, setFormData] = useState("");
  const handleFormSubmit = (data)=>{
    setFormData(data)
  }
  return (
    <section className="estimate-salary">
      <Hero onSubmit={handleFormSubmit} />
      <div className='container'>
        <Salaries formData = {formData} />
      </div>
    </section>
  )
}

export default SalaryEstimate