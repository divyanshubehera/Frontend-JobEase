import React, { useEffect, useState } from 'react'
import './Signin.css'
import SigninSvg from '../../../assets/signin.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../../config'


const Signin = () => {
    document.title = "Job Ease | Signin"

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

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setUserData({ ...userData, [input.name]: input.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${baseURL}/api/signin`;
            const { data: res } = await axios.post(url, userData);
            
            if (res.userType == "applicant") {
                localStorage.setItem("applicantToken", res.data);
                localStorage.setItem("applicantId", res.applicantId);
                window.location.href = "/applicant/createprofile";
            }
            if (res.userType == "company") {
                localStorage.setItem("companyToken", res.data);
                localStorage.setItem("companyId", res.companyId);
                window.location.href = "/company/createprofile";
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
        <section className='signin'>
            <div className='container'>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='head-font'><span>Hello</span> Again!</h1>
                        {error && <h4>{error}</h4>}
                        <h5>Welcome back, you've been missed.</h5>
                        <input type='email' placeholder='Enter Email' name='email' onChange={handleChange} />
                        <input type='password' placeholder='Enter Password' name='password' onChange={handleChange} />
                        <button className='blue-btn'>Signin</button>
                        <small>or</small>
                        <small>Don't have an Account ? <Link to='/signup'>Signup</Link></small>
                    </form>
                </div>
                <div className='img'>
                    <img src={SigninSvg} alt='signin' />
                </div>
            </div>
        </section>
    )
}

export default Signin