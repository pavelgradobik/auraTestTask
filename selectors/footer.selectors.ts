export class FooterSelectors {
	readonly languageSelector = '.wikipedia-languages-langs';
	readonly wikiSisterProject = (wikiProjName: string) =>
		`#sister-projects-list li [title="${wikiProjName}"]`;
}
