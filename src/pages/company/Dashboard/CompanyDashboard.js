import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link , useNavigate} from 'react-router-dom';
import './CompanyDashboard.css';
import { PieChart } from '@mui/x-charts';
import baseURL from '../../../config';
import Swal from 'sweetalert2';


export default function CompanyDashboard() {
  document.title = "Job Ease | Company Dashboard"
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [jobData, setJobData] = useState([]);
  const [applicantData, setApplicantData] = useState([]);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const jobResponse = await axios.get(`${baseURL}/api/jobByComapnyId/${id}`);
        setJobData(jobResponse.data);
      } catch (error) {
        setError(error.response.data.message)
      }
    };
    fetchAllData();
    const fetchApplicantData = async () => {
      try {
        const applicantResponse = await axios.get(`${baseURL}/api/getapplicantbycomapnyid/${id}`);
        setApplicantData(applicantResponse.data);
      } catch (error) {
        setError(error.response.data.message)
      }
    };
    fetchApplicantData();
  }, [id]);

  const downloadFileAtURL = (url, resume) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute('download', resume);
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading file:', error));
  }

  useEffect(() => {
    const counts = {};
    applicantData.forEach(applyData => {
      counts[applyData.jobName] = (counts[applyData.jobName] || 0) + 1;
    });

    const jobCounts = Object.keys(counts).map(jobName => ({
      label: jobName,
      value: counts[jobName]
    }));

    setChartData(jobCounts);
  }, [applicantData]);

  console.log(chartData);


  return (
    <div className='company-dashboard'>
      <div className='box-container'>
        <div className='box'>
          <p>Applicants per Job</p>
          <PieChart
            className='pie-chart'
            margin={{ left: 100 }}
            series={[
              {
                data: chartData
              }
            ]}
            width={400}
            height={200}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 1000,
              },
            }}
          />
        </div>
        <div className='box'>
          <p>Total no of Jobs</p>
          <h1>{jobData.length}</h1>
        </div>
        <div className='box'>
          <p>Total no of Applicants</p>
          <h1>{applicantData.length}</h1>
        </div>
      </div>
      <div className='table-container'>
        <div className='table table-1'>
          <table>
            <tr>
              <th>Jobs Posted</th>
              <th>Posting Date</th>
            </tr>
            {
              jobData.map((job, index) => {
                return (
                  <tr key={index}>
                    <td><Link to={`/jobdetails/${job._id}`}>{job.jobTitle}</Link></td>
                    <td>{job.postingDate.slice(0, 10)}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <div className='table table-2'>
          <table>
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Job Name</th>
              <th>Resume</th>
            </tr>
            {
              applicantData.map((applyData, index) => {
                return (
                  <tr key={index}>
                    <td><Link to={`/applicant/profile/view/${applyData.applicantId}`}>{applyData.applicantName}</Link></td>
                    <td>{applyData.applicantEmail}</td>
                    <td>{applyData.jobName}</td>
                    <td><button className='blue-btn' onClick={() => { downloadFileAtURL(`${baseURL}/files/${applyData.applicantResume}`, applyData.applicantResume) }}>Download</button></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </div>
  );
}