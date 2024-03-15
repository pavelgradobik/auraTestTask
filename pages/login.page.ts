export class LoginPage {

    filllLoginFormAndSubmit(username: string, password: string) {
        cy.get('#wpName1').type(username)
        cy.get('#wpPassword1').type(password)
        cy.get('#wpLoginAttempt').click()
    }
}