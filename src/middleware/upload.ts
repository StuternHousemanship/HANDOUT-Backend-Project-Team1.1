import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/items");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadImg = multer({ storage: storage }).any();
