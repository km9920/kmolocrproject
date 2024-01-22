import Upload from '../model/uploadModel.js';

export const uploadfile = async (req, res) => {
    try {

        req.body.fileName = req.file.filename;
        req.body.filePath = req.file.path;
        req.body.fileSize = req.file.size;
        req.body.fileOriginalName = req.file.originalname;

        const pdfData = await new Upload(req.body);
        const savedPDF = await pdfData.save();
        res.status(200).json(savedPDF);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deletefile = async (req, res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await Upload.findById(id);
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not exist"});
        }
        await Upload.findByIdAndDelete(id);
        res.status(200).json({msg:"Uploaded File deleted successfully"});

    } catch (error) {
        res.status(500).json({error :error});
    }
}

export const getAll = async(req,res) => {
    try {
        
        const uploadExist = await Upload.find();
        
        if(!uploadExist){
            return res.status(404).json({msg:"Uploaded File data not found"});
        }

        res.status(200).json(uploadExist);

    } catch (error) {
        res.status(500).json({error :err});
    }
}

export const getOne = async (req,res) => {
    try {
        
        const id = req.params.id;
        const uploadExist = await Upload.find({fileOriginalName : `${id}`});
        if(!uploadExist){
            return res.status(404).json({msg: "Uploaded File not found"});
        }
        res.status(200).json(uploadExist);
    } catch (error) {
        res.status(500).json({error :err});
    }
}