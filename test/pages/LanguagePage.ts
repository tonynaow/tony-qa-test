import type { ChainablePromiseElement } from 'webdriverio';

class LanguagePage {
  private get searchLanguage(): ChainablePromiseElement {
    return $('android= new UiSelector().className("android.widget.Button").instance(1)');
  }

  private get searchLanguageInput(): ChainablePromiseElement {
    return $('//android.widget.TextView[@text="Search"]/ancestor::android.widget.EditText');
  }

  private get searchLanguageFrench(): ChainablePromiseElement {
    return $('android= new UiSelector().text("French")');
  }

  async openSearchLanguage() {
    await this.searchLanguage.waitForDisplayed({ timeout: 10000 });
    await this.searchLanguage.click();
    await this.searchLanguageInput.waitForDisplayed({ timeout: 10000 });
    await this.searchLanguageInput.setValue('French');
    await this.searchLanguageFrench.waitForDisplayed({ timeout: 10000 });
    await this.searchLanguageFrench.click();
  }
}

export default new LanguagePage();
