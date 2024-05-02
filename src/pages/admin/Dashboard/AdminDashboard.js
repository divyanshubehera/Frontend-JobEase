import { useEffect, useState } from 'react';
import * as React from 'react';
import './AdminDashboard.css';
import axios, { all } from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import baseURL from '../../../config';

export default function AdminDashboard() {
  document.title = "Job Ease | Admin Dashboard"

  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    if(!adminLogin){
      window.location.href = "/";
    }
  }, [])

  const [userData, setUserData] = useState({});
  const [jobLength, setJobLength] = useState(0);
  const [companyLength, setCompanyLength] = useState(0);
  const [applicantLength, setApplicantLength] = useState(0);

  const [error, setError] = useState("");

  const getName = (email) => {
    var parts = email.split('@');

    var name = parts[0];

    if (name.includes('.')) {
      var nameParts = name.split('.');

      return nameParts[0];
    } else {
      return name;
    }
  }

  const deleteData = async (id) => {
    try {
      const url = `${baseURL}/api/deletedata/${id}`;
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

  useEffect(() => {
    const fetchData = async () => {
      const allData = await axios(`${baseURL}/api/alldata/`)
      setUserData(allData.data);
      setJobLength(allData.data.jobData.length)
      setCompanyLength(allData.data.companyData.length)
      setApplicantLength(allData.data.applicantData.length)
    }
    fetchData();
  }, [])
  return (
    <div className='admin-dashboard'>
      <div className='box-container'>
        <div className='box'>
          <p>Total no of Jobs</p>
          <h1>{jobLength}</h1>
        </div>
        <div className='box'>
          <p>Total no of Companies</p>
          <h1>{companyLength}</h1>
        </div>
        <div className='box'>
          <p>Total no of Applicants</p>
          <h1>{applicantLength}</h1>
        </div>
      </div>
      <div className='table-container'>
        <div className='table'>
          <table>
            <tr>
              <th>Job</th>
              <th>Delete</th>
            </tr>
            {userData.jobData && userData.jobData.map((job, index) => {
              return <tr key={index}>
                <td><Link to={`/jobdetails/${job._id}`}>{job.jobTitle}</Link></td>
                <td><button className='blue-btn' onClick={() => deleteData(job._id)}>Delete</button></td>
              </tr>
            })}
          </table>
        </div>
        <div className='table'>
          <table>
            <tr>
              <th>Company</th>
              <th>Delete</th>
            </tr>
            {userData.companyData && userData.companyData.map((company, index) => {
              return <tr key={index}>
                <td><Link to={`/company/profile/view/${company._id}`}>{getName(company.email)}</Link></td>
                <td><button className='blue-btn' onClick={() => deleteData(company._id)}>Delete</button></td>
              </tr>
            })}
          </table>
        </div>
        <div className='table'>
          <table>
            <tr>
              <th>Applicant</th>
              <th>Delete</th>
            </tr>
            {userData.applicantData && userData.applicantData.map((applicant, index) => {
              return <tr key={index}>
                <td><Link to={`/applicant/profile/view/${applicant._id}`}>{getName(applicant.email)}</Link></td>
                <td><button className='blue-btn' onClick={() => deleteData(applicant._id)}>Delete</button></td>
              </tr>
            })}
          </table>
        </div>
      </div>
    </div>
  );
}