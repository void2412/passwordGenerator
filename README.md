# <Password-Generator>

## Description

This project is created for the purpose of generating a strong password with popular criteria from most of the website nowadays.
I created this project so that I don't have to think about my password everytime I want to make a new account for anywebsite. Just use keychain and this :).

## Usage

1. Just enter your password length, please make sure it needs to be at least 8 characters and not more than 128 characters.
2. Then, please choose at least 1 criteria for your password. It will display invalid option if you did not select any criteria or choose wrong password length.
3. The copy button can be used to quickly copy the generated password to clipboard.



## Credits
Chi Hieu Nguyen


## Badges
![badmath](https://img.shields.io/badge/html-%20-green)
![badmath](https://img.shields.io/badge/css-%20-green)
![badmath](https://img.shields.io/badge/javascript-%20-green)

## Features

1. It uses **checkboxes** and **inputBox** instead of **prompt** and **confirm** for smoother UI and better user experience.
2. It uses **window.crypto** method to generate random password instead of **math.random** for improved security. Since **math.random** can be cracked easily at the time of the password was created.
3. It displays where the user has input invalid value or option by showing a red/orange border around that area. That border should disappear after 3 second.
4. The copy button is used to quickly copy the generated password.