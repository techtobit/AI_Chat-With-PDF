import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import logo from './assets/AI Planet Logo.png';
import DescriptionIcon from '@mui/icons-material/Description';

const UploadComponent = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    function getFileName(str) {
        if (str.length > 22) {
            return str.substr(0, 10) + '...' + str.substr(-4)
        }
        return str
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // useEffect(() => {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         setFile(null)
    //         try {
    //             const response = axios.post('http://localhost:8000/upload/', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }

    //             });
    //             setMessage(`File uploaded successfully: ${response.data.id}`);
    //             onUploadSuccess(response.data.id);
    //             return {errors: false}
    //         } catch (error) {
    //         }
    //     }
    // }, [file])

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('http://localhost:8000/upload/', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        if(response.status==400){
                            setMessage('PDF Only')
                        }
                        throw new Error(`Error uploading file: ${response.status} - ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if(data.filename){
                        const fileName = getFileName(data.filename)
                        setMessage(fileName)
                    }
                    onUploadSuccess(data.id);
                    setFile(null); 
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    
                });
        }
    }, [file]);

    

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
        <div className='flex px-10 py-4 justify-between border border-b-gray-100 shadow-sm'>
            <div>
                <img src={logo} alt="AI Planet Logo" />
            </div>
            <div className='flex items-center gap-4'>
            <p></p>

                <div  className={message === 'PDF Only' ? "px-2 py-[6px] text-blck-400 bg-red-100 rounded rounded-sm font-sm" : "px-2 py-[6px] text-green-400 bg-gray-50 rounded rounded-sm font-sm"} > {message && <p><DescriptionIcon /> {message}</p>}</div>
                <Button
                    className='px-2 text-black'
                    // onChange={handleUpload}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    <span className='hidden md:flex lg:flex '>Upload PDF</span>
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
                {/* {message && <p>{message}</p>} */}
            </div>
        </div>
    );
};

export default UploadComponent;
