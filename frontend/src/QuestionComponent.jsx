import React, { useState } from 'react';
import { Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import icon from './assets/logo.png'
const QuestionComponent = ({ documentId }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = async () => {
        // try {
        //     const response = await axios.post('http://localhost:8000/ask/', {
        //         document_id: documentId,
        //         question: question
        //     });
        //     setAnswer(response.data.answer);
        // } catch (error) {
        //     setAnswer('Failed to get answer');
        // }
    };




    return (
        <div className=''>
        <div className='m-10 px-10'>
            <img src={icon}/>
            <p>{answer}</p>
        </div>
            <div className='releavtive'>
                <div className='absolute w-full top-[78%]'>
                    <form className='relative px-10 rounded rounded-2 ' autoComplete="off">
                        <input type="text" class="w-full px-4 py-4 text-sm bg-gray-100 border border-gray-300 rounded outline-2 shadow-md" placeholder='Please enter text...' name="tags" autofocus />
                        <Button className='absolute left-[92%] top-[-45px] z-50' type='submit'><SendIcon className='text-gray-500' /></Button>
                        {/* <FormControl className='z-10 outline-1 "outline outline-offset-2 outline-blue-500' fullWidth sx={{}}>
                            <OutlinedInput placeholder="Please enter text" />
                        </FormControl> */}
                    </form>
                </div>
            </div>
        </div>

    );
};

export default QuestionComponent;
