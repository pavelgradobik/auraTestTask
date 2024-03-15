export class HeaderSelectors {
	readonly wikiTitle = '[alt="Wikipedia"]'; // locale dependant stuff, truth for en wiki
	readonly wikiTitleAltMessage = '[alt="The Free Encyclopedia"]'; // locale dependant stuff, truth for en wiki
	readonly ukrainianLanguageTitle = '#main-head-left h1';
	readonly ukrainianLanguageLink = (language: string) => `p a[title="${language} Вікіпедія"]`
	readonly loginMenuButton = '#pt-login-2'
	readonly userMenuButton = '[data-event-name="ui.dropdown-vector-user-links-dropdown"]'
	readonly userMenuOptionContributionButton = '#pt-mycontris'
}
