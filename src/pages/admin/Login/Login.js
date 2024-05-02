import React, {useState, useEffect} from 'react';
import './Login.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import baseURL from '../../../config';

const Login = () => {
  document.title = "Job Ease | Admin Login"

  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    if(adminLogin){
      window.location.href = '/admin/dashboard';
    }
    const applicant = localStorage.getItem("applicantToken");
    if(applicant){
      window.location.href = '/searchjob'
    }
    const company = localStorage.getItem("companyToken");
    if(company){
      window.location.href = `/comapny/dashboard/${localStorage.getItem("companyId")}`
    }
  }, [])

    const {id} = useParams();
    const [data, setData] = useState({});
    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const url = `${baseURL}/api/admin/login`;
            const {data: res} = await axios.post(url, data);
            window.location.href = '/admin/dashboard';
            localStorage.setItem("adminLogin", true);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        }
    }
  return (
    <div className='admin-login'>
        <form className='admin-login-form' onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <input type='text' id='username' name='username' placeholder='Enter Username' onChange={handleChange} />
            <input type='password' id='password' name='password' placeholder='Enter Password' onChange={handleChange} />
            <input type='submit' value="Login" className='blue-btn' />
        </form>
    </div>
  )
}

export default Login