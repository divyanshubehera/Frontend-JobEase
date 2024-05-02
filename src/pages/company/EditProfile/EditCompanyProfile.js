import React, {useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './EditCompanyProfile.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import baseURL from '../../../config';


function EditCompanyProfile() {
    document.title = "Job Ease | Edit Profile"
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

    const [profileData, setProfileData] = useState({});

    const [logoImg, setLogoImg] = useState("");
    const [bgImg, setBgImg] = useState("");

    const [logo, setLogo] = useState("");
    const [bg, setBg] = useState("");
    const [error, setError] = useState("");

    const [date, setDate] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/companyprofiledata/${id}`);
                setProfileData(response.data[0]);
                setLogo(response.data[0].companyLogo);
                setBg(response.data[0].companyBackground);
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
        setProfileData({ ...profileData, [name]: value, companyLogo: logo, companyBackground: bg, companyId: localStorage.getItem("companyId") });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profileData);
        try {
            const url = `${baseURL}/api/updatecompanyprofile/${id}`;
            const { data: res } = await axios.put(url, profileData, {
                headers: { "Content-Type": "multipart/form-data"}
            });
            console.log(res);
            Swal.fire({
                title: 'Success!',
                text: "Profile Updated",
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    console.log(result);
                    navigate(`/company/viewprofile/${id}`);
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
                            <img className='logo-img' src={logoImg} alt='logo-img' />
                        </div>
                        <input type="file" name="companyLogo" onChange={handleLogoChange} />
                        <div className='background-display'>
                           <img className='background-img' src={bgImg} alt='background-img' />                            
                        </div>
                        <input type="file" name="companyBackground" onChange={handleBgChange} />
                        <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} value={profileData.companyName} />
                        <input type="text" name="industry" placeholder="Industry" onChange={handleChange} value={profileData.industry} />
                        <input type="date" name="foundingDate" placeholder="Founding Date" onChange={handleChange} value={date} />
                        <input type="text" name="founders" placeholder="Founder(s)" onChange={handleChange} value={profileData.founders} />
                        <input type="text" name="headquartersLocation" placeholder="Headquarters Location" onChange={handleChange} value={profileData.headquartersLocation} />
                        <input type="url" name="website" placeholder="Website" onChange={handleChange} value={profileData.website} />
                        <input type="email" name="contactEmail" placeholder="Contact Email" onChange={handleChange} value={profileData.contactEmail} />
                        <input type="tel" name="contactPhone" placeholder="Contact Phone" onChange={handleChange} value={profileData.contactPhone} />
                        <input type="text" name="contactAddress" placeholder="Contact Address" onChange={handleChange} value={profileData.contactAddress} />
                        <input type="url" name="socialMediaLinks" placeholder="Social Media Links" onChange={handleChange} value={profileData.socialMediaLinks} />
                    </div>
                    <div className="right-grid">
                        <textarea name="description" placeholder="Description" onChange={handleChange} value={profileData.description}></textarea>
                        <textarea name="missionStatement" placeholder="Mission Statement" onChange={handleChange} value={profileData.missionStatement}></textarea>
                        <textarea name="visionStatement" placeholder="Vision Statement" onChange={handleChange} value={profileData.visionStatement}></textarea>
                        <textarea name="companyCulture" placeholder="Company Culture" onChange={handleChange} value={profileData.companyCulture}></textarea>
                        <textarea name="productsServices" placeholder="Products/Services" onChange={handleChange} value={profileData.productsServices}></textarea>
                        <textarea name="awardsAccolades" placeholder="Awards/Accolades" onChange={handleChange} value={profileData.awardsAccolades}></textarea>
                        <button type="submit" className='blue-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCompanyProfile;
