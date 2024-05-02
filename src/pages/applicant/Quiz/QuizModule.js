import React, {useEffect} from 'react'
import Hero from './components/Hero'
import Modules from './components/Modules'
import './QuizModule.css'
import Swal from 'sweetalert2'
import baseURL from '../../../config';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const QuizModule = () => {
  document.title = "Job Ease | Quiz"
  const navigate = useNavigate();
  const id = localStorage.getItem("applicantId");
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
 
  return (
    <section className="quizmodules">
      <Hero />
      <div className='container'>
        <Modules />
      </div>
    </section>
  )
}

export default QuizModule