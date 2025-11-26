class OnboardingPage {
  private get continueButton(): ChainablePromiseElement {
    return $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_forward_button")',
    );
  }

  private get doneButton(): ChainablePromiseElement {
    return $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_done_button")',
    );
  }

  async waitForLoaded(): Promise<void> {
    await this.continueButton.waitForDisplayed({ timeout: 15000 });
  }

  async swipeThroughCarouselToLastPage(): Promise<void> {
    const MAX_CONTINUE_CLICKS = 5; // 3 expected, 5 as a safety margin

    for (let attempt = 0; attempt < MAX_CONTINUE_CLICKS; attempt++) {
      // If the final "Get started" button is already visible, click it and stop
      const isDoneVisible = await this.doneButton.isDisplayed().catch(() => false);
      if (isDoneVisible) {
        await this.doneButton.click();
        return;
      }

      // Otherwise click on "Continue" if it is present
      await this.continueButton.waitForDisplayed({ timeout: 5000 });
      await this.continueButton.waitForEnabled({ timeout: 5000 });
      await this.continueButton.click();

      // Small pause so the next onboarding page has time to render
      await driver.pause(300);
    }

    // After several attempts, fail explicitly if we still do not see "Get started"
    const isDoneVisibleAtEnd = await this.doneButton.isDisplayed().catch(() => false);
    if (!isDoneVisibleAtEnd) {
      throw new Error(
        'Onboarding did not reach the "Get started" button after pressing Continue multiple times.',
      );
    }
  }
}

export default new OnboardingPage();
