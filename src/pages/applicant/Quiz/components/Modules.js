import React, { useState } from 'react'
import { PythonQuizData } from '../data/PythonQuizData';
import { JavaQuizData } from '../data/JavaQuizData';
import { CppQuizData } from '../data/CppQuizData';
import { BackendQuizData } from '../data/BackendQuizData';
import { FrontendQuizData } from '../data/FrontendQuizData';
import { CloudComputingQuizData } from '../data/CloudComputingQuizData';
import { DevOpsQuizData } from '../data/DevOpsQuizData';
import { DatabaseEngineerQuizData } from '../data/DatabaseEngineerQuizData';
import { SoftwareTestingQuizData } from '../data/SoftwareTestingQuizData';
import Quiz from './Quiz';
import '../QuizTest.css'
import PythonLogo from '../../../../assets/python-logo.png'
import JavaLogo from '../../../../assets/java-logo.png'
import CppLogo from '../../../../assets/cpp-logo.png'
import FrontendLogo from '../../../../assets/frontend-logo.png'
import BackendLogo from '../../../../assets/backend-logo.png'
import CloudComputingLogo from '../../../../assets/cloudcomputing.png'
import DevopsLogo from '../../../../assets/devops-logo.png'
import DatabaseLogo from '../../../../assets/database-logo.png'
import SoftwareTestingLogo from '../../../../assets/st-logo.png'

const Modules = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [hideModule, setHideModule] = useState(false);

    const handleSelectQuiz = (quizData) => {
        setSelectedQuiz(quizData);
        setHideModule(!hideModule);
        localStorage.setItem("quizData", JSON.stringify(selectedQuiz));
    };

    return (
        <div className='modules text-font'>
            <div className={hideModule ? "quiz-test" : "quiz-test hide"}>
                {selectedQuiz && <Quiz quizData={selectedQuiz} />}
            </div>
            <div className={hideModule ? "modules-container hide" : "modules-container"}>
                <div className='item python-item'>
                    <div className='header'>
                        <img src={PythonLogo} alt='python-logo' />
                        <h1 className='head-font'>Python</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(PythonQuizData)}>Take a Test</button>
                </div>
                <div className='item java-item'>
                <div className='header'>
                        <img src={JavaLogo} alt='java-logo' />
                        <h1 className='head-font'>Java</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(JavaQuizData)}>Take a Test</button>
                </div>
                <div className='item cpp-item'>
                <div className='header'>
                        <img src={CppLogo} alt='C++-logo' />
                        <h1 className='head-font'>C++</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(CppQuizData)}>Take a Test</button>
                </div>
                <div className='item backend-item'>
                <div className='header'>
                        <img src={FrontendLogo} alt='frontend-logo' />
                        <h1 className='head-font'>Frontend</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(FrontendQuizData)}>Take a Test</button>
                </div>
                <div className='item front-end'>
                <div className='header'>
                        <img src={BackendLogo} alt='backend-logo' />
                        <h1 className='head-font'>Backend</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(BackendQuizData)}>Take a Test</button>
                </div>
                <div className='item cloud-item'>
                <div className='header'>
                        <img src={CloudComputingLogo} alt='cloudcomputing-logo' />
                        <h1 className='head-font'>Cloud Computing</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(CloudComputingQuizData)}>Take a Test</button>
                </div>
                <div className='item devops-item'>
                <div className='header'>
                        <img src={DevopsLogo} alt='devops-logo' />
                        <h1 className='head-font'>Devops</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(DevOpsQuizData)}>Take a Test</button>
                </div>
                <div className='item db-item'>
                <div className='header'>
                        <img src={DatabaseLogo} alt='database-logo' />
                        <h1 className='head-font'>Database</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(DatabaseEngineerQuizData)}>Take a Test</button>
                </div>
                <div className='item st-item'>
                <div className='header'>
                        <img src={SoftwareTestingLogo} alt='softwaretesting-logo' />
                        <h1 className='head-font'>Software Testing</h1>
                    </div>
                    <button className='blue-btn' onClick={() => handleSelectQuiz(SoftwareTestingQuizData)}>Take a Test</button>
                </div>
            </div>
        </div>
    )
}

export default Modules