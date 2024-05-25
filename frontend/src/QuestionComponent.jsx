import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import icon from './assets/logo.png';

const QuestionComponent = ({ documentId }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };
    console.log(documentId);
    console.log(question);

    const handleAskQuestion = async (event) => {
        console.log(event);
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/ask/', {
                document_id: documentId,
                question: question
            });
            console.log(response);
            setAnswer(response.data.answer);
        } catch (error) {
            setAnswer('Failed to get answer');
        }
    };

    console.log(answer);

    return (
        <div className=''>
        <div className='m-10 px-10 flex gap-4'>
            <img src={icon}/>
            <p className='pt-2'>{answer}</p>
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
