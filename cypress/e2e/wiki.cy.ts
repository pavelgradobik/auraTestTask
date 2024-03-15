import { ArticlePage } from '../../pages/article.page';
import { MainPage } from '../../pages/main.page';
import { generalData } from '../fixtures/generalData';

describe('As a User', () => {
	it('I could open Main Wiki Page and search for interested topic', () => {
		const mainPage = new MainPage();
        const articlePage = new ArticlePage();
		
        mainPage
            .open()
            .verifyOpened(true)
            .searchFor(generalData.searchTopic)
            .selectSearchResult(generalData.selectSearchResult);
        
        articlePage.verifyArticleOpened(true);
	});
});
