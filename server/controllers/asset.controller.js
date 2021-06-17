import cloudinarySDK from 'cloudinary';
import Image from '../models/image.model.js';

function postImageToCloudinary(imageFileName, res) {
  const cloudinary = cloudinarySDK.v2;
  const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });

  cloudinary.uploader.upload(imageFileName, (error, result) => {
    if (error) return res.json(error);
    saveAssetReference(result.secure_url, res);
  });
}

function saveAssetReference(imageURL, res) {
  const imageToSave = new Image({ name: imageURL });
  imageToSave
    .save()
    .then((savedImage) => res.json(savedImage))
    .catch((error) => res.json(error.message));
}

function postImage(req, res) {
  const image = req.files.image;
  const imageTarget = './server/public/assets/' + image.name;
  image.mv(imageTarget);
  if (process.env.CLOUDINARY_UPLOAD_ACTIVE === 'on') {
    postImageToCloudinary(imageTarget, res);
  } else {
    saveAssetReference(image.name, res);
  }
}

export { postImage };
