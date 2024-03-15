import { ArticleSelectors } from '../selectors/article.selectors';
import { generalData } from '../cypress/fixtures/generalData';

export class ArticlePage {
	private article = new ArticleSelectors();

	openByURL(url: string) {
		cy.visit(url);
		return this;
	}

	verifyArticleOpened(state: boolean) {
		if (state) {
			cy.contains(
				this.article.articleTitle,
				generalData.selectSearchResult
			).should('be.visible');
			cy.get(this.article.articleContentMenu)
				.should('contain', 'Box office')
				.should('be.visible');
			cy.get(this.article.infobox)
				.find(this.article.infoboxTitle)
				.should('have.text', generalData.searchTopic)
				.should('be.visible');
			cy.get(this.article.infobox)
				.find(this.article.infoboxImage)
				.should(
					'have.attr',
					'href',
					'/wiki/File:Oppenheimer_(film).jpg'
				);
			cy.url().should('include', generalData.searchTopic);
		} else {
			cy.contains(
				this.article.articleTitle,
				generalData.selectSearchResult
			).should('not.exist');
			cy.get(this.article.articleContentMenu)
				.find('Box office')
				.should('not.exist');
		}
		return this;
	}
}
