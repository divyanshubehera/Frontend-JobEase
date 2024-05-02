import React, { useState, useEffect } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../../../config';


const Jobs = (props) => {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState("");

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  useEffect(() => {
    const fetchAllData = async () => {
      console.log(props.searchData)
      try {
        if (isEmpty(props.searchData)) {
          const response = await axios.get(`${baseURL}/api/alljobs`);
          setJobData(response.data);
        } else {
          if (props.searchData.position == '') {
            props.searchData.position = 'undefined';
          }
          if (props.searchData.location == '') {
            props.searchData.location = 'undefined';
          }
          const response = await axios.get(`${baseURL}/api/searchjobs/${props.searchData.position}/${props.searchData.location}`);
          setJobData(response.data);
          console.log(response);
        }
      } catch (error) {
        setError("No Job Available")
      }
    };
    fetchAllData();
  }, [props.searchData]);
  return (
    <div className='jobs'>
      <h3 className='head-font'>{jobData.length} Jobs</h3>
      <div className='job-result'>
        {error && <h4>{error}</h4>}
        {jobData && jobData.map((job, index) => {
          return (
            <div className='job' key={index}>
              <div className='img-container'>
                <img src={job.companyLogo} alt='job-logo' />
              </div>
              <div className='content'>
                <Link to={`/company/profile/view/${job.companyId}`}><p className='company-name'>{job.companyName}</p></Link>
                <Link to={`/jobdetails/${job._id}`}><h2 className='job-title'>{job.jobTitle}</h2></Link>
                <div className='info'><CiLocationOn /> {job.jobLocation} <MdOutlineWatchLater /> {job.employementType}<br /> <FaRupeeSign /> {job.minSalary} to {job.maxSalary} <MdDateRange /> {new Date(job.postingDate).toISOString().slice(0, 10)}  </div>
                <p className='job-desc'>{job.outline}</p>...
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Jobs