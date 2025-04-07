import BasePage from '../pageobjects/base.page';

describe('Example Test Suite', () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    });

    it('should launch the app successfully', async () => {
        await $("~login_usernameField").click();
        await $("~login_usernameField").setValue("test@test.com");
        await $("~login_passwordField").click();
        await $("~login_passwordField").setValue("test");
        await $("~login_loginButton").click();
        
    });

}); 