import Image from '../models/image.model.js';

function postImage(req, res) {
  const image = req.files.image;
  image.mv('./server/public/assets/' + image.name);
  const imageToSave = new Image({ name: image.name });
  imageToSave
    .save()
    .then((savedImage) => res.json(savedImage))
    .catch((error) => res.json(error.message));
}

export { postImage };
