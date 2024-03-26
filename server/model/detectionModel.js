import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    pdf_name:{
        type: String,
        required: true
    },
    page:{
        type: Number,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    position:{
        type: Array,
        required: true
    },
    page_image_name:{
        type: String,
        required: true
    },
    patch_image_name:{
        type: String,
        required: true
    },
    page_image_url:{
        type: String,
        required: true
    },
    patch_image_url:{
        type: String,
        required: true
    },
    smiles:{
        type: String,
        required: true
    }
})

export default mongoose.model("Detections", detectionSchema);