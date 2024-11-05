import { Given, When, Then } from '@wdio/cucumber-framework';
import {  $ } from '@wdio/globals'
import { browser } from '@wdio/globals'
import luma from "../pageobjects/lUMA.ts"
import data from "../testData.json";
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { expect } from 'chai'

Given(/^I am on the (\w+) page$/, async (page) => {
    browser.url(data.LUMAurl)
    await browser.maximizeWindow();

});
When(/^Go to the Create New Customer Account page$/, async() => {
	await luma.waitUntilExist(luma.CreateanAccount,4000)
    await luma.performClick(luma.CreateanAccount)
});
const text=data.uITexts
Then(/^verify the UI Details$/, async() => {
    
	await luma.waitUntilExist(luma.CreateNewCustomerAccountTitle,4000)
    for(let i=2;i<7;i++){
        const fieldtext=await (await $(`(//label[@class="label"]/span)[${i}]`)).getText()
        await expect(text[i-2]).to.equal(fieldtext);
        await luma.cucumberJsonattach(`INFO: ${fieldtext} Field Name Should Be Displayed`);

    }
    await cucumberJson.attach('INFO: Create New Customer Account page Fields Name Should Be Displayed', 'text/plain');

});

Then(/^the user leaves all fields empty and Then an error message should be displayed for each empty field$/, async() => {

    await luma.performClick(luma.cr_submitBt)
    await luma.cucumberJsonattach(`Create New Customer Account Submit Button Clicked`)
	for(let i=3;i<9;i++){
        var validationtext=await (await $(`(//div[@class="control"]/div)[${i}]`)).getText()
        if(i==7){
            await expect(`Password Strength: No Password`).to.equal(validationtext);
            
        }else{
           await expect(data.validationtext).to.equal(validationtext)
        }
        
    }
    await cucumberJson.attach(`INFO: user leaves all fields empty and Then an error message should be displayed`, 'text/plain');

    await browser.refresh()
    await luma.setText(luma.firstname,data.firstname,`Create New Customer Account Firstname`)
    await luma.setText(luma.lastname,data.lastname,`Create New Customer Account Lastname`)
    await luma.setText(luma.email_address,"4347sfuofh",`Create New Customer Account Mail ID`)
    await luma.setText(luma.cr_password,data.password,`Create New Customer Account password`)
    await luma.setText(luma.cr_confirmPassword,data.password,`Create New Customer Account confirm password`)
    await(luma.cr_submitBt).scrollIntoView()
    await luma.performClick(luma.cr_submitBt)
    await cucumberJson.attach("INFO: Create New Customer Account Button Clicked ");

    const mailValidationerror=await (await luma.cr_wrongMailiderror).getText()
    await expect(data.invalidMailIDerror).to.equal(mailValidationerror)
    await cucumberJson.attach(`INFO: if the User Provide the invalid Mail format system will not accept-->${mailValidationerror}`)


});

Then(/^Create New Customer Account$/,async () => {
	await luma.CreateNewCustomerAccount(data.firstname,data.lastname,data.email_address,data.password)
});

Then(/^logout from the current page$/, async() => {
	await luma.logout()
});

Then(/^login into created Account$/, async() => {
	await luma.loginAsuser(data.email_address,data.password)
    await luma.performClick(luma.logo)
    luma.cucumberJsonattach(`LUMA icon clicked`)
    await browser.pause(2000)
    const url=await browser.getUrl()
    await expect(data.dashboardURL).to.equal(url)
    await luma.cucumberJsonattach(`User landed in to the Shooping Dashboard-->${url}`)
});

Then(/^provide the Existing maild and verify user not able to create the Account$/, async() => {
	await luma.existing_CreateNewCustomerAccount(data.firstname,data.lastname,data.exisit_email_address,data.password)
});

Then(/^Go to the login page$/, async() => {
	await luma.waitUntilExist(await luma.signin,10000)
    await luma.performClick(luma.signin)
        
});

Then(/^login with invalid data and verify user not able to login LUMA$/, async() => {

    await luma.performClick(luma.siginBtn)
    const mailerror=await(await luma.signin_mailValidationtext).getText()
    await expect(data.validationtext).to.equal(mailerror)
    const passworderror=await(await luma.sigin_passvalidationtext).getText()
    await expect(data.validationtext).to.equal(passworderror)
    await luma.cucumberJsonattach(`INFO:User can't login without providing MailID and Password--->${passworderror}`)


	await luma.setText(luma.mail,data.invalidMailId,`Login Mail id`)
    await luma.setText(luma.password,data.invalidPassword,`Login Password`)
    await luma.performClick(luma.siginBtn)
    await cucumberJson.attach("INFO: Login Signin Button clicked");
    await browser.pause(2000)
    await luma.waitUntilExist(luma.invalidlogin,4000)
    const text=await luma.invalidloginText.getText()
    await expect(data.invalidLogintext).to.equal(text)
    await luma.cucumberJsonattach(`INFO:User can't login with Invalid credentials--->${text}`)

    await luma.setText(luma.mail,data.email_address,`Login Mail id`)
    await luma.setText(luma.password,data.invalidPassword,`Login Password`)
    await luma.performClick(luma.siginBtn)
    await cucumberJson.attach("INFO: Login Signin Button clicked");
    await browser.pause(2000)
    await luma.waitUntilExist(luma.invalidlogin,4000)
    const invalidpasstext=await luma.invalidloginText.getText()
    await expect(data.invalidLogintext).to.equal(invalidpasstext)
    await luma.cucumberJsonattach(`INFO:User can't login with valid mail adn Invalid password--->${invalidpasstext}`)


    await luma.setText(luma.mail,data.invalidMailId,`Login Mail id`)
    await luma.setText(luma.password,data.password,`Login Password`)
    await luma.performClick(luma.siginBtn)
    await cucumberJson.attach("INFO: Login Signin Button clicked");
    await browser.pause(2000)
    await luma.waitUntilExist(luma.invalidlogin,4000)
    const invalidmailtext=await luma.invalidloginText.getText()
    await expect(data.invalidLogintext).to.equal(invalidpasstext)
    await luma.cucumberJsonattach(`INFO:User can't login with invalid mail adn valid password--->${invalidmailtext}`)

});
