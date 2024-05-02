import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar_placeholder from '../../../assets/avatar-placeholder.png';
import baseURL from '../../../config';


function EditApplicantProfile() {
    document.title = "Job Ease | Edit Profile"
    const navigate = useNavigate();
    const { id } = useParams();
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

    const [formData, setFormData] = useState({});

    const [avatarImg, setAvatarImg] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/applicantprofiledata/${id}`);
                setFormData(response.data[0]);
                setAvatar(response.data[0].avatar);
                setResume(response.data[0].resume);
                setAvatarImg(`${baseURL}/files/${response.data[0].avatar}`);
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();
    }, [id]);


    const [avatar, setAvatar] = useState("");
    const [resume, setResume] = useState("");
    const [error, setError] = useState("");



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, avatar: avatar, resume: resume, applicantId: localStorage.getItem("applicantId") });
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
        setAvatarImg(URL.createObjectURL(e.target.files[0]));
    }
    const handleResumeChange = (e) => {
        setResume(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const url = `${baseURL}/api/updateapplicantprofile/${id}`;
            const { data: res } = await axios.put(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res);
            Swal.fire({
                title: 'Success!',
                text: "Profile Updated",
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    navigate(`/applicant/viewprofile/${id}`);
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
                                value={formData.name}
                                placeholder="Name"
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                placeholder="Phone"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="linkedin"
                                value={formData.linkedin}
                                placeholder="LinkedIn"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="github"
                                value={formData.github}
                                placeholder="GitHub"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                placeholder="Skills"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="languages"
                                value={formData.languages}
                                placeholder="Languages"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="hobbies"
                                value={formData.hobbies}
                                placeholder="Hobbies"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="codingPlatform"
                                value={formData.codingPlatform}
                                placeholder="Coding Platform Profile Link"
                                onChange={handleChange}
                            />
                            <div className='status'>
                                <div className='label'>
                                    <h4>Available Status</h4>
                                </div>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option>Employeed</option>
                                    <option>Open to work</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                placeholder="Enter your role"
                                onChange={handleChange}
                            />
                            <div className="address">
                                <h3 className='section-title'>Address</h3>
                                <input
                                    type="text"
                                    name="currentAddress_country"
                                    value={formData.currentAddress_country}
                                    placeholder="Current Country"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="currentAddress_state"
                                    value={formData.currentAddress_state}
                                    placeholder="Current State"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="currentAddress_pinCode"
                                    value={formData.currentAddress_pinCode}
                                    placeholder="Current Pin Code"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_country"
                                    value={formData.permanentAddress_country}
                                    placeholder="Permanent Country"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_state"
                                    value={formData.permanentAddress_state}
                                    placeholder="Permanent State"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="permanentAddress_pinCode"
                                    value={formData.permanentAddress_pinCode}
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
                                    value={formData.achievement1_title}
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement1_description"
                                    value={formData.achievement1_description}
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 2</h4>
                                <input
                                    type="text"
                                    name="achievement2_title"
                                    value={formData.achievement2_title}
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement2_description"
                                    value={formData.achievement2_description}
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 3</h4>
                                <input
                                    type="text"
                                    name="achievement3_title"
                                    value={formData.achievement3_title}
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement3_description"
                                    value={formData.achievement3_description}
                                    placeholder="Description"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Achievement 4</h4>
                                <input
                                    type="text"
                                    name="achievement4_title"
                                    value={formData.achievement4_title}
                                    placeholder="Title"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="achievement4_description"
                                    value={formData.achievement4_description}
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
                            onChange={handleResumeChange}
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
                                    value={formData.education1_course}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education1_orgName"
                                    placeholder="Organization Name"
                                    value={formData.education1_orgName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education1_startDate"
                                    placeholder="Start Date"
                                    value={formData.education1_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education1_endDate"
                                    placeholder="End Date"
                                    value={formData.education1_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education1_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    value={formData.education1_marks}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 2</h4>
                                <input
                                    type="text"
                                    name="education2_course"
                                    placeholder="Course"
                                    value={formData.education2_course}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education2_orgName"
                                    placeholder="Organization Name"
                                    value={formData.education2_orgName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education2_startDate"
                                    placeholder="Start Date"
                                    value={formData.education2_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education2_endDate"
                                    placeholder="End Date"
                                    value={formData.education2_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education2_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    value={formData.education2_marks}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 3</h4>
                                <input
                                    type="text"
                                    name="education3_course"
                                    placeholder="Course"
                                    value={formData.education3_course}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education3_orgName"
                                    placeholder="Organization Name"
                                    value={formData.education3_orgName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education3_startDate"
                                    placeholder="Start Date"
                                    value={formData.education3_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education3_endDate"
                                    placeholder="End Date"
                                    value={formData.education3_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education3_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    value={formData.education3_marks}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Education 4</h4>
                                <input
                                    type="text"
                                    name="education4_course"
                                    placeholder="Course"
                                    value={formData.education4_course}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education4_orgName"
                                    placeholder="Organization Name"
                                    value={formData.education4_orgName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education4_startDate"
                                    placeholder="Start Date"
                                    value={formData.education4_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="education4_endDate"
                                    placeholder="End Date"
                                    value={formData.education4_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="education4_marks"
                                    placeholder="Marks/Percentage/CGPA"
                                    value={formData.education4_marks}
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
                                    value={formData.workExperiences1_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_certificateLink"
                                    placeholder="Certificate Link"
                                    value={formData.workExperiences1_certificateLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_companyName"
                                    placeholder="Company Name"
                                    value={formData.workExperiences1_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_location"
                                    placeholder="Location"
                                    value={formData.workExperiences1_location}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences1_startDate"
                                    placeholder="Start Date"
                                    value={formData.workExperiences1_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences1_endDate"
                                    placeholder="End Date"
                                    value={formData.workExperiences1_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences1_workDescription"
                                    placeholder="Work Description"
                                    value={formData.workExperiences1_workDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 2</h4>
                                <input
                                    type="text"
                                    name="workExperiences2_title"
                                    placeholder="Title"
                                    value={formData.workExperiences2_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_certificateLink"
                                    placeholder="Certificate Link"
                                    value={formData.workExperiences2_certificateLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_companyName"
                                    placeholder="Company Name"
                                    value={formData.workExperiences2_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_location"
                                    placeholder="Location"
                                    value={formData.workExperiences2_location}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences2_startDate"
                                    placeholder="Start Date"
                                    value={formData.workExperiences2_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences2_endDate"
                                    placeholder="End Date"
                                    value={formData.workExperiences2_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences2_workDescription"
                                    placeholder="Work Description"
                                    value={formData.workExperiences2_workDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 3</h4>
                                <input
                                    type="text"
                                    name="workExperiences3_title"
                                    placeholder="Title"
                                    value={formData.workExperiences3_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_certificateLink"
                                    placeholder="Certificate Link"
                                    value={formData.workExperiences3_certificateLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_companyName"
                                    placeholder="Company Name"
                                    value={formData.workExperiences3_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_location"
                                    placeholder="Location"
                                    value={formData.workExperiences3_location}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences3_startDate"
                                    placeholder="Start Date"
                                    value={formData.workExperiences3_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences3_endDate"
                                    placeholder="End Date"
                                    value={formData.workExperiences3_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences3_workDescription"
                                    placeholder="Work Description"
                                    value={formData.workExperiences3_workDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>work Experience 4</h4>
                                <input
                                    type="text"
                                    name="workExperiences4_title"
                                    placeholder="Title"
                                    value={formData.workExperiences4_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_certificateLink"
                                    placeholder="Certificate Link"
                                    value={formData.workExperiences4_certificateLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_companyName"
                                    placeholder="Company Name"
                                    value={formData.workExperiences4_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_location"
                                    placeholder="Location"
                                    value={formData.workExperiences4_location}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences4_startDate"
                                    placeholder="Start Date"
                                    value={formData.workExperiences4_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="workExperiences4_endDate"
                                    placeholder="End Date"
                                    value={formData.workExperiences4_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="workExperiences4_workDescription"
                                    placeholder="Work Description"
                                    value={formData.workExperiences4_workDescription}
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
                                    value={formData.projects1_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_overview"
                                    placeholder="Overview"
                                    value={formData.projects1_overview}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_deployedLink"
                                    placeholder="Deployed Link"
                                    value={formData.projects1_deployedLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_githubLink"
                                    placeholder="GitHub Link"
                                    value={formData.projects1_githubLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects1_description"
                                    placeholder="Description"
                                    value={formData.projects1_description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 2</h4>
                                <input
                                    type="text"
                                    name="projects2_title"
                                    placeholder="Title"
                                    value={formData.projects2_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_overview"
                                    placeholder="Overview"
                                    value={formData.projects2_overview}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_deployedLink"
                                    placeholder="Deployed Link"
                                    value={formData.projects2_deployedLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_githubLink"
                                    placeholder="GitHub Link"
                                    value={formData.projects2_githubLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects2_description"
                                    placeholder="Description"
                                    value={formData.projects2_description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 3</h4>
                                <input
                                    type="text"
                                    name="projects3_title"
                                    placeholder="Title"
                                    value={formData.projects3_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_overview"
                                    placeholder="Overview"
                                    value={formData.projects3_overview}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_deployedLink"
                                    placeholder="Deployed Link"
                                    value={formData.projects3_deployedLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_githubLink"
                                    placeholder="GitHub Link"
                                    value={formData.projects3_githubLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects3_description"
                                    placeholder="Description"
                                    value={formData.projects3_description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Project 4</h4>
                                <input
                                    type="text"
                                    name="projects4_title"
                                    placeholder="Title"
                                    value={formData.projects4_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_overview"
                                    placeholder="Overview"
                                    value={formData.projects4_overview}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_deployedLink"
                                    placeholder="Deployed Link"
                                    value={formData.projects4_deployedLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_githubLink"
                                    placeholder="GitHub Link"
                                    value={formData.projects4_githubLink}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="projects4_description"
                                    placeholder="Description"
                                    value={formData.projects4_description}
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
                                    value={formData.internships1_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships1_companyName"
                                    placeholder="Company Name"
                                    value={formData.internships1_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships1_startDate"
                                    placeholder="Start Date"
                                    value={formData.internships1_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships1_endDate"
                                    placeholder="End Date"
                                    value={formData.internships1_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships1_course"
                                    placeholder="Course"
                                    value={formData.internships1_course}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 2</h4>
                                <input
                                    type="text"
                                    name="internships2_title"
                                    placeholder="Title"
                                    value={formData.internships2_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships2_companyName"
                                    placeholder="Company Name"
                                    value={formData.internships2_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships2_startDate"
                                    placeholder="Start Date"
                                    value={formData.internships2_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships2_endDate"
                                    placeholder="End Date"
                                    value={formData.internships2_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships2_course"
                                    placeholder="Course"
                                    value={formData.internships2_course}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 3</h4>
                                <input
                                    type="text"
                                    name="internships3_title"
                                    placeholder="Title"
                                    value={formData.internships3_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships3_companyName"
                                    placeholder="Company Name"
                                    value={formData.internships3_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships3_startDate"
                                    placeholder="Start Date"
                                    value={formData.internships3_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships3_endDate"
                                    placeholder="End Date"
                                    value={formData.internships3_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships3_course"
                                    placeholder="Course"
                                    value={formData.internships3_course}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className='section-subtitle'>Internship 4</h4>
                                <input
                                    type="text"
                                    name="internships4_title"
                                    placeholder="Title"
                                    value={formData.internships4_title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships4_companyName"
                                    placeholder="Company Name"
                                    value={formData.internships4_companyName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships4_startDate"
                                    placeholder="Start Date"
                                    value={formData.internships4_startDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    name="internships4_endDate"
                                    placeholder="End Date"
                                    value={formData.internships4_endDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="internships4_course"
                                    placeholder="Course"
                                    value={formData.internships4_course}
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

export default EditApplicantProfile;
