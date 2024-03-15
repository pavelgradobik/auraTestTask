import { WikiversitySelectors } from '../selectors/wikiversity.selectors';

export class Wikiversity {
	private wikiversity = new WikiversitySelectors();

	verifyOpened(isOpened: boolean) {
		if (isOpened) {
			cy.get(this.wikiversity.wikiVersityWellcomeMessage)
				.should('be.visible')
				.should('have.text', 'Welcome');
			cy.get(this.wikiversity.wikiVersityContentHeader).should(
				'be.visible'
			);
			cy.get(this.wikiversity.wikiversityLogo).should('be.visible');
		} else {
			cy.get(this.wikiversity.wikiVersityWellcomeMessage).should(
				'not.exist'
			);
			cy.get(this.wikiversity.wikiVersityContentHeader).should(
				'not.exist'
			);
			cy.get(this.wikiversity.wikiversityLogo).should('not.exist');
		}
	}
}
