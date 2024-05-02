import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import baseURL from '../../../../config';

const AllJobs = () => {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState("");


  const { id } = useParams();
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/jobByComapnyId/${id}`);
        setJobData(response.data);
      } catch (error) {
        setError(error.response.data.message)
      }
    };
    fetchAllData();
  }, [id]);
  
  const deleteJob = async (jobId) =>{
    try {
      const url = `${baseURL}/api/deletejob/${jobId}`;
      const { data: res } = await axios.delete(url);
      console.log(res.message);
      Swal.fire({
        title: 'Success!',
        text: res.message,
        icon: 'success',
        confirmButtonText: 'Cool'
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
          window.location.reload();
        }
      });
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  }


  return (
    <div className='all-jobs'>
      {error && <h4>{error}</h4>}
      {jobData && jobData.map((job, index) => {
        return (
          <div className='item' key={index}>
            <h1 className='head-font'>{job.companyName}</h1>
            <p>{job.jobTitle}</p>
            <p className='avg-sal'>{((job.maxSalary + job.minSalary) / 2)*12} per year</p>
            <div className='btns'>
              <Link className='btn blue-btn' to={`/company/editjob/${job._id}`}>Edit</Link>
              <Link className='btn blue-btn' onClick={() => deleteJob(job._id)}>Delete</Link>
            </div>
          </div>
        )
      })

      }
    </div>

  )
}

export default AllJobs