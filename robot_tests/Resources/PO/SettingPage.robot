***Settings***
Library  SeleniumLibrary
Resource  ./LandingPage.robot

***Variables***
${SETTING_DROPDOWN} =  id=settingDropdown
${ACCOUNT_SETTING_ITEM} =   id=accountSettingItem
${LOGOUT_BUTTON} =    id=logoutButton
${NEW_USERNAME_FIELD} =  id=newUserNameField
${SAVE_BI_CHANGE_BUTTON}=  id=saveBIChangeButton
${OLD_PWD_FIELD} =  id=oldPwdField
${NEW_PWD_FIELD} =  id=newPwdField
${PWD_CONFIRM_FIELD} =  id=pwdConfirmField
${PWD_SAVE_BUTTON} =  id=pwdSaveButton

***Keywords***
Go to setting page
  Click Element  ${SETTING_DROPDOWN}

Change username
  [Arguments]  ${NEW_USERNAME}
  Go to setting page
  Click Element  ${ACCOUNT_SETTING_ITEM}
  Input Text  ${NEW_USERNAME_FIELD}  ${NEW_USERNAME}

Change password
  [Arguments]  ${OLD_PWD}  ${NEW_PWD}  ${PWD_CONFIRM}
  Go to setting page
  Click Element  ${ACCOUNT_SETTING_ITEM}
  Input Text  ${OLD_PWD_FIELD}  ${OLD_PWD}
  Input Text  ${NEW_PWD_FIELD}  ${NEW_PWD}
  Input Text  ${PWD_CONFIRM_FIELD}  ${PWD_CONFIRM}
  Click Button  ${PWD_SAVE_BUTTON}

Username change succeeded
  Click Button  ${SAVE_BI_CHANGE_BUTTON}
  Wait Until Page Contains  You have changed your basic information

Password change succeeded
  Wait Until Page Contains  You have changed your password

Logout
  Go to setting page
  Click Button  ${LOGOUT_BUTTON}
  Wait Until Page Contains  Log in to your account

Display error
  [Arguments]  ${error}
  Wait Until Page Contains  ${error}