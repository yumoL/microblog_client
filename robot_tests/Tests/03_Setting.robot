***Settings***
Documentation  Test register 
Resource  ../Resources/PO/LoginPage.robot
Resource  ../Resources/Common.robot
Resource  ../Resources/PO/SettingPage.robot
Variables  ../Resources/Variables.py
#Suite Setup  Insertg testing data
Test Setup  Begin Web Test
Test Teardown  End Web Test
# Suite Teardown  Cleanup testing data

***Variables***


***Test Cases***
Can logout
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}
  SettingPage.Logout

Can change username
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}
  SettingPage.Change username  newUsername
  SettingPage.Username change succeeded
  SettingPage.Logout
  LoginPage.Login for other operations  newUsername  ${PWD_1}
  SettingPage.Change username  ${USERNAME_1}
  SettingPage.Username change succeeded

Show error message if new username is already used by another user
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}
  SettingPage.Change username  ${USERNAME_2}
  SettingPage.Display error  User name is already existed

Can change password
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}
  SettingPage.Change password  ${PWD_1}  newPwd  newPwd
  SettingPage.Password change succeeded
  SettingPage.Logout
  LoginPage.Login for other operations  ${USERNAME_1}  newPwd
  SettingPage.Change password  newPwd  ${PWD_1}  ${PWD_1}
  SettingPage.Password change succeeded

Show error message when old password is wrong
  LoginPage.Login for other operations  ${USERNAME_1}  ${PWD_1}
  SettingPage.Change password  wrongPwd  newPwd  newPwd
  SettingPage.Display error  Fail to change password, please make sure that your old password is correct