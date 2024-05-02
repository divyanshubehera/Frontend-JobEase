import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';
import baseURL from '../../../../config';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const CourseModules = () => {
    const [allFiles, setAllFiles] = useState(null);
    useEffect( () => {
        getPdf()
      },[]);
    
      const getPdf = async () => {
        const result = await axios.get(`${baseURL}/api/getPdf/`);
        console.log(result.data.data);
        setAllFiles(result.data.data)
      }
    return (
        <div className='modules text-font'>
            <div className="modules-container">
                {allFiles == null ? "" : allFiles.map((data, index )=> {
                    return (
                        <div className='item' key={index}>
                            <div className='header'>
                                <img src={`${baseURL}/files/${data.icon}`} alt='logo' />
                                <h1 className='head-font'>{data.title}</h1>
                            </div>
                            <Link className='btn blue-btn' target='_blank' to={`${baseURL}/files/${data.pdf}`}>Read Now</Link>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default CourseModules