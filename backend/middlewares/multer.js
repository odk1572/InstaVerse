import multer from "multer";
const upload = multer({
    storage:multer.memoryStorage(),
    preservePath: true,
});
export default upload;