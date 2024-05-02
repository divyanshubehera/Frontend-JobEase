import React, { useState, useEffect } from 'react'
import './SearchJob.css'
import Hero from './components/Hero';
import Jobs from './components/Jobs';

const SearchJob = () => {

  document.title = "Job Ease | Search Job"
  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    const company = localStorage.getItem("companyId");
    const applicant = localStorage.getItem("applicantId");
    if(!adminLogin && !company && !applicant){
      window.location.href = "/";
    }
  }, []);

  const [searchData, setSearchData] = useState({});
  const handleFormSubmit = (data) => {
    setSearchData(data)
  }

  return (
    <div className='home'>
      <Hero onSubmit={handleFormSubmit} />
      <main>
        <div className='container'>
          <Jobs searchData={searchData} />
        </div>
      </main>
    </div>
  )
}

export default SearchJob