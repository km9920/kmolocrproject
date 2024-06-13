import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = "./imageuploads";
        if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
        }
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`; // You can customize the naming convention
        cb(null, filename);
    }
});

export default multer({storage});