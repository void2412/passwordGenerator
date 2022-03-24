// Assignment Code
var generateBtn = document.querySelector("#generate");

function getUserChoice(){
  var passLength = parseInt(window.prompt('Password Length (from 8 to 128 characters)'))
  while(passLength > 128 || passLength < 8 || isNaN(passLength)){
    passLength = parseInt(window.prompt('Wrong Input\nPassword Length (from 8 to 128 characters)'))
  }

  var lowercase = window.confirm('Do you want to include lowercase?')
  var uppercase = window.confirm('Do you want to include uppercase?')
  var number= window.confirm('Do you want to include number?')
  var specialChar = window.confirm('Do you want to include special characters?')

  while (!lowercase && !uppercase && !number && !specialChar){
    alert('Please choose at least 1 criteria')
    lowercase = window.confirm('Do you want to include lowercase?')
    uppercase = window.confirm('Do you want to include uppercase?')
    number= window.confirm('Do you want to include number?')
    specialChar = window.confirm('Do you want to include special characters?')
  }

  var result = {
    length: passLength,
    haveLowercase: lowercase,
    haveUppercase: uppercase,
    haveNumber: number,
    haveSpecialChar: specialChar
  }
  return result
}


function getPassword(){
  // get user choice
  
  
}




// Write password to the #password input
function writePassword() {

  var password = getPassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
