***Settings***
Documentation  Test register 
Resource  ../Resources/PO/LoginPage.robot
Resource  ../Resources/Common.robot
Variables  ../Resources/Variables.py
# Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***


***Test Cases***
User should be able to login with correct credentials
  [Tags]  Login
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}

User should not be able to login with wrong credentials
  [Tags]  Login
  LoginPage.Go to login page
  LoginPage.Start login  ${USERNAME_1}  wrongPwd
  LoginPage.Display errors

