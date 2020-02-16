***Settings***
Documentation  Test register 
Resource  ../Resources/PO/LoginPage.robot
Resource  ../Resources/Common.robot
# Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***


***Test Cases***
User should be able to login with correct credentials
  [Tags]  Login
  LoginPage.Go to login page
  LoginPage.Start login  testUser  testPwd
  LoginPage.Login succeeded

User should not be able to login with wrong credentials
  [Tags]  Login
  LoginPage.Go to login page
  LoginPage.Start login  testUser  wrongPwd
  LoginPage.Display errors

