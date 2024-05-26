import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import icon from './assets/logo.png';
import userIcon from './assets/user.jpeg'
import LoadingCom from './assets/LoadingCom';

const QuestionComponent = ({ documentId }) => {
    const [question, setQuestion] = useState('');
    const [showQuestion, setshowQuestion] = useState('');
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('');

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };


    const handleAskQuestion = async (event) => {
        setshowQuestion(question)
        setLoading(true)
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/ask/?document_id=${documentId}&question=${encodeURIComponent(question)}`);
            console.log(response);
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error:', error);
            setAnswer('Failed to get answer');
        }
    };
    

    if(answer && loading===true){
        setLoading(false)
    } 

    return (
        <div className=''>
        <div className='m-10 px-10 flex gap-4 flex-col'>
        <div className='pb-10'>
            {showQuestion ? <div className='flex'>
                <img className='w-10 h-10 rounded rounded-full' src={userIcon}/>
                <p className='pt-2 pl-4'>{showQuestion}</p>
            </div> : ""}
        </div>
        {
            (answer) ? 
            <div className='flex'>
            <img className='w-10 h-10 rounded rounded-full' src={icon}/>
            <p className='pt-2 pl-4'>{answer}</p>
            </div>
            : ''
        }
        {
            (loading) ? <div className='flex'>
            <img className='w-10 h-10 rounded rounded-full' src={icon}/>
            <div className='pt-2 pl-4'> <LoadingCom/></div>
            </div>:''
            
        }

        </div>
            <div className='releavtive'>
                <div className='absolute w-full top-[78%]'>
                    <form className='relative px-10 rounded rounded-2 ' autoComplete="off" onSubmit={handleAskQuestion}>
                        <input class="w-full px-4 py-4 text-sm bg-gray-100 border border-gray-300 rounded outline-2 shadow-md" 
                        placeholder='Please enter text...' 
                        type="text_content"
                        value={question}
                        onChange={handleQuestionChange}
                        autofocus 
                            
                        />
                        <Button className='absolute left-[92%] top-[-45px] z-50' type='submit'><SendIcon className='text-gray-500' /></Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionComponent;
