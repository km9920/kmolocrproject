import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/getFile.css"
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// DB에 upload된 파일 표로 보여주는 화면
const GetFile = () => {

    const [uploads, setUploads] = useState([]);
    
    // DB에 upload된 파일들 목록 가져오기
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get("http://localhost:5000/api/uploads/getAll")
            setUploads(response.data);
        }
        fetchData();
    },[])

    // DB에서 파일 제거하기
    const deleteFile = async (uploadId) => {
        await axios.delete(`http://localhost:5000/api/uploads/delete/${uploadId}`)
        .then((response) => {
            setUploads((prevuUload) => prevuUload.filter((uploads) => uploads._id !== uploadId))
            toast.success(response.data.msg, {position:"top-right"})
        }).catch((error) => console.log(error))
    }

    return(
        <div className='uploadTable'>
            <Link to={"/"} className='mainpageButton'>Main Page</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>File name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        uploads.map((uploads, index) => {
                            return(
                                <tr key={uploads._id}>
                                    <td>{index +1}</td>
                                    <td>{uploads.fileName}</td>
                                    <td className='actionButtons'>
                                        <button onClick={() => deleteFile(uploads._id)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default GetFile;