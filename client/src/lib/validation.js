const validateName = (name) => name.length >= 2; // true / false
const validateEmail = (email) => email.includes('@');
const validatePrice = (price, free_transfer) =>
  (parseFloat(price) > 0 && !free_transfer) || free_transfer;

const validatePlayer = (
  player // true
) =>
  validateName(player.name) && // true
  validateEmail(player.email) && // true
  validatePrice(player.price, player.free_transfer); // true

export default validatePlayer;
