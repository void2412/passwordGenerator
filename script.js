// Assignment Code
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");

// Write password to the #password input
function writePassword() {

  var choice = getUserChoice()
  var element = document.querySelector("#passwordLengthBox")
  if (isNaN(choice.length) || (choice.length < 8 || choice.length > 128)){
    element.value = ""
    element.setAttribute("style","box-shadow: 0 0 3px red;")
    countDown(element, "style", "border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));")
    return
  }
  else{
    element.setAttribute("style","border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));")
  }

  element = document.querySelector("#invalidArea")
  if (!choice.haveLowercase && !choice.haveUppercase && !choice.haveNumber && !choice.haveSpecialChar){
    
    element.setAttribute("style","display:block;")
    
    return
  }
  else{
    element.setAttribute("style","display:none;")
  }

  var password = getPassword(choice);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function countDown(selector, attribute, value){
  var timeleft = 3
  var timeInterval = setInterval(function(){
    if (timeleft < 1){
      clearInterval(timeInterval)
      selector.setAttribute(attribute, value)
    }
    else{
      timeleft--
    }
  }, 1000)
}

function copyPassword(){
  var password = document.querySelector("#password").value
  if (password === ""){
    alert('Error! Password is blank')
    return
  }
  navigator.clipboard.writeText(password)
  alert('Password copied successfully')
}

// Add event listener to buttons
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPassword);

// get user choice of validation and length
function getUserChoice(){
  var passLength = document.querySelector("#passwordLengthBox").value
  var lowercase = document.querySelector("#lowercase").checked
  var uppercase = document.querySelector("#uppercase").checked
  var number= document.querySelector("#number").checked
  var specialChar = document.querySelector("#specialChar").checked

  

  var result = {
    length: parseInt(passLength),
    haveLowercase: lowercase,
    haveUppercase: uppercase,
    haveNumber: number,
    haveSpecialChar: specialChar
  }
  console.log(result)
  return result
}

// logic to generate random password
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

// logic to validate password
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

// function to get final password
function getPassword(choice){
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

function checkboxClicked(){
  document.querySelector("#invalidArea").setAttribute("style","display:none;")
}