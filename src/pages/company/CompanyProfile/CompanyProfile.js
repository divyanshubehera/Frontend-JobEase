import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './CompanyProfile.css';
import { FaRegEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

import { IoLinkOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import baseURL from '../../../config';
import Swal from 'sweetalert2';

const CompanyProfile = () => {
    document.title = "Job Ease | Company Profile"
    const { id } = useParams();
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

    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState("");

    const [logoImg, setLogoImg] = useState("");
    const [bgImg, setBgImg] = useState("");

    const [date, setDate] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/companyprofiledata/${id}`);
                setProfileData(response.data[0]);
                setLogoImg(`${baseURL}/files/${response.data[0].companyLogo}`);
                setBgImg(`${baseURL}/files/${response.data[0].companyBackground}`);
                setDate(new Date(response.data[0].foundingDate).toISOString().slice(0, 10))
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();
    }, [id]);

    return (
        <section className='company-profile'>
            {profileData && <div className='container'>
                <div className='left'>
                    <div className='top'>
                        <div className='bg-image'>
                            <img src={bgImg} alt='building' />
                        </div>

                        <div className='info'>
                            <div className='text'>
                                <p>Company Name: {profileData.companyName}</p>
                                <p>Industry: {profileData.industry}</p>
                                <p>Founding Date: {date}</p>
                                <p>Founder(s): {profileData.founders}</p>
                                <p>Headquater Location: {profileData.headquartersLocation}</p>
                            </div>
                        </div>
                        <div className='logo'>
                            <img src={logoImg} alt='building' />
                        </div>
                    </div>
                    <div className='main'>
                        <div className='item'>
                            <h2>Contact</h2>
                            <p>Email: {profileData.contactEmail}</p>
                            <p>Phone: {profileData.contactPhone}</p>
                            <p>Address: {profileData.contactAddress}</p>
                            <p><Link to={profileData.website}><IoLinkOutline /> Website</Link></p>
                            <p><Link to={profileData.socialMediaLinks}><IoPeople /> Social Media</Link></p>
                        </div>
                        <div className='item'>
                            <h2>Description</h2>
                            <p>{profileData.description}</p>
                        </div>
                        <div className='item'>
                            <h2>Product and Services</h2>
                            <p>{profileData.productsServices}</p>
                        </div>
                        <div className='item'>
                            <h2>Company Culture</h2>
                            <p>{profileData.companyCulture}</p>
                        </div>
                        <div className='item'>
                            <h2>Mission Statement</h2>
                            <p>{profileData.missionStatement}</p>
                        </div>
                        <div className='item'>
                            <h2>Vision Statement</h2>
                            <p>{profileData.visionStatement}</p>
                        </div>
                        <div className='item'>
                            <h2>Awards Accolades</h2>
                            <p>{profileData.awardsAccolades}</p>

                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='edit'>
                        <div className='item'>
                            <div className='text'>
                                <h3>Edit Profile</h3>
                                <p>Update profile details</p>
                            </div>
                            <Link className='edit-link' to={`/company/editprofile/${localStorage.getItem("companyId")}`}><FaRegEdit /></Link>
                        </div>
                        <div className='item'>
                            <div className='text'>
                                <h3>Edit Password</h3>
                                <p>Update your password here</p>
                            </div>
                            <Link className='edit-link' to={`/company/editpassword/${localStorage.getItem("companyId")}`}><FaRegEdit /></Link>
                        </div>
                    </div>
                    <div className='profile-contact'>
                        <div className='phone-contact'>
                            <FaPhone />
                            <h3>Call Us</h3>
                            <p>8877933899</p>
                        </div>
                        <div className='email-contact'>
                            <MdOutlineEmail />
                            <h3>Email Us</h3>
                            <p>jobease100@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default CompanyProfile