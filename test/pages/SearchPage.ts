import type { ChainablePromiseElement } from 'webdriverio';

class SearchPage {
  private get searchContainer(): ChainablePromiseElement {
    return $('android=new UiSelector().resourceId("android:id/content")');
  }

  private get searchEmptyContainer(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Search Wikipedia")');
  }

  private get closePopUp(): ChainablePromiseElement {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/closeButton")');
  }

  private get searchInput(): ChainablePromiseElement {
    return $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
  }

  private searchRow(text: string): ChainablePromiseElement {
    return $(`android=new UiSelector().text("${text}")`);
  }

  async scrollToResultAndClosePopUp(text: string = 'Ancient Anatolian kingdom'): Promise<void> {
    const uiScrollable =
      'new UiScrollable(new UiSelector()' +
      '.resourceId("org.wikipedia.alpha:id/search_results_list")' +
      '.scrollable(true)).scrollIntoView(' +
      `new UiSelector().text("${text}"))`;

    await $(`android=${uiScrollable}`);
    await this.searchRow(text).click();
    await this.closePopUp.click();
  }

  async openSearch() {
    await this.searchContainer.waitForDisplayed({ timeout: 10000 });
    await this.searchContainer.click();
    await this.searchEmptyContainer.waitForDisplayed({ timeout: 10000 });
    await this.searchEmptyContainer.click();
  }

  async search(query: string) {
    await this.searchInput.waitForDisplayed({ timeout: 10000 });
    await this.searchInput.setValue(query);
  }
}

export default new SearchPage();
