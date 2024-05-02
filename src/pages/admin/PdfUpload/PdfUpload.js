import { useEffect, useState } from 'react';
import axios from "axios";
import { pdfjs } from 'react-pdf';
import './PdfUpload.css';
import uploadsvg from '../../../assets/upload-svg.svg'
import { FaFileUpload } from "react-icons/fa";
import Swal from 'sweetalert2'
import baseURL from '../../../config';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function PdfUpload() {
  document.title = "Job Ease | Admin Pdf Upload"

  useEffect(()=>{
    const adminLogin = localStorage.getItem("adminLogin");
    if(!adminLogin){
      window.location.href = "/";
    }
  }, [])

  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [iconName, setIconName] = useState("");


  const [error, setError] = useState("");

  

const handlePdfChange = (e)=>{
  setPdfName(e.target.files[0].name);
  setPdfFile(e.target.files[0])
}
const handleIconChange = (e)=>{
  setIconName(e.target.files[0].name);
  setIconFile(e.target.files[0])
}

  const submitFile = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", pdfFile);
    formData.append("icon", iconFile);


    try {
      const result = await axios.post(
        `${baseURL}/api/uploadPdf/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      if (result.data.status === "ok") {
        Swal.fire({
          title: 'Success!',
          text: "Uploaded Successfully",
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Got it'
        });
      } else {
        setError("An unexpected error occurred. Please try again later.");
        Swal.fire({
          title: 'Error!',
          text: "An unexpected error occurred. Please try again later.",
          icon: 'error',
          confirmButtonText: 'Got it'
        });
      }
    }
  };


  return (
    <div className="pdf-upload">
      <div className='container'>
        <div className='img'>
          <img src={uploadsvg} alt='course-logo' />
        </div>
        <div className='form'>
          <form onSubmit={submitFile}>
            <h3 className='head-font'>UPLOAD PDF DETAILS</h3>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor='pdf'>
              <FaFileUpload /> {pdfName ? pdfName : "Upload PDF"}
            </label>
            <input
              type="file"
              id='pdf'
              className="form-control"
              accept="application/pdf"
              required
              onChange={handlePdfChange}
            />
            <label htmlFor='icon'>
              <FaFileUpload /> {iconName ? iconName : "Upload ICON"}
            </label>
            <input
              type="file"
              id='icon'
              className="form-control"
              accept="image/jpeg, image/jpg, image/png, image/svg+xml"
              required
              onChange={handleIconChange}
            />

            <br />
            <button className='blue-btn' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PdfUpload;
