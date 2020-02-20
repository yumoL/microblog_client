***Settings***
Library  SeleniumLibrary
Resource  ./LandingPage.robot

***Variables***
${SIGN_UP_HEADING} =    id=signUp
${REGISTER_MENU}=   id=registerMenu
${REGISTER_USERNAME_FIELD}=    id=userName
${REGISTER_PWD_FIELD}=    id=pwd
${PWD_CONFIRM_FIELD}=   id=pwdConfirm
${SIGN_UP_BUTTON}=    id=register


***Keywords***
Go to register page
  LandingPage.Load
  LandingPage.Verify Page Loaded
  Click Element  ${REGISTER_MENU}
  Wait Until Page Contains Element  ${SIGN_UP_HEADING}

Start register
  [Arguments]  ${USERNAME}  ${PWD}  ${PWD_CONFIRM}
  Input Text  ${REGISTER_USERNAME_FIELD}  ${USERNAME}
  Input Text  ${REGISTER_PWD_FIELD}  ${PWD}
  Input Text  ${PWD_CONFIRM_FIELD}  ${PWD_CONFIRM}
  
Register succeeded
  Click Button  ${SIGN_UP_BUTTON}
  Wait Until Page Contains  Register succeeded
  Page Should Contain  Log in to your account

Display errors
  [Arguments]  ${ERROR}
  Wait Until Page Contains  ${ERROR}

Register new user successfully
  [Arguments]  ${USERNAME}  ${PWD}
  Go to register page
  Start register  ${USERNAME}  ${PWD}  ${PWD}
  Register succeeded