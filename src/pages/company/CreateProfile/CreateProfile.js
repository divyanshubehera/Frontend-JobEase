import React, { useState, useEffect } from 'react';
import './CompanyProfile.css';
import Company_placeholder from '../../../assets/company_placeholder.png';
import Company_background from '../../../assets/company_background.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import baseURL from '../../../config';


function CreateProfile() {
    document.title = "Job Ease | Create Company Profile"
    useEffect(() => {
        const companyToken = localStorage.getItem("companyToken");
        if (!companyToken) {
            window.location.href = "/";
        }
    }, [])
    const id = localStorage.getItem("companyId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/companyprofileauth/${id}`);
                console.log(response.data.status); 
                if(response.data.status){
                    navigate(`/company/dashboard/${id}`);
                }               
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [logo, setLogo] = useState("");
    const [bg, setBg] = useState("");
    const [error, setError] = useState("");
    const [logoImg, setLogoImg] = useState();
    const [bgImg, setBgImg] = useState();

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0])
        setLogoImg(URL.createObjectURL(e.target.files[0]));
    }
    const handleBgChange = (e) => {
        setBg(e.target.files[0])
        setBgImg(URL.createObjectURL(e.target.files[0]));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, companyLogo: logo, companyBackground: bg, companyId: localStorage.getItem("companyId") });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const url = `${baseURL}/api/createcompanyprofile/`;
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
                    navigate('/company/dashboard');
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
        <div className="company-profile-form">
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="left-grid">
                        <div className='avatar-display'>
                            {
                                !logo && <img className='logo-img' src={Company_placeholder} alt='logo-img' />
                            }
                            {
                                logo && <img className='logo-img' src={logoImg} alt='logo-img' />
                            }
                        </div>
                        <input type="file" name="companyLogo" onChange={handleLogoChange} />
                        <div className='background-display'>
                            {
                                !bg && <img className='background-img' src={Company_background} alt='background-img' />
                            }
                            {
                                bg && <img className='background-img' src={bgImg} alt='background-img' />
                            }

                        </div>
                        <input type="file" name="companyBackground" onChange={handleBgChange} />
                        <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} />
                        <input type="text" name="industry" placeholder="Industry" onChange={handleChange} />
                        <input type="date" name="foundingDate" placeholder="Founding Date" onChange={handleChange} />
                        <input type="text" name="founders" placeholder="Founder(s)" onChange={handleChange} />
                        <input type="text" name="headquartersLocation" placeholder="Headquarters Location" onChange={handleChange} />
                        <input type="url" name="website" placeholder="Website" onChange={handleChange} />
                        <input type="email" name="contactEmail" placeholder="Contact Email" onChange={handleChange} />
                        <input type="tel" name="contactPhone" placeholder="Contact Phone" onChange={handleChange} />
                        <input type="text" name="contactAddress" placeholder="Contact Address" onChange={handleChange} />
                        <input type="url" name="socialMediaLinks" placeholder="Social Media Links" onChange={handleChange} />
                    </div>
                    <div className="right-grid">
                        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                        <textarea name="missionStatement" placeholder="Mission Statement" onChange={handleChange}></textarea>
                        <textarea name="visionStatement" placeholder="Vision Statement" onChange={handleChange}></textarea>
                        <textarea name="companyCulture" placeholder="Company Culture" onChange={handleChange}></textarea>
                        <textarea name="productsServices" placeholder="Products/Services" onChange={handleChange}></textarea>
                        <textarea name="awardsAccolades" placeholder="Awards/Accolades" onChange={handleChange}></textarea>
                        <button type="submit" className='blue-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProfile;
