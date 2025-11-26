import { Given, When, Then } from '@wdio/cucumber-framework';
import OnboardingPage from '../pages/OnboardingPage';
import SearchPage from '../pages/SearchPage';
import ArticlePage from '../pages/ArticlePage';
import LanguagePage from '../pages/LanguagePage';

Given('the Wikipedia app is installed', async () => {
  // No-op: we assume the app is already installed via Appium capabilities
});

Given('the app is launched', async () => {
  await OnboardingPage.waitForLoaded();
});

When('I swipe through the onboarding carousel until the last page', async () => {
  await OnboardingPage.swipeThroughCarouselToLastPage();
});

When('I search for {string}', async (query: string) => {
  await SearchPage.openSearch();
  await SearchPage.search(query);
});

When('I scroll the search results until I see the city and dismiss the pop-up', async () => {
  await SearchPage.scrollToResultAndClosePopUp();
});

When('I change the website language to French', async () => {
  await ArticlePage.clickOnPageLanguage();
  await LanguagePage.openSearchLanguage();
});

When('I scroll to the bottom of the page', async () => {
  await ArticlePage.scrollToBottom();
});

When('I tap on Crésus', async () => {
  await ArticlePage.clickOnCresusLink();
});

Then('I should be navigated to the Crésus page', async () => {
  await ArticlePage.clickOnNewPage();
});
