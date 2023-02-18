import {UPLOADED_IMAGES_DIR} from '@/env-init';
import {nanoid} from 'nanoid';
import path from 'node:path';
import multer from 'multer';
const BYTES_IN_MB = 1048576;
const FILE_SIZE_LIMIT = BYTES_IN_MB * 50;

process.cwd();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, UPLOADED_IMAGES_DIR!);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const name = `${nanoid()}${extname}`;
    return cb(null, name);
  },
});

export const MulterConfig: multer.Options = {
  storage,
  limits: {fileSize: FILE_SIZE_LIMIT},
};

export const imageUploadMiddleware = multer(MulterConfig).single('file');
