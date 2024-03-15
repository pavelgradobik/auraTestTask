import { ArticleSelectors } from '../selectors/article.selectors';
import { generalData } from '../cypress/fixtures/generalData';
import { Links } from '../cypress/utils/links';

export class ArticlePage {
	private article = new ArticleSelectors();

	openByURL(url: string) {
		cy.visit(`${Links.article}${url}`);
		return this;
	}

	verifyArticleOpened(
		state: boolean,
		articleTitle = generalData.selectSearchResult,
		topicTitle = generalData.searchTopic
	) {
		if (state) {
			cy.contains(this.article.articleTitle, articleTitle).should(
				'be.visible'
			);
			cy.get(this.article.articleContentMenu)
				.should('contain', 'Box office')
				.should('be.visible');
			cy.get(this.article.infobox)
				.find(this.article.infoboxTitle)
				.should('have.text', topicTitle)
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
			cy.contains(this.article.articleTitle, articleTitle).should(
				'not.exist'
			);
			cy.get(this.article.articleContentMenu)
				.find('Box office')
				.should('not.exist');
		}
		return this;
	}
}
