import React from 'react';
import './Footer.css';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png'


const Footer = () => {

  document.title = "Job Ease";
  const applicant = localStorage.getItem("applicantToken");
  const company = localStorage.getItem("companyToken");
  const adminLogin = localStorage.getItem("adminLogin");

  return (
    <footer className="footer">
      <div className="logo">
        <img src={Logo} alt="Company Logo" />
      </div>
      {adminLogin && <ul className="links">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/pdfupload">PdfUpload</Link>
        </li>
        <li>
          <Link to="/admin/contact">Contact</Link>
        </li>
      </ul>
      }
      {applicant && <ul className="links">
        <li>
          <Link to="/searchjob">Start a Search</Link>
        </li>
        <li>
          <Link to="/applicant/salaryestimate">Salary Estimate</Link>
        </li>
        <li>
          <Link to="/applicant/resumebuilder">Resume builder</Link>
        </li>
        <li>
          <Link to="/applicant/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/applicant/courses">Courses</Link>
        </li>
        <li>
          <Link to="/applicant/contact">Contact</Link>
        </li>
      </ul>
      }
      {company && <ul className="links">
        <li>
          <Link to={`/company/dashboard/${localStorage.getItem("companyId")}`}>Dashboard</Link>
        </li>
        <li>
          <Link to="/searchjob">Start a Search</Link>
        </li>
        <li>
          <Link to={`/company/myjobs/${localStorage.getItem("companyId")}`}>My Jobs</Link>
        </li>
        <li>
          <Link to="/company/postjobs">Post A Job</Link>
        </li>
        <li>
          <Link to="/company/contact">Contact</Link>
        </li>
      </ul>
      }
      {!applicant && !company && !adminLogin && <ul className="links">
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
      </ul>
      }
      <div className="contact">
        <p>For inquiries, reach out to us at <a href="mailto:jobease100@gmail.com"> jobease100@gmail.com</a></p>
        <div className='social-media'>Follow us on social media:
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={twitter} alt="Twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
