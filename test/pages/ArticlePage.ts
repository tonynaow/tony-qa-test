import type { ChainablePromiseElement } from 'webdriverio';

class ArticlePage {
  private get buttonPageLanguage(): ChainablePromiseElement {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/page_language")');
  }

  private get cresusLink(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Crésus")');
  }

  private get buttonNewPage(): ChainablePromiseElement {
    return $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/link_preview_primary_button")',
    );
  }

  private get footerPage(): ChainablePromiseElement {
    return $('android=new UiSelector().resourceId("pcs-footer-container-legal")');
  }

  private get cresusPage(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Crésus")');
  }

  async clickOnPageLanguage() {
    await this.buttonPageLanguage.waitForDisplayed({ timeout: 10000 });
    await this.buttonPageLanguage.click();
  }

  async scrollToBottom(): Promise<void> {
    const scrollableSelector =
      'new UiScrollable(new UiSelector()' +
      '.className("android.webkit.WebView")' +
      '.scrollable(true))';

    await browser.waitUntil(
      async () => {
        if (await this.footerPage.isDisplayed()) {
          return true;
        }

        const uiScrollable = `${scrollableSelector}.scrollForward()`;
        await $(`android=${uiScrollable}`);
        return false;
      },
      {
        timeout: 400000,
        interval: 1,
        timeoutMsg: 'Error time out scroll to bottom page',
      },
    );
  }

  async clickOnCresusLink(): Promise<void> {
    await this.cresusLink.waitForDisplayed({ timeout: 10000 });
    await this.cresusLink.click();
  }

  async clickOnNewPage(): Promise<void> {
    await this.buttonNewPage.waitForDisplayed({ timeout: 10000 });
    await this.buttonNewPage.click();
    await this.cresusPage.waitForDisplayed({ timeout: 10000 });
  }
}

export default new ArticlePage();
