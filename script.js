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
  var randomArray = new Uint32Array(choice[0])
  var result = []
  window.crypto.getRandomValues(randomArray)
  for (var i = 0; i< choice[0]; i++){
    randomArray[i] = randomArray[i] % passwordPool.length
    result.push(passwordPool.charAt(randomArray[i]))
  }
  return result.join('')
  
}




// Write password to the #password input
function writePassword() {

  var password = getPassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
