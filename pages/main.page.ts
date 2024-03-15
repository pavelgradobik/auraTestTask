import { HeaderSelectors } from '../selectors/header.selectors';
import { SearchSelectors } from '../selectors/search.selectors';

export class MainPage {
	private header = new HeaderSelectors();
	private search = new SearchSelectors();

	readonly wellcomeMessage = '#Welcome_to_Wikipedia';

	open() {
		cy.visit('/');
		return this;
	}

	//#region Actions
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
	//#endregion
}
