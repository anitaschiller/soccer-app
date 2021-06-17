export default function imageUrl(imageName) {
  const absoluteURLPattern = /^https?:\/\//i;
  if (absoluteURLPattern.test(imageName)) {
    return imageName;
  } else {
    return 'http://localhost:4000/assets/' + imageName;
  }
}
