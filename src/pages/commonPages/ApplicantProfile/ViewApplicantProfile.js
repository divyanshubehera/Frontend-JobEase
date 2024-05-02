import React, { useState, useEffect } from 'react'
import './ViewApplicantProfile.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import baseURL from '../../../config';

const ViewApplicantProfile = () => {
  document.title = "Job Ease | Applicant Profile";

  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    const company = localStorage.getItem("companyId");
    const applicant = localStorage.getItem("applicantId");
    if(!adminLogin && !company && !applicant){
      window.location.href = "/";
    }
  }, []);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  const [avatarImg, setAvatarImg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/applicantprofiledata/${id}`);
        setProfileData(response.data[0]);
        setAvatarImg(`${baseURL}/files/${response.data[0].avatar}`);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Failed to fetch job data. Please try again later.");
      }
    };

    fetchData();
  }, [id]);

  const [openApplyBox, setOpenApplyBox] = useState(false);

  return (
    <section className='view-profile-container'>
      <div className='container'>
        <div className='profile'>
          <div className='profile-pic'>
            <div className='top'></div>
            <div className='bottom'>
              <div className='content'>
                <h1 className='head-font'>{profileData.name}</h1>
                <p>{profileData.email}</p>
                <p>{profileData.phone}</p>
                <p>{`${profileData.currentAddress_state}, ${profileData.currentAddress_country}`}</p>
                <div className='status'>
                  <div>{profileData.status}</div>
                  <div>{profileData.role}</div>
                </div>
              </div>
            </div>
            <img src={`${baseURL}/files/${profileData.avatar}`} alt='profile-pic' />
          </div>
          <div className='others'>
            <div className='basic-info'>
              <h1>Basic Info</h1>
              {profileData.skills && <p>{profileData.skills}</p>}
              {profileData.hobbies && <p>{profileData.hobbies}</p>}
              <div className='links'>
                {profileData.codingPlatform && <Link to={profileData.codingPlatform}><FaCode /><span> Coding Platform</span></Link>}
                {profileData.linkedin && <Link to={profileData.linkedin}><FaLinkedin /><span> Linkedin</span></Link>}
                {profileData.github && <Link to={profileData.github}><FaGithub /><span> Github</span></Link>}
              </div>
              <div className='current-address'>
                <h3>Current Address</h3>
                {profileData.currentAddress_country && <p>{profileData.currentAddress_country}</p>}
                {profileData.currentAddress_state && <p>{profileData.currentAddress_state}</p>}
                {profileData.currentAddress_pinCode && <p>{profileData.currentAddress_pinCode}</p>}
              </div>
              <div className='permanent-address'>
                <h3>Permanent Address</h3>
                {profileData.permanentAddress_country && <p>{profileData.permanentAddress_country}</p>}
                {profileData.permanentAddress_state && <p>{profileData.permanentAddress_state}</p>}
                {profileData.permanentAddress_pinCode && <p>{profileData.permanentAddress_pinCode}</p>}
              </div>
            </div>
            <div className='education'>
              <h1 className='title head-font'>Education</h1>
              <div className='item'>
                {profileData.education1_orgName && <h3>{profileData.education1_orgName}</h3>}
                <div className='detail'>
                  {profileData.education1_course && <p>{profileData.education1_course}</p>}
                  {profileData.education1_startDate && <p>{`${profileData.education1_startDate} to ${profileData.education1_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.education2_orgName && <h3>{profileData.education2_orgName}</h3>}
                <div className='detail'>
                  {profileData.education2_course && <p>{profileData.education2_course}</p>}
                  {profileData.education2_startDate && <p>{`${profileData.education2_startDate} to ${profileData.education2_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.education3_orgName && <h3>{profileData.education3_orgName}</h3>}
                <div className='detail'>
                  {profileData.education3_course && <p>{profileData.education3_course}</p>}
                  {profileData.education3_startDate && <p>{`${profileData.education3_startDate} to ${profileData.education3_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.education4_orgName && <h3>{profileData.education4_orgName}</h3>}
                <div className='detail'>
                  {profileData.education4_course && <p>{profileData.education4_course}</p>}
                  {profileData.education4_startDate && <p>{`${profileData.education4_startDate} to ${profileData.education4_endDate}`}</p>}
                </div>
              </div>
            </div>
            <div className='project'>
              <h1 className='title head-font'>Project</h1>
              {profileData.projects1_title && <div className='item'>
                <div className='heading'>
                  <h3>{profileData.projects1_title}</h3>
                  <Link to={profileData.projects1_githubLink}><FaGithub /></Link>
                </div>
                <div className='detail'>

                </div>
              </div>}
              {profileData.projects2_title && <div className='item'>
                <div className='heading'>
                  <h3>{profileData.projects2_title}</h3>
                  <Link to={profileData.projects2_githubLink}><FaGithub /></Link>
                </div>
                <div className='detail'>

                </div>
              </div>}
              {profileData.projects3_title && <div className='item'>
                <div className='heading'>
                  <h3>{profileData.projects3_title}</h3>
                  <Link to={profileData.projects3_githubLink}><FaGithub /></Link>
                </div>
                <div className='detail'>

                </div>
              </div>}
              {profileData.projects4_title && <div className='item'>
                <div className='heading'>
                  <h3>{profileData.projects4_title}</h3>
                  <Link to={profileData.projects4_githubLink}><FaGithub /></Link>
                </div>
                <div className='detail'>

                </div>
              </div>}
            </div>
            <div className='internship'>
              <h1 className='title head-font'>Internship</h1>
              <div className='item'>
                {profileData.internships1_companyName && <h3>{profileData.internships1_companyName}</h3>}
                <div className='course'>
                  {profileData.internships1_course && <p>{profileData.internships1_course}</p>}
                  {profileData.internships1_startDate && <p>{`${profileData.internships1_startDate} to ${profileData.internships1_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.internships2_companyName && <h3>{profileData.internships2_companyName}</h3>}
                <div className='course'>
                  {profileData.internships2_course && <p>{profileData.internships2_course}</p>}
                  {profileData.internships2_startDate && <p>{`${profileData.internships2_startDate} to ${profileData.internships2_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.internships3_companyName && <h3>{profileData.internships3_companyName}</h3>}
                <div className='course'>
                  {profileData.internships3_course && <p>{profileData.internships3_course}</p>}
                  {profileData.internships3_startDate && <p>{`${profileData.internships3_startDate} to ${profileData.internships3_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.internships4_companyName && <h3>{profileData.internships4_companyName}</h3>}
                <div className='course'>
                  {profileData.internships4_course && <p>{profileData.internships4_course}</p>}
                  {profileData.internships4_startDate && <p>{`${profileData.internships4_startDate} to ${profileData.internships4_endDate}`}</p>}
                </div>
              </div>
            </div>
            <div className='experience'>
              <h1 className='title head-font'>Work Experience</h1>
              <div className='item'>
                {profileData.workExperiences1_title && <h3>{profileData.workExperiences1_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences1_companyName
                    && <p>{profileData.
                      workExperiences1_companyName
                    }</p>}
                  {profileData.workExperiences1_startDate && <p>{`${profileData.workExperiences1_startDate} to ${profileData.workExperiences1_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences2_title && <h3>{profileData.workExperiences2_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences2_companyName
                    && <p>{profileData.
                      workExperiences2_companyName
                    }</p>}
                  {profileData.workExperiences2_startDate && <p>{`${profileData.workExperiences2_startDate} to ${profileData.workExperiences2_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences3_title && <h3>{profileData.workExperiences3_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences3_companyName
                    && <p>{profileData.
                      workExperiences3_companyName
                    }</p>}
                  {profileData.workExperiences3_startDate && <p>{`${profileData.workExperiences3_startDate} to ${profileData.workExperiences3_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences4_title && <h3>{profileData.workExperiences4_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences4_companyName
                    && <p>{profileData.
                      workExperiences4_companyName
                    }</p>}
                  {profileData.workExperiences4_startDate && <p>{`${profileData.workExperiences4_startDate} to ${profileData.workExperiences4_endDate}`}</p>}
                </div>
              </div>
            </div>
            <div className='achievement'>
              <h1 className='title head-font'>Achievement</h1>
              <div className='item'>
                {profileData.achievement1_title && <h3>{profileData.achievement1_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences1_companyName
                    && <p>{profileData.
                      workExperiences1_companyName
                    }</p>}
                  {profileData.workExperiences1_startDate && <p>{`${profileData.workExperiences1_startDate} to ${profileData.workExperiences1_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences2_title && <h3>{profileData.workExperiences2_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences2_companyName
                    && <p>{profileData.
                      workExperiences2_companyName
                    }</p>}
                  {profileData.workExperiences2_startDate && <p>{`${profileData.workExperiences2_startDate} to ${profileData.workExperiences2_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences3_title && <h3>{profileData.workExperiences3_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences3_companyName
                    && <p>{profileData.
                      workExperiences3_companyName
                    }</p>}
                  {profileData.workExperiences3_startDate && <p>{`${profileData.workExperiences3_startDate} to ${profileData.workExperiences3_endDate}`}</p>}
                </div>
              </div>
              <div className='item'>
                {profileData.workExperiences4_title && <h3>{profileData.workExperiences4_title}</h3>}
                <div className='course'>
                  {profileData.
                    workExperiences4_companyName
                    && <p>{profileData.
                      workExperiences4_companyName
                    }</p>}
                  {profileData.workExperiences4_startDate && <p>{`${profileData.workExperiences4_startDate} to ${profileData.workExperiences4_endDate}`}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewApplicantProfile