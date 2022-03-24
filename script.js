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

function generatePassword(passwordPool, passLength) {
  var randomArray = new Uint32Array(passLength)
  var result = []
  window.crypto.getRandomValues(randomArray)
  for (var i = 0; i< passLength; i++){
    randomArray[i] = randomArray[i] % passwordPool.length
    result.push(passwordPool.charAt(randomArray[i]))
  }
  return result.join('')
}

function validatePassword(password, lowercase, uppercase, number, specialChar){
  var haveLowercase = false
  var haveUppercase = false
  var haveNumber = false
  var haveSpecialChar = false

  for (var i = 0; i < password.length; i++){
    var charCode = password.charCodeAt(i)
    if (charCode > 96 && charCode < 123){
      haveLowercase = true
    }
    if(charCode > 64 && charCode < 91){
      haveUppercase = true
    }
    if(charCode > 47 && charCode < 58){
      haveNumber = true
    }
    if((charCode > 32 && charCode < 48) || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127)){
      haveSpecialChar = true
    }
  }
  if (lowercase !== haveLowercase || uppercase !== haveUppercase || number !== haveNumber || specialChar !== haveSpecialChar){
    return false
  }
  return true
}

function getPassword(){
  // get user choice
  var choice = getUserChoice()
  // init criteria
  var lowercase = "qwertyuiopasdfghjklzxcvbnm"
  var uppercase = lowercase.toUpperCase()
  var number = "1234567890"
  var specialChar = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"
  var passwordPool = ""
  var criteria = [lowercase, uppercase, number, specialChar]
  choice = Object.values(choice)

  // put criteria into passwordPool for randomization
  for (var i = 0; i < choice.length; i++){
    if (choice[i] === true){
      passwordPool = passwordPool.concat(criteria[i-1])
    }
  }
  // generate password
  var password = generatePassword(passwordPool, choice[0])
  // validate password to meet criteria, otherwise create new password
  while (!validatePassword(password, choice[1], choice[2], choice[3], choice[4])){
    password = generatePassword(passwordPool, choice[0])
  }
  return password
}




// Write password to the #password input
function writePassword() {

  var password = getPassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
