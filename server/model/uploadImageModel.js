import mongoose from "mongoose";

const uploadImageSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true
    },
    filePath:{
        type: String,
        required: true
    },
    fileSize:{
        type: String,
        required: true
    },
    fileOriginalName:{
        type: String,
        required: true
    }
})

export default mongoose.model("UploadImage", uploadImageSchema);