import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import Swal from 'sweetalert2';
import baseURL from '../../../../config';


const Main = () => {
    const applicant = localStorage.getItem("applicantId");
    const [jobData, setJobData] = useState({});
    const [applicantProfileData, setApplicantProfileData] = useState({});
    const [skillsArray, setSkillsArray] = useState([]);
    const [benefitsArray, setBenefitsArray] = useState([]);
    const [error, setError] = useState("");
    const { id } = useParams();

    const [applyData, setApplyData] = useState({});

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/job/${id}`);
                setJobData(response.data);
                setSkillsArray(response.data.skills.split(','));
                setBenefitsArray(response.data.benefits.split(','));
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();

        const fetchApplicantProfileData = async () => {
            try {
                const applicantProfileData = await axios.get(`${baseURL}/api/applicantprofiledata/${localStorage.getItem("applicantId")}`);
                setApplicantProfileData(applicantProfileData);
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchApplicantProfileData();

    }, [id]);


    const showConfirmBox = ()=>{
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, apply!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Job Applied",
                icon: "success"
              }).then(()=>{
                setApplyData({applicantId: localStorage.getItem("applicantId"), applicantName: applicantProfileData.data[0].name, applicantEmail: applicantProfileData.data[0].email, applicantResume: applicantProfileData.data[0].resume,  companyId: jobData.companyId, jobName: jobData.jobTitle, jobId: jobData._id});
              });
            }
          });
    }

    const isEmpty = (obj)=> {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }
      
        return true;
      }

    useEffect(()=>{
        const postApplyData = async()=>{
            const url = `${baseURL}/api/jobapply`;
            const response = await axios.post(url, applyData);
        }
        if(!isEmpty(applyData)){
            postApplyData();
        }
    }, [applyData])

   
    return (
        <main className='job-details-main'>
            {error && <h3>{error}</h3>}
            <div className='container'>
                <div className='job-title'>
                    <h1 className='head-font'>{jobData.jobTitle}</h1>
                </div>
                <div className='top'>
                    <div className='left'>
                        <p><CiLocationOn /> {jobData.jobLocation}</p>
                        <p>Salary range: &#8377;{jobData.minSalary} to &#8377;{jobData.maxSalary}</p>
                        <div className='skills'>
                            {skillsArray && skillsArray.map((skill, index) => (
                                <p key={index}>{skill}</p>
                            ))}
                        </div>
                        <div className='buttons'>
                            <p className='employement-type'>{jobData.employementType}</p>
                            {applicant && <button className='purple-btn' onClick={showConfirmBox}>Apply Now</button>}
                        </div>
                    </div>
                    <div className='middle'>
                        <p><span>Posting Date:</span> {jobData.postingDate}</p>
                        <p><span>Required Experience Level:</span> {jobData.experienceLevel}</p>
                        <p><span>Contact Name:</span> {jobData.contactName}</p>
                        <p><span>Contact Email:</span> {jobData.contactEmail}</p>
                    </div>
                    <div className='right'>
                        <img src={jobData.companyLogo} alt='compnay-logo' />
                        <h1>{jobData.companyName}</h1>
                    </div>
                </div>
                <div className='content'>
                    <div className='benefits'>
                        <h1>Benefits</h1>
                        {benefitsArray && benefitsArray.map((benefit, index) => (
                            <p key={index}>{index + 1}. {benefit}</p>
                        ))}
                    </div>
                    <div className='outline'>
                        <h1>Outline</h1>
                        <p>{jobData.outline}</p>
                    </div>
                    <div className='future-growth'>
                        <h1>Future Growth</h1>
                        <p>{jobData.futureGrowth}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main