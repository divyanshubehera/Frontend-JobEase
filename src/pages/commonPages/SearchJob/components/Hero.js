import React, {useState} from 'react'
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const Hero = (props) => {
  const [formData, setFormData] = useState({});
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    setFormData({...formData, [name]: value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    props.onSubmit(formData);
  }
  return (
    <section className='hero'>
      <div className='container'>
        <div className='text'>
          <h1 className='head-font'>Find your <span>new job</span> today</h1>
          <p>Thousands of Jobs in the computer, engineering and technology sectors are waiting for you.</p>
        </div>
        <form className='search' onSubmit={handleSubmit}>
          <div className='wrapper'>
            <div className='icon'><CiSearch /></div>
            <input type='text' name='position' placeholder='What position are you looking for ?' onChange={handleChange} />
          </div>
          <div className='wrapper'>
            <div className='icon'><CiLocationOn /></div>
            <input type='text' name='location' placeholder="Location" onChange={handleChange} />
          </div>
          <button type='submit' className='blue-btn'>Search</button>
        </form>
      </div>
    </section>
  )
}

export default Hero