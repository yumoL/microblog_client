***Settings***
Library  SeleniumLibrary
Resource  ./LandingPage.robot

***Variables***
${LOGIN_HEADING} =    id=loginHeader
${LOGIN_MENU}=   id=loginMenu
${LOGIN_USERNAME_FIELD}=    id=userName
${LOGIN_PWD_FIELD}=    id=pwd
${LOGIN_BUTTON}=    id=loginButton

***Keywords***
Go to login page
  LandingPage.Load
  LandingPage.Verify Page Loaded
  Click Element  ${LOGINMENU}
  Wait Until Page Contains Element  ${LOGIN_HEADING}

Start login
  [Arguments]  ${USERNAME}  ${PWD} 
  Input Text  ${LOGIN_USERNAME_FIELD}  ${USERNAME}
  Input Text  ${LOGIN_PWD_FIELD}  ${PWD}
  Click Button  ${LOGIN_BUTTON}
  
Login succeeded
  Wait Until Page Contains  You have logged in
  Page Should Contain   Home

Display errors
  Wait Until Page Contains  Login failed, wrong username or password

Login for other operations
  [Arguments]  ${USERNAME}  ${PWD}
  Go to login page
  Start login  ${USERNAME}  ${PWD}
  Login succeeded