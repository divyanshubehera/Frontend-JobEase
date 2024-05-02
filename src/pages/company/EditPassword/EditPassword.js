import React, {useState, useEffect} from 'react';
import './EditPassword.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import baseURL from '../../../config';

const EditPassword = (e) => {
    document.title = "Job Ease | Edit Password"
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

    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const url = `${baseURL}/api/company/editpassword/${id}`;
            const {data: res} = await axios.put(url, data);
            Swal.fire({
                title: 'Success!',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'Cool'
              }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
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
                    confirmButtonText: 'Ok'
                  })
            }
        }
    }
  return (
    <div className='edit-password'>
        <form className='company-edit-password' onSubmit={handleSubmit}>
            <h2>Edit Password</h2>
            <input type='password' id='newPassword' name='password' placeholder='Enter New Password' onChange={handleChange} />
            <input type='password' id='newConPassword' name='conPassword' placeholder='Enter Confirm Password' onChange={handleChange} />
            <input type='submit' className='blue-btn' />
        </form>
    </div>
  )
}

export default EditPassword