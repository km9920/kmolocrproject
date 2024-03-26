import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageUploader = () => {
    const [imageFile, setImageFile] = useState(null);
    const [filePath, setFilePath] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        handleFile(file);
    };
    
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setSelectedFile(droppedFile);
        handleFile(droppedFile);
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    
    const handleFile = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setImageFile(e.target.result);
        };
    };
    

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const imageContentType = selectedFile.type;

            const base64toBlob = (data) => {
                const base64 = data.substr(`data:${imageContentType};base64,`.length); 
                const byteCharacters = atob(base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray]);
            };
            const blob = base64toBlob(imageFile);
            const url = URL.createObjectURL(blob);

            await axios.post("http://localhost:5000/api/uploads/imagefileupload", formData)
            .then((response) => {
                toast.success("File uploaded successfully", {position:"top-right"})
                setFilePath(url);
            }).catch(error => console.log(error))
        } catch (error) {
            // Handle errors (e.g., show error message)
            console.error('Error uploading file:', error);
        }
    }

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard", { position: "top-right" });
    };

    return (
        <div>

        
        <div
            className='upload-section'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
        >
            <div className='img-smiles'>
                <div>
                    {filePath &&
                    <div>
                        <img src={filePath} alt="Uploaded Preview" style={{ width: '70%', height: 'auto', marginTop: '10px' }} />
                        <div style={{ marginTop: '10px' }}>
                            <p>SMILES: HCONSP</p>
                            <button onClick={() => handleCopyToClipboard()}>Copy</button>
                            <p>IUPAC Nomenclature: caffein</p>
                            <button onClick={() => handleCopyToClipboard()}>Copy</button>
                        </div>
                    </div>}
                </div>
            </div>
        {!filePath && 
        <div>
        <input className='file-input' type="file" accept=".jpg, .jpeg, .png" onChange={handleImageSelect} />
        
        <button className='process-button' onClick={handleImageUpload}>Upload Image</button>
        </div>}
        
        </div>
        </div>
    );
};

export default ImageUploader;
