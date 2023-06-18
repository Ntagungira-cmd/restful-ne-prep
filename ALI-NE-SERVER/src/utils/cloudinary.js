const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "rugayi",
  api_key: "271673368585588",
  api_secret: "UfIBAGi97b6Gm247z4FpeC_nFsU",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NE",
  },
});


const upload = multer({ storage: storage });

module.exports = upload;


