import Multer from 'multer';
export const multerMiddleware = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 40 * 1024 * 1024, // no larger than 10mb
  },
});
