import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logo from './assets/AI Planet Logo.png'

const UploadComponent = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // try {
        //     const response = await axios.post('http://localhost:8000/upload/', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     setMessage(`File uploaded successfully: ${response.data.filename}`);
        //     onUploadSuccess(response.data.id);
        // } catch (error) {
        //     setMessage('File upload failed');
        // }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className='flex px-10 justify-between'>
            <div>
                <img src={logo} />
            </div>
            <Button className=' px-2 text-black'
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<AddCircleOutlineIcon />}
            >
                Upload PDF
                <VisuallyHiddenInput type="file" />
            </Button>
        </div>
    );
};

export default UploadComponent;
