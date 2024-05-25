import React, { useState } from 'react';
// import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Button, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
// import axios from 'axios';
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
        <div className='m-10 px-10'>answer</div>
            <div className='releavtive'>
                <div className='absolute w-full top-[75%]'>
                    <form className='relative px-10 rounded rounded-2' autoComplete="off">
                        <Button className='absolute left-[92%] top-[45px] z-50 outline-none' type='submit'><SendIcon className='text-gray-400' /></Button>
                        <FormControl className='z-10' fullWidth sx={{}}>
                            <OutlinedInput placeholder="Please enter text" />
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default QuestionComponent;
