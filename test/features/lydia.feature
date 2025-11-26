@mobile
@ui
@smoke
Feature: Navigate from searching "Lydia" to the "Crésus" page
  As a mobile user
  I want to search for the city "Lydia" and change the website language
  So that I can access the "Crésus" page in French

  Background:
    Given the Wikipedia app is installed
    And the app is launched

  Scenario: Search for "Lydia" and open the "Crésus" page in French
    When I swipe through the onboarding carousel until the last page
    And I search for "Lydia"
    And I scroll the search results until I see the city and dismiss the pop-up
    And I change the website language to French
    And I scroll to the bottom of the page
    And I tap on Crésus
    Then I should be navigated to the Crésus page
