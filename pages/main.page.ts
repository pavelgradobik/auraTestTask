import { FooterSelectors } from '../selectors/footer.selectors';
import { HeaderSelectors } from '../selectors/header.selectors';
import { SearchSelectors } from '../selectors/search.selectors';
import { ArticleSelectors } from '../selectors/article.selectors';

export class MainPage {
	private header = new HeaderSelectors();
	private search = new SearchSelectors();
	private footer = new FooterSelectors();
	private article = new ArticleSelectors();

	readonly wellcomeMessage = '#Welcome_to_Wikipedia';

	open() {
		cy.visit('/');
		return this;
	}

	//#region Actions
	selectWikiLanguage(language: string) {
		switch (language) {
			case 'Українська':
				cy.intercept('GET', 'https://uk.wikipedia.org/w/api.php?**').as(
					'languageRequest'
				); // could be moved outside the case statement to cave more versatile solution
				cy.get(`${this.footer.languageSelector} [lang="uk"]`)
					.scrollIntoView()
					.click();
				cy.wait('@languageRequest');
		}
		return this;
		// if needed  other case statements could be easily added
	}

	searchFor(topic: string) {
		cy.intercept('GET', `**/search/title?q=${topic}&limit=10`).as(
			'searchRequest'
		);
		cy.get(this.search.searchField).type(topic);
		cy.wait('@searchRequest');
		return this;
	}

	selectSearchResult(topic: string) {
		cy.contains(this.search.listItem, topic).click();
		return this;
	}

	selectWikiProject(projectName: string) {
		cy.get(this.footer.wikiSisterProject(projectName)).click();
		return this;
	}

	selectLogin(){
		cy.get(this.header.loginMenuButton).click();
		return this;
	}

	selectContributionOption(){
		cy.get(this.header.userMenuButton).click();
		cy.get(this.header.userMenuOptionContributionButton).click();
		cy.get(this.article.goHomePageButton).click();
		return this;
	}
	//#endregion

	//#region Verification methods
	verifyOpened(state: boolean) {
		const urlTail = '/wiki/Main_Page';
		if (state) {
			cy.get(this.header.wikiTitle).should('be.visible');
			cy.get(this.header.wikiTitleAltMessage).should('be.visible');
			cy.url().should('include', urlTail);
			cy.contains(this.wellcomeMessage, 'Welcome to Wikipedia').should(
				'be.visible'
			);
		} else {
			cy.url().should('not.contain', urlTail);
			cy.get(this.header.wikiTitle).should('not.exist');
			cy.get(this.header.wikiTitleAltMessage).should('not.exist');
		}
		return this;
	}

	verifyWikiNewLanguageOpened(language: string) {
		const urkWelcomeMessage = 'Ласкаво просимо до Вікіпедії,';
		cy.get(this.header.ukrainianLanguageLink(language)).should(
			'be.visible'
		);
		cy.get(this.header.ukrainianLanguageTitle)
			.should('have.text', urkWelcomeMessage)
			.should('be.visible');
		return this;
	}
	//#endregion
}
