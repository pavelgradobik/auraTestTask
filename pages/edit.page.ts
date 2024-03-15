import { EditSelectors } from '../selectors/edit.selectors';

export class EditPage {
	private editSelectors = new EditSelectors();
	verifySuggestedEditsModuleOpened(isOpened: boolean) {
		if (isOpened) {
			cy.get(this.editSelectors.suggestedEditsModule).should(
				'be.visible'
			);
			cy.get(this.editSelectors.yourImpactModule).should('be.visible');
		} else {
			cy.get(this.editSelectors.suggestedEditsModule).should('not.exist');
			cy.get(this.editSelectors.yourImpactModule).should('not.exist');
		}
	}
}
