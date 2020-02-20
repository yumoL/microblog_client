***Settings***
Documentation  Test register 
Resource  ../Resources/PO/RegisterPage.robot
Resource  ../Resources/Common.robot
Variables  ../Resources/Variables.py
# Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***


***Test Cases***
New user should be able to register with valid data
  [Tags]  Register
  RegisterPage.Register new user successfully  ${USERNAME_1}  ${PWD_1}
  RegisterPage.Register new user successfully  ${USERNAME_2}  ${PWD_2}

Error should exist when register with existing username
  [Tags]  Register
  RegisterPage.Go to register page
  RegisterPage.Start register  ${USERNAME_1}  pwd  pwd
  RegisterPage.Display errors  User name is already existed

Error should exist when register with invalid username
  [Tags]  Register
  RegisterPage.Go to register page
  RegisterPage.Start register  a  pwd  pwd
  RegisterPage.Display errors  Username should be between 3 and 255 characters

Error should exist when register with invalid password
  [Tags]  Register
  RegisterPage.Go to register page
  RegisterPage.Start register  newUser  p  p
  RegisterPage.Display errors  Password should be between 3 and 255 characters

Error should exist when password and its confirmation are different
  [Tags]  Register
  RegisterPage.Go to register page
  RegisterPage.Start register  newUser  pwd  diffPwd
  RegisterPage.Display errors  Confirmation does not match the password 

