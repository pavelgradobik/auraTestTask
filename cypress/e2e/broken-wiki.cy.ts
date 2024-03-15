import { ArticlePage } from '../../pages/article.page';
import { EditPage } from '../../pages/edit.page';
import { MainPage } from '../../pages/main.page';
import { generalData } from '../fixtures/generalData';
import { loginAs } from '../utils/loginAs';
import { User } from '../utils/user';

describe('As a User', () => {
	beforeEach(() => {
		const mainPage = new MainPage();
		mainPage.open().verifyOpened(false);
	});
	it('I could open Main Wiki Page and search for interested topic', () => {
		const mainPage = new MainPage();
		const articlePage = new ArticlePage();

		mainPage
			.searchFor(generalData.searchTopic)
			.selectSearchResult(generalData.selectSearchResult);

		articlePage.verifyArticleOpened(true);
	});

	it('I could i could change the Wiki language', () => {
		const mainPage = new MainPage();

		mainPage
			.selectWikiLanguage(generalData.urkWikiTitle)
			.verifyWikiNewLanguageOpened(generalData.urkWikiTitle);
	});

	it('I could open another wiki project Wikiversity', () => {
		const wikiversityUrl = 'https://en.wikiversity.org';
		const mainPage = new MainPage();

		mainPage.selectWikiProject('Wikiversity');

		cy.origin(wikiversityUrl, () => {
			const wikiversityDependencies = Cypress.require(
				'../../pages/wikiversity.page'
			);
			const wikiversityPage = new wikiversityDependencies.Wikiversity();

			wikiversityPage.verifyOpened(true);
		});
	});
});

describe('As A user I could open the', () => {
	it('article by using a direct link', () => {
		const articlePage = new ArticlePage();
		articlePage.openByURL('Oppenheimer').verifyArticleOpened(true);
	});

	it('main page and Login to Edit selected article', () => {
		const mainPage = new MainPage();
		const editPage = new EditPage();
		const userName = Cypress.env('userName');
		const userPassword = Cypress.env('userPassword');

		loginAs(userName, userPassword);

		mainPage.verifyOpened(true).selectContributionOption();

		editPage.verifySuggestedEditsModuleOpened(false);
	});
});
