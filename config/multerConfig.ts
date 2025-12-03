import multer from "multer"
import path from "path";

const uploadPath = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const id: string = req.params.id
    cb(null, id + '-' + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// source
// https://medium.com/@aman003malhotra/using-multer-to-store-files-in-express-a-comprehensive-guide-d1acd25ef4d5