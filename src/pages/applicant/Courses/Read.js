import { useEffect, useState } from 'react';
import axios from "axios";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import './Read.css'
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../config';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function Read() {
    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const navigate = useNavigate();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const { id } = useParams();

    useEffect(() => {
        getPdf();
    }, [id]);


    const getPdf = async () => {
        const result = await axios.get(`${baseURL}/api/getPdfById/${id}`);
        setPdfData(result.data[0].pdf);
    }
    console.log(pdfData)

    return (
        <div className="pdf-div">
            {pdfData && (
                <>
                    <div>
                        <button className='blue-btn' style={{marginTop: '1rem'}} onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <Document className="doc" file={`${baseURL}/files/${pdfData}`} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.apply(null, Array(numPages))
                            .map((x, i) => i + 1)
                            .map(page => {
                                return (
                                    <Page
                                        className="page"
                                        key={page}
                                        pageNumber={page}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                );
                            })}
                    </Document>
                </>
            )}
            
        </div>
    );
}
export default Read;
