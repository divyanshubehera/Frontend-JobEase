import React, { useEffect, useState } from 'react';
import './JobForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseURL from '../../../config';

const EditJob = () => {
  document.title = "Job Ease | Edit Job";
  const { id } = useParams();
  const companyId= localStorage.getItem("companyId");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/companyprofiledata/${companyId}`);
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

  const [jobData, setJobData] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    setJobData({ ...jobData, [input.name]: input.value, companyId: localStorage.getItem("companyId") });
  }
  

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseURL}/api/editjob/${id}`;
      const { data: res } = await axios.put(url, jobData);
      console.log(res.message);
      Swal.fire({
        title: 'Success!',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
          navigate(`/company/myjobs/${id}`);
        }
      });
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/job/${id}`);
        const { postingDate, ...rest } = response.data;
        const formattedDate = new Date(postingDate).toISOString().slice(0, 10);
        setJobData({ ...rest, postingDate: formattedDate });
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Failed to fetch job data. Please try again later.");
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className='post-job'>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='top'>
            <div className='part-1'>
              <input type='text' id="jobTitle" name='jobTitle' placeholder='Enter Job Title' onChange={handleChange} value={jobData.jobTitle || ''} />
              <input type='number' id="minSalary" name="minSalary" placeholder='Enter Minimum Salary' onChange={handleChange} value={jobData.minSalary || ''} />
              <input type='number' id="maxSalary" name="maxSalary" placeholder='Enter Maximum Salary' onChange={handleChange} value={jobData.maxSalary || ''} />
              <input type='date' id="postingDate" name="postingDate" placeholder='mm/dd/yyyy' onChange={handleChange} value={jobData.postingDate || ''} />
              <input type='text' id="companyLogo" name='companyLogo' placeholder='Enter company logo URL' onChange={handleChange} value={jobData.companyLogo || ''} />
            </div>
            <div className='part-2'>
              <input type='text' id="companyName" name="companyName" placeholder='Enter Company Name' onChange={handleChange} value={jobData.companyName || ''} />
              <select id='salaryType' name='salaryType' onChange={handleChange} value={jobData.salaryType || ''}>
                <option>--Select Salary Type--</option>
                <option>Hourly</option>
                <option>Monthly</option>
              </select>
              <input type='text' id="jobLocation" name='jobLocation' placeholder='Enter job location' onChange={handleChange} value={jobData.jobLocation || ''} />
              <select id='experienceLevel' name='experienceLevel' onChange={handleChange} value={jobData.experienceLevel || ''} >
                <option>--Select Experience Level--</option>
                <option>No experience</option>
                <option>1 Year</option>
                <option>2 Year</option>
                <option>3 Year</option>
                <option>4 Year</option>
                <option>5 Year</option>
                <option>More Than 5 Year</option>
              </select>
              <select id='employementType' name='employementType' placeholder='Select employment type' onChange={handleChange} value={jobData.employementType || ''}>
                <option>--Select Employment Type--</option>
                <option>Temporary</option>
                <option>Internship</option>
                <option>Full time</option>
              </select>
            </div>
          </div>
          <div className='bottom'>
            
            <input type='text' id='skills' name='skills' placeholder='Skills' onChange={handleChange} value={jobData.skills || ''} />
            <input type='text' id='benefits' name='benefits' placeholder='Benefits' onChange={handleChange} value={jobData.benefits || ''} />
            <input type='text' id='contactName' name='contactName' placeholder='Contact Name' onChange={handleChange} value={jobData.contactName || ''} />
            <input type='email' id='contactEmail' name='contactEmail' placeholder='Contact Email' onChange={handleChange} value={jobData.contactEmail || ''} />
            <textarea id='outline' name='outline' cols={30} rows={10} onChange={handleChange} placeholder='Enter Outline' value={jobData.outline || ''}></textarea>
            <textarea id='futureGrowth' name='futureGrowth' cols={30} rows={10} onChange={handleChange} placeholder='Enter Future Growth' value={jobData.futureGrowth || ''}></textarea>
          </div>
          {error && <h4>{error}</h4>}
          <button type='submit' className='blue-btn'>Update Job</button>
        </form>
      </div>
    </section>
  );
};

export default EditJob;
