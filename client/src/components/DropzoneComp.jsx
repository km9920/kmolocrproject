/*import React from 'react';
import {useDropzone} from 'react-dropzone';

const Dropzone = () => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag & Drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Dropzone;
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, ThumbnailIcon } from '@react-pdf-viewer/default-layout';
import { Icon } from '@react-pdf-viewer/core';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const DropzoneComp = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) =>{
            setPdfFile(e.target.result);
        }
    };
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
        },
        multiple: false,
    });

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('pdf', selectedFile);

            const base64String = pdfFile;
            const pdfContentType = 'application/pdf';

            const base64toBlob = (data) => {
                const base64 = data.substr(`data:${pdfContentType};base64,`.length); 
                const byteCharacters = atob(base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray]);
            };
            const blob = base64toBlob(base64String);
            const url = URL.createObjectURL(blob);

            await axios.post("http://localhost:5000/api/uploads/fileupload", formData)
            .then((response) => {
                toast.success("File uploaded successfully", {position:"top-right"})
                setFilePath(url);
            }).catch(error => console.log(error))
        } catch (error) {
            // Handle errors (e.g., show error message)
            console.error('Error uploading file:', error);
        }
    };

    if (filePath){
        return(
            <div className='pdf-container'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={filePath} plugins={[defaultLayoutPluginInstance]}/>;
            </Worker>
            </div>
        )
    }
    return (
        <div className='dropzone-container'>
            <div {...getRootProps()} className='dropzone'>
                
                {!selectedFile && !filePath && (
                    <div>
                    <input {...getInputProps()} />
                    <p>Drag & drop a PDF file here, or click to select one</p>
                    </div>
                )}
                {selectedFile && !filePath && (
                    <div>
                    <p>Selected File: {selectedFile.name}</p>
                    </div>
                )}
            </div>
                {selectedFile && !filePath && (
                    <div>
                    <button type='submit' onClick={handleUpload}>Upload</button>
                    </div>
                )}
            <div {...getRootProps()} className='dropzone'>
                
                {!selectedFile && !filePath && (
                    <div>
                    <input {...getInputProps()} />
                    <p>Drag & drop a Image file here, or click to select one</p>
                    </div>
                )}
                {selectedFile && !filePath && (
                    <div>
                    <p>Selected File: {selectedFile.name}</p>
                    </div>
                )}
            </div>
                {selectedFile && !filePath && (
                    <div>
                    <button type='submit' onClick={handleUpload}>Upload</button>
                    </div>
                )}
        </div>
    );
};

export default DropzoneComp;