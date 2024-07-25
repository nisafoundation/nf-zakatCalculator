const validateEmail = (mail) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) ? true : false;

function generateOTP() {
  var digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  var otpLength = 8;
  var otp = "";
  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
}
function getTime() {
  // Get the current date and time
  let currentDate = new Date();

  // Subtract 25 hours (25 * 60 * 60 * 1000 milliseconds) from the current time
  let pastDate = new Date(currentDate.getTime() - 25 * 60 * 60 * 1000);
  return pastDate;
}
module.exports = {
  validateEmail,
  generateOTP,
  getTime,
};
