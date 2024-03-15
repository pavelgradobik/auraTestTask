import { User } from './user';
import { LoginPage } from '../../pages/login.page';
import { MainPage } from '../../pages/main.page';

export const loginAs = (userName: string, userPassword: string) => {
	const loginPage = new LoginPage();
	const mainPage = new MainPage();
	mainPage.open().verifyOpened(true).selectLogin();
	loginPage.filllLoginFormAndSubmit(userName, userPassword);
};
