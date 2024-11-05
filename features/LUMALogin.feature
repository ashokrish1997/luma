Feature: Create the LUMA Account and Loginto the Account

  Scenario: Go to the Create New Customer Account page and create the LUMA Account
    Given I am on the login page
    When Go to the Create New Customer Account page
    Then verify the UI Details
    Then the user leaves all fields empty and Then an error message should be displayed for each empty field
    Then Create New Customer Account
    Then logout from the current page
    Then login into created Account
    Then logout from the current page

  Scenario: Verify user Not able to create the Accountwith existing mail id and Not able to login with Invalid credentials
    Given I am on the login page
    When Go to the Create New Customer Account page
    Then provide the Existing maild and verify user not able to create the Account
    Then Go to the login page
    Then login with invalid data and verify user not able to login LUMA





