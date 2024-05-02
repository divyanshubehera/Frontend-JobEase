import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Avatar_placeholder from '../../../assets/avatar-placeholder.png';
import baseURL from '../../../config';

function ApplicantProfile() {
    document.title = "Job Ease | Create Applicant Profile"

    useEffect(()=>{
        const appliantToken = localStorage.getItem("applicantToken");
        if(!appliantToken){
          window.location.href = "/";
        }
      }, [])
    const id = localStorage.getItem("applicantId");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/applicantprofileauth/${id}`);
                console.log(response.data.status); 
                if(response.data.status){
                    navigate('/searchjob');
                }               
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();
    }, []);



    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState("");
    const [resume, setResume] = useState("");
    const [error, setError] = useState("");
    const [avatarImg, setAvatarImg] = useState();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, avatar: avatar, resume: resume, applicantId: localStorage.getItem("applicantId") });
    };


    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
        setAvatarImg(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${baseURL}/api/createapplicantprofile/`;
            const { data: res } = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire({
                title: 'Success!',
                text: "Profile Crteated",
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    console.log(result);
                    navigate('/searchjob');
                }
            });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Got it'
                });
            } else {
                setError("An unexpected error occurred. Please try again later.");
                Swal.fire({
                    title: 'Error!',
                    text: "An unexpected error occurred. Please try again later.",
                    icon: 'error',
                    confirmButtonText: 'Got it'
                });
            }
        }
    };

    return (
        <div className="profile-form">
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="left-grid">
                        <div className='avatar-display'>
                            {!avatarImg && <img className='avatar-placeholder' src={Avatar_placeholder} alt='avatar-placeholder' />}
                            {avatarImg && <img className='avatar-img' src={avatarImg} alt='avatar-img' />}
                        </div>
                        <div className="avatar">
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="basic-info">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="linkedin"
                                placeholder="LinkedIn"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="github"
                                placeholder="GitHub"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="skills"
                                placeholder="Skills"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="languages"
                                placeholder="Languages"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="hobbies"
                                placeholder="Hobbies"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="codingPlatform"
                                placeholder="Coding Platform Profile Link"
                                onChange={handleChange}
                            />
                            <div className='status'>
                                <div className='label'>
                                    <h4>Available Status</h4>
                                </div>
                                <select name="status" onChange={handleChange}>
                                    <option>Employeed</option>
                                    <option>Open to work</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                name="role"
                                placeholder="Enter your role"
                                onChange={handleChange}
                            />
                            <div className="address">
                                <h3 className='section-title'>Address</h3>
                                <input
                                    type="text"
                                    name="currentAddress_country"
                                    placeholder="Current Country"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="currentAddress_state"
                                    placeholder="Current State"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="currentAddress_pinCode"
                                    placeholder="Current Pin Code"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_country"
                                    placeholder="Permanent Country"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_state"
                                    placeholder="Permanent State"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_pinCode"
                                    placeholder="Permanent Pin Code"
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className="achievements">
                            <h3 className='section-title'>Achievements</h3>
                            <div>
                                <h4 className='section-subtitle'>Achievement 1</h4>
                                <input
                                    type="text"
                                    name="achievement1_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement1_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 2</h4>
                                <input
                                    type="text"
                                    name="achievement2_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement2_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 3</h4>
                                <input
                                    type="text"
                                    name="achievement3_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement3_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 4</h4>
                                <input
                                    type="text"
                                    name="achievement4_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement4_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <h3 className='section-title'>Resume</h3>
                        <input
                            type="file"
                            name="resume"
                            placeholder="Upload Resume"
                            onChange={(e) => setResume(e.target.files[0])}
                        />

                    </div>
                    <div className="right-grid">
                        <div className="education">
                            <h3 className='section-title'>Education</h3>
                            <div>
                                <h4 className='section-subtitle'>Education 1</h4>
                                <input
                                    type="text"
                                    name="education1_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education1_orgName"
                                    placeholder="Organization Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education1_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education1_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education1_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 2</h4>
                                <input
                                    type="text"
                                    name="education2_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education2_orgName"
                                    placeholder="Organization Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education2_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education2_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education2_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 3</h4>
                                <input
                                    type="text"
                                    name="education3_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education3_orgName"
                                    placeholder="Organization Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education3_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education3_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education3_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 4</h4>
                                <input
                                    type="text"
                                    name="education4_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education4_orgName"
                                    placeholder="Organization Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education4_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education4_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education4_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="work-experience">
                            <h3 className='section-title'>Work Experience</h3>
                            <div>
                                <h4 className='section-subtitle'>work Experience 1</h4>
                                <input
                                    type="text"
                                    name="workExperiences1_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_certificateLink"
                                    placeholder="Certificate Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_location"
                                    placeholder="Location"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences1_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences1_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_workDescription"
                                    placeholder="Work Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 2</h4>
                                <input
                                    type="text"
                                    name="workExperiences2_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_certificateLink"
                                    placeholder="Certificate Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_location"
                                    placeholder="Location"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences2_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences2_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_workDescription"
                                    placeholder="Work Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 3</h4>
                                <input
                                    type="text"
                                    name="workExperiences3_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_certificateLink"
                                    placeholder="Certificate Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_location"
                                    placeholder="Location"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences3_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences3_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_workDescription"
                                    placeholder="Work Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 4</h4>
                                <input
                                    type="text"
                                    name="workExperiences4_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_certificateLink"
                                    placeholder="Certificate Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_location"
                                    placeholder="Location"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences4_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences4_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_workDescription"
                                    placeholder="Work Description"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="projects">
                            <h3 className='section-title'>Projects</h3>
                            <div>
                                <h4 className='section-subtitle'>Project 1</h4>
                                <input
                                    type="text"
                                    name="projects1_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_overview"
                                    placeholder="Overview"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_deployedLink"
                                    placeholder="Deployed Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_githubLink"
                                    placeholder="GitHub Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 2</h4>
                                <input
                                    type="text"
                                    name="projects2_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_overview"
                                    placeholder="Overview"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_deployedLink"
                                    placeholder="Deployed Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_githubLink"
                                    placeholder="GitHub Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 3</h4>
                                <input
                                    type="text"
                                    name="projects3_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_overview"
                                    placeholder="Overview"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_deployedLink"
                                    placeholder="Deployed Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_githubLink"
                                    placeholder="GitHub Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 4</h4>
                                <input
                                    type="text"
                                    name="projects4_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_overview"
                                    placeholder="Overview"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_deployedLink"
                                    placeholder="Deployed Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_githubLink"
                                    placeholder="GitHub Link"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_description"
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="internship">
                            <h3 className='section-title'>Internship</h3>
                            <div>
                                <h4 className='section-subtitle'>Internship 1</h4>
                                <input
                                    type="text"
                                    name="internships1_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships1_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships1_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships1_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships1_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 2</h4>
                                <input
                                    type="text"
                                    name="internships2_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships2_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships2_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships2_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships2_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 3</h4>
                                <input
                                    type="text"
                                    name="internships3_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships3_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships3_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships3_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships3_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 4</h4>
                                <input
                                    type="text"
                                    name="internships4_title"
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships4_companyName"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships4_startDate"
                                    placeholder="Start Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships4_endDate"
                                    placeholder="End Date"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships4_course"
                                    placeholder="Course"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className='blue-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplicantProfile;
