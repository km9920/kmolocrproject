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
/*
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from'multer-s3';
import uuid from 'uuid4';

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,//accessKeyId의 경우는 공개되지 않도록 환경변수로 설정
    secretAccessKey: process.env.AWS_SECRET_KEY,//secretAccessKey도 공개되지 않도록 환경변수 설정
});

const s3 = new AWS.S3();

// 확장자 검사 목록
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// multer 객체 생성
const uploadImage = multer({
    storage: multerS3({
        s3         : s3,
        bucket     : process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key        : (req, file, callback) => {
            const userId = req.verifiedToken.userInfo;
            
            // 오늘 날짜 구하기
            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth() + 1;
            const currentDate = today.getDate();
            const date = `${currentYear}-${currentMonth}-${currentDate}`;
            
            // 임의번호 생성
            let randomNumber = '';
            for (let i = 0; i < 8; i++) {
                randomNumber += String(Math.floor(Math.random() * 10));
            }
            
            // 확장자 검사
            const extension = path.extname(file.originalname).toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                return callback(new Error('확장자 에러'));
            }
            
            // folder라는 파일 내부에 업로드한 사용자에 따라 임의의 파일명으로 저장
            callback(null, `folder/${userId}_${date}_${randomNumber}`);
        },
        // acl 권한 설정
        acl        : 'public-read-write'
    })
});

export default uploadImage;
*/