import React, { useState, useEffect } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import ApplicantImg from '../../../assets/applicant.svg'
import CompanyImg from '../../../assets/company.svg'
import baseURL from '../../../config'

const Signup = () => {
    document.title = "Job Ease | Signup"

    useEffect(()=>{
        const applicantToken = localStorage.getItem("appliantToken");
        if(applicantToken){
            window.location.href = '/searchjob'
        }
        const companyToken = localStorage.getItem("companyToken");
        if(companyToken){
            window.location.href = `/company/dashboard/${localStorage.getItem("companyId")}`;
        }
        const adminLogin = localStorage.getItem("adminLogin");
        if(adminLogin){
            window.location.href = '/admin/dashboard';
        }
    }, [])

    const [role, setRole] = useState("");

    const navigate = useNavigate();


    const [userData, setUserData] = useState({});
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setUserData({ ...userData, [input.name]: input.value, userType: role });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${baseURL}/api/signup`;
            const { data: res } = await axios.post(url, userData);
            console.log(res.message);
            if(res.success){
                navigate('/signin');
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: res.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                })

            }
        }
    }
    return (
        <section className='signup'>
            <div className='container'>
                <div className='role-selector'>
                    <div className='selector' onClick={(e) => setRole("Applicant")}>
                        <img src={ApplicantImg} alt='applicant-img' />
                        <h3>Applicant</h3>
                    </div>
                    <div className='selector' onClick={(e) => setRole("Comapny")}>
                        <img src={CompanyImg} alt='applicant-img' />
                        <h3>Company</h3>
                    </div>
                </div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='head-font'>Signup</h1>
                        {error && <h4>{error}</h4>}
                        
                        <input type='text' name='userType' id='userType' value={role} placeholder='Choose your role' />
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleChange} />
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleChange} />
                        <input type='password' placeholder='Enter Confirm Password' name='cpassword' onChange={handleChange} />
                        <button className='blue-btn'>Signup</button>
                        <small>or</small>
                        <small>Aleary have an Account ? <Link to='/signin'>Signin</Link></small>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Signup