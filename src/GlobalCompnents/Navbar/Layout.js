import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import Logo from '../../assets/logo.png';
import Avatar from '../../assets/admin.png';
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import Footer from '../Footer/Footer'
import baseURL from "../../config";

const Layout = () => {

    const [error, setError] = useState("");
    const [avatarImg, setAvatarImg] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("applicantToken");
        localStorage.removeItem("applicantId");
        localStorage.removeItem("companyToken");
        localStorage.removeItem("companyId");
        localStorage.removeItem("adminLogin");
        window.location = "/";
    }


    const applicant = localStorage.getItem("applicantToken");
    const company = localStorage.getItem("companyToken");
    const adminLogin = localStorage.getItem("adminLogin");

    const applicantId = localStorage.getItem("applicantId");
    const companyId = localStorage.getItem("companyId");


    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (applicantId) {
                    const response = await axios.get(`${baseURL}/api/applicantprofiledata/${applicantId}`);
                    setAvatarImg(`${baseURL}/files/${response.data[0].avatar}`);
                }
                if (companyId) {
                    const response = await axios.get(`${baseURL}/api/companyprofiledata/${companyId}`);
                    setAvatarImg(`${baseURL}/files/${response.data[0].companyLogo}`);
                }
            } catch (error) {
                console.error("Error fetching job data:", error);
                setError("Failed to fetch job data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <nav className="navbar head-font">
                <Link to='/'><div className="logo">
                    <img src={Logo} alt="logo" />
                    <h1>Job Ease</h1>
                </div></Link>
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
                {adminLogin && <div className="user">
                    <div className="avatar">
                        <img src={Avatar} alt="avatar" />
                    </div>
                    <div className="logout-btn">
                        <button className="white-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                }
                {applicant && <div className="user">
                    <div className="avatar">
                        <Link to={`/applicant/viewprofile/${localStorage.getItem("applicantId")}`}><img src={avatarImg} alt="avatar" /></Link>
                    </div>
                    <div className="logout-btn">
                        <button className="white-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                }
                {company && <div className="user">
                    <div className="avatar">
                        <Link to={`/company/viewprofile/${localStorage.getItem("companyId")}`}><img src={avatarImg} alt="avatar" /></Link>
                    </div>
                    <div className="logout-btn">
                        <button className="white-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                }
                <div className="bars">
                    <IoMdMenu onClick={toggleMenu} />
                </div>
                <div className={showMenu ? "toogle-menu" : "toogle-menu hide"} onClick={toggleMenu} >
                    {!applicant && !company && !adminLogin && <ul className="links">
                        <li>
                            <Link to="/signin">SignIn</Link>
                        </li>
                        <li>
                            <Link to="/signup">SignUp</Link>
                        </li>
                    </ul>
                    }
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
                    {applicant && <div className="user">
                        <div className="avatar">
                            <Link to={`/applicant/viewprofile/${localStorage.getItem("applicantId")}`}><img src={avatarImg} alt="avatar" /></Link>
                        </div>
                        <div className="logout-btn">
                            <button className="white-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    }
                    {company && <div className="user">
                        <div className="avatar">
                            <Link to={`/company/viewprofile/${localStorage.getItem("companyId")}`}><img src={avatarImg} alt="avatar" /></Link>
                        </div>
                        <div className="logout-btn">
                            <button className="white-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    }
                    {adminLogin && <div className="user">
                        <div className="avatar">
                            <img src={Avatar} alt="avatar" />
                        </div>
                        <div className="logout-btn">
                            <button className="white-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    }
                </div>
            </nav>


            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;
