import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import icon from './assets/logo.png';
import userIcon from './assets/user.jpeg'
import LoadingCom from './assets/LoadingCom';

const QuestionComponent = ({ documentId }) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false)
    const [qaList, setQaList] = useState([]);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = async (event) => {
        event.preventDefault();
        if (question.trim() === '') return;
        setLoading(true);
        setQuestion('');


        try {
            const response = await axios.post(`http://localhost:8000/ask/?document_id=${documentId}&question=${encodeURIComponent(question)}`);
            const answer = response.data.answer;

            setQaList((prevQaList) => [
                ...prevQaList,
                { question, answer },
            ]);
        } catch (error) {
            console.error('Error:', error);
            setQaList((prevQaList) => [
                ...prevQaList,
                { question, answer: 'Failed to get answer' },
            ]);
        } finally {
            setLoading(false);
        }

        // try {
        //     const response = await fetch(`http://localhost:8000/ask/?document_id=${documentId}&question=${encodeURIComponent(question)}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     });

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }

        //     const data = await response.json();

        //     setQaList((prevQaList) => [
        //         ...prevQaList,
        //         { question, answer: data.answer },
        //     ]);
        // } catch (error) {
        //     console.error('Error:', error);
        //     setQaList((prevQaList) => [
        //         ...prevQaList,
        //         { question, answer: 'Failed to get answer' },
        //     ]);
        // } finally {
        //     setLoading(false);
        // }


    };


    return (
        <div className='flex flex-col h-screen'>
            <div className='flex-grow overflow-y-scroll m-10 px-10 flex gap-4 flex-col '>
                {qaList.map((qa, index) => (
                    <div key={index} className='pb-10'>
                        <div className='flex'>
                            <img className='w-10 h-10 rounded rounded-full' src={userIcon} alt="user" />
                            <p className='pt-2 pl-4'>{qa.question}</p>
                        </div>
                        <div className='flex pt-5'>
                            <img className='w-10 h-10 rounded rounded-full' src={icon} alt="bot" />
                            <p className='pt-2 pl-4'>{qa.answer}</p>
                        </div>
                    </div>
                ))}
                {loading && (<div className='flex'>
                    <img className='w-10 h-10 rounded rounded-full' src={icon} />
                    <div className='pt-2 pl-4'> <LoadingCom /></div>
                </div>
                )}
            </div>
                <div className='sticky bottom-0 '>
                    <form className=' relative px-10 rounded rounded-2 ' autoComplete="off" onSubmit={handleAskQuestion}>
                        <input required={true} class="w-full outline-none px-4 py-4 text-sm bg-gray-100 border border-gray-300 rounded outline-2 shadow-md"
                            id='inputForm'
                            placeholder='Please enter text...'
                            type="text_content"
                            onChange={handleQuestionChange}
                            value={question}

                        />
                        <Button className='absolute left-[80%] md:left-[88%] lg:left-[92%] top-[-45px] z-50' type='submit'   ><SendIcon className='text-gray-500' /></Button>
                    </form>
                </div>
            </div>

    );
};

export default QuestionComponent;
