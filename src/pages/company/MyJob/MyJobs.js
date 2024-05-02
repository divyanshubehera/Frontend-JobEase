import React, {useEffect} from 'react'
import './MyJobs.css'
import JobSearch from './components/JobSearch'
import AllJobs from './components/AllJobs'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import baseURL from '../../../config'


const MyJobs = () => {
  document.title = "Job Ease | MyJobs"
  const {id} = useParams();
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

  return (
    <section className='my-jobs'>
      <JobSearch />
      <div className='container'>
        <AllJobs />
      </div>
    </section>
  )
}

export default MyJobs