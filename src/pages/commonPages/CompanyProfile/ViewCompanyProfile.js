import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './ViewCompanyProfile.css';

import { Link } from 'react-router-dom';

import { IoLinkOutline } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import baseURL from '../../../config';

const ViewCompanyProfile = () => {
    document.title = "Job Ease | Company Profile"
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
        <section className='company-profile-view'>
            <div className='container'>
                <div className='left'>
                    <div className='top'>
                        <div className='bg-image'>
                            <img src={bgImg} alt='building' />
                        </div>
                        <div className='info'>
                            <div className='text'>
                                <p>Company Name: {profileData.companyName}</p>
                                <p>Industry: {profileData.industry}</p>
                                <p>Foundingdate: {date}</p>
                                <p>Founders: {profileData.founders}</p>
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
                            <h2>Company Culter</h2>
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
            </div>
        </section>
    )
}

export default ViewCompanyProfile