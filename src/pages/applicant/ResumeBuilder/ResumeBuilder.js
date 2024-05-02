import React from 'react';
import './main.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../config';
import { useEffect } from 'react';


function ResumeBuilder() {
  document.title = "Job Ease | Resume Builder"
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


  return (
    <div className="main head-font">
      <Header />
      <Body />
    </div>
  );
}

export default ResumeBuilder;
