import React, { useState, useEffect } from 'react'
import './PostJobs.css'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../../config';

const PostJobs = () => {
  document.title = "Job Ease | Post Jobs"
  const id = localStorage.getItem("companyId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/companyprofiledata/${id}`);
            if(response.data.length == 0){
              Swal.fire({
                title: 'error!',
                text: "Create Profile First",
                icon: 'error',
                confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                  navigate('/company/createprofile');
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
              navigate('/company/createprofile');
            }
          });
        }
    };

    fetchData();
}, [id]);

  useEffect(()=>{
    const companyToken = localStorage.getItem("companyToken");
    if(!companyToken){
      window.location.href = "/";
    }
  }, [])

  
  const [error, setError] = useState("");
  
  const [jobData, setJobData] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setJobData({ ...jobData, [input.name]: input.value.toLowerCase(), companyId: localStorage.getItem("companyId") });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseURL}/api/postjob`;
      const { data: res } = await axios.post(url, jobData);
      console.log(res.message);
      Swal.fire({
        title: 'Success!',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
          navigate('/searchjob');
        }
      });
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  }


  return (
    <section className='post-job'>
      <div className='banner'>
        <h1 className='head-font'>Post <span>Job</span></h1>
        <p>Oppertunities Don't Happen, You Create Them</p>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='top'>
            <div className='part-1'>
              <input type='text' id="jobTitle" name='jobTitle' placeholder='Enter Job Title' onChange={handleChange} />
              <input type='number' id="minSalary" name="minSalary" placeholder='Enter Minimum Salary' onChange={handleChange} />
              <input type='number' id="maxSalary" name="maxSalary" placeholder='Enter Maximum Salary' onChange={handleChange} />
              <input type='date' id="postingDate" name="postingDate" placeholder='mm/dd/yyyy' onChange={handleChange} />
              <input type='text' id="companyLogo" name='companyLogo' placeholder='Enter comapy logo url' onChange={handleChange} />
            </div>
            <div className='part-2'>
              <input type='text' id="companyName" name="companyName" placeholder='Enter Company Name' onChange={handleChange} />
              <select id='salaryType' name='salaryType' onChange={handleChange}>
                <option>--Select Salary Type--</option>
                <option>Hourly</option>
                <option>Monthly</option>
              </select>
              <input type='text' id="jobLocation" name='jobLocation' placeholder='Enter job-location' onChange={handleChange} />
              <select id='experienceLevel' name='experienceLevel' onChange={handleChange} >
                <option>--Select Experience Level--</option>
                <option>No experience</option>
                <option>1 Year</option>
                <option>2 Year</option>
                <option>3 Year</option>
                <option>4 Year</option>
                <option>5 Year</option>
                <option>More Than 5 Year</option>
              </select>
              <select id='employementType' name='employementType' placeholder='select employement type' onChange={handleChange}>
                <option>--Select Employement Type--</option>
                <option>Temporary</option>
                <option>Internship</option>
                <option>Full time</option>
              </select>
            </div>
          </div>
          <div className='bottom'>
            <input type='text' id="skills" name="skills" placeholder='skills' onChange={handleChange} />
            <input type='text' id="benefits" name='benefits' placeholder='benefits' onChange={handleChange} />
            <input type='text' id='contactName' name='contactName' placeholder='Contact Name' onChange={handleChange} />
            <input type='email' id='contactEmail' name='contactEmail' placeholder='Contact Email' onChange={handleChange} />
            <textarea id='outline' name='outline' cols={30} rows={10} onChange={handleChange} placeholder='Enter Outline'></textarea>
            <textarea id='futureGrowth' name='futureGrowth' cols={30} rows={10} onChange={handleChange} placeholder='Enter Future Growth'></textarea>
          </div>
          {error && <h4>{error}</h4>}
          <button type='submit' className='blue-btn'>Post Job</button>
        </form>
      </div>
    </section>
  )
}

export default PostJobs