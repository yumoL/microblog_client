***Settings***
Documentation  Test register 
Resource  ../Resources/PO/Register.robot
Resource  ../Resources/Common.robot
# Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***


***Test Cases***
New user should be able to register with valid data
  [Tags]  Register
  Register.Go to register page
  Register.Start register  testUser  testPwd  testPwd
  Register.Register succeeded

Error should exist when register with existing username
  [Tags]  Register
  Register.Go to register page
  Register.Start register  testUser  pwd  pwd
  Register.Display errors  User name is already existed

Error should exist when register with invalid username
  [Tags]  Register
  Register.Go to register page
  Register.Start register  a  pwd  pwd
  Register.Display errors  Username should be between 3 and 255 characters

Error should exist when register with invalid password
  [Tags]  Register
  Register.Go to register page
  Register.Start register  newUser  p  p
  Register.Display errors  Password should be between 3 and 255 characters

Error should exist when password and its confirmation are different
  [Tags]  Register
  Register.Go to register page
  Register.Start register  newUser  pwd  diffPwd
  Register.Display errors  Confirmation does not match the password 

