import React, { useEffect } from 'react';
import './LandingPage.css';
import LandingPageImg from '../../assets/landing-page-img.svg'
import { FaSearch } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

import Saswat from '../../assets/saswat.jpg'
import Alok from '../../assets/alok.jpg'
import Jayaprakash from '../../assets/jayaprakash.jpg'
import Divyanshu from '../../assets/divyanshu.jpg'

const LandingPage = () => {

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (adminLogin) {
      window.location.href = '/admin/dashboard';
    }
    const applicantToken = localStorage.getItem("applicantToken");
    if (applicantToken) {
      window.location.href = '/searchjob'
    }
    const companyToken = localStorage.getItem("companyToken");
    if (companyToken) {
      window.location.href = `/company/dashboard/${localStorage.getItem("companyId")}`;
    }
  }, [])

  return (
    <div className="landing-page">
      <section className="first-section">
        <div className='container'>
          <div className="left">
            <h1>Empower Job Seekers</h1>
            <h1>Transforming Job Market</h1>
            <p>Our platform transforms job hunting by integrating listings, interview prep, and resume tools, empowering seekers to navigate with confidence.</p>
          </div>
          <div className="right">
            <img src={LandingPageImg} alt="landing" />
          </div>
        </div>
      </section>

      <section id='about' className="about">
        <h1>Dive into <span>Our Story</span></h1>
        <p>Our innovative approach tackles the challenges confronting job seekers head-on. We offer personalized recommendations, interactive resources, and regular updates on application progress. With a focus on empowering users, our vision entails bolstered success rates, heightened confidence, and a more efficient job market. Ultimately, we aim to enrich society by enhancing career opportunities and fostering economic growth.</p>
      </section>
      <section id='features' className='features'>
        <h1 className='section-title'>Features</h1>
        <div className='container'>
          <div className='item'>
            <FaSearch className='icon' />
            <h1 className='head-font'>Job Search</h1>
          </div>
          <div className='item'>
            <MdWork className='icon' />
            <h1 className='head-font'>Apply Jobs</h1>
          </div>
          <div className='item'>
            <MdOutlineQuiz className='icon' />
            <h1 className='head-font'>Quiz</h1>
          </div>
          <div className='item'>
            <RiPagesLine className='icon' />
            <h1 className='head-font'>Resume Builder</h1>
          </div>
          <div className='item'>
            <FaBookReader className='icon' />
            <h1 className='head-font'>Courses</h1>
          </div>
          <div className='item'>
            <MdOutlinePostAdd className='icon' />
            <h1 className='head-font'>Post Job</h1>
          </div>
          <div className='item'>
            <MdManageAccounts className='icon' />
            <h1 className='head-font'>Manage Jobs</h1>
          </div>
          <div className='item'>
            <MdOutlineConnectWithoutContact className='icon' />
            <h1 className='head-font'>Enquiry</h1>
          </div>
        </div>
      </section>
      <section className='contributors'>
        <h1 className='section-title'>Our Contributors</h1>
        <div className='container'>
          <div className='item'>
            <img src={Saswat} alt='Saswat' />
            <h3>Saswat Kumar Sahu</h3>
          </div>
          <div className='item'>
            <img src={Alok} alt='Alok' />
            <h3>Alok Mohanty</h3>
          </div>
          <div className='item'>
            <img src={Divyanshu} alt='Divyanshu' />
            <h3>Divyanshu Kumar Behera</h3>
          </div>
          <div className='item'>
            <img src={Jayaprakash} alt='jayaprakash' />
            <h3>Jayaprakash Behera</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
