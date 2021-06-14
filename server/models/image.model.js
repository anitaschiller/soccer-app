import mongoose from 'mongoose';

const Image = mongoose.model('Image', { name: String });

export default Image;
