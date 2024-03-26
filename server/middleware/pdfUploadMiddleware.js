import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = "./pdfuploads";
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
        cb(null, directory)
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;  // Date.now() 다른 거로 바꾸기 '년월일시분초'
        cb(null, filename);
    }
});

export default multer({storage});