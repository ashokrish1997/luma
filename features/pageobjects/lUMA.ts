import { $} from '@wdio/globals'
import { remote } from 'webdriverio';
import { browser } from '@wdio/globals'
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { expect } from 'chai'
import data from "../testData.json";
class LUMAPage   {

    /**
     * define selectors using getter methods
     */
    public get CreateanAccount () { return $("(//a[text()='Create an Account'])[1]")}
    public get CreateNewCustomerAccountTitle(){return $(`//span[text()='Create New Customer Account']`)}
    public get firstname(){return $(`#firstname`)}
    public get validation_firstnameText(){return $(`//div[@for="firstname"]`)}
    public get lastname(){return $(`#lastname`)}
    public get validation_lastnameText(){return $(`//div[@for="lastname"]`)}
    public get email_address (){return $(`#email_address`)}
    public get cr_wrongMailiderror(){return $(`//div[@for="email_address"]`)}
    public get validation_email_addressText(){return $(`//div[@for="email_address"]`)}
    public get cr_password(){return $(`//input[@id="password"]`)}
    public get validation_cr_passwordText(){return $(`//div[@for="password"]`)}
    public get cr_confirmPassword(){ return $(`//input[@id="password-confirmation"]`)}
    public get validation_cr_cr_confirmPasswordText(){return $(`//div[@for="password-confirmation"]`)}
    public get cr_submitBt(){ return $(`(//button[@type="submit"])[2]`)}
    public get signin () {return $(`(//li[@class="authorization-link"]/a)[1]`)}
    public get mail (){ return $(`#email`)}
    public get password(){return $(`#pass`)}
    public get siginBtn(){return $(`(//button[@type="submit"])[2]`)}
    public get invalidloginText(){return $(`//div[text()='The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.']`)}
    public get successRegisterText(){ return $(`//*[text()='Thank you for registering with Main Website Store.']`)}
    public get profileDropDownarrow(){return $(`//span[@class="customer-name"]`)}
    public get signout(){return $(`(//li[@class="authorization-link"])[1]`)}
    public get logouttext(){return $(`//span[text()='You are signed out']`)}
    public get logo(){return $(`//a[@class="logo"]`)}
    public get accountExisttext(){return $(`//*[contains(text(),'There is already an account with this email address.')]`)}
    public get invalidlogin(){return $(`//*[contains(text(),'The account sign-in')]`)}
    public get signin_mailValidationtext(){return $(`//div[@for="email"]`)}
    public get sigin_passvalidationtext(){return $(`//div[@for="pass"]`)}


    /**
     * define Functional and common methods
     */
    public async setText (locator: any, text: any, message:any, timeout?: any) {
        await (await locator).click() 
        await (await locator).clearValue()
        await (await locator).setValue(text), {timeout}
        await cucumberJson.attach("status.INFO "+ message + " Entered : " + text);
    }

    public async performClick   (locator: any, timeout?: any){ 
        await (await locator).click(), {timeout}
    }

    public async waitUntilExist(locator: any, timeout?: any){
        await browser.waitUntil(
            async ()=>{return (await locator.isDisplayed())== true},
            {timeout:timeout,timeoutMsg:"Still Not Displayed"} 
        )

    }

    public async CreateNewCustomerAccount(firstname:any,lastname:any,email_address:any,password:any){
        await this.setText(this.firstname,firstname,`Create New Customer Account Firstname`)
        await this.setText(this.lastname,lastname,`Create New Customer Account Lastname`)
        await this.setText(this.email_address,email_address,`Create New Customer Account Mail ID`)
        await browser.pause(2000)
        await this.setText(this.cr_password,password,`Create New Customer Account password`)
        await this.setText(this.cr_confirmPassword,password,`Create New Customer Account confirm password`)
        await(this.cr_submitBt).scrollIntoView()
        await this.performClick(this.cr_submitBt)
        await cucumberJson.attach("INFO: Create New Customer Account Button Clicked ");
        await this.waitUntilExist(this.successRegisterText,20000)
        const logintext=await (await this.successRegisterText).getText()
        expect(data.registeringText).to.equal(logintext)
        await cucumberJson.attach(`INFO: ${data.firstname+" "+data.lastname} is landed intot the MyAccount `);
    }

    public async existing_CreateNewCustomerAccount(firstname:any,lastname:any,email_address:any,password:any){
        await this.setText(this.firstname,firstname,`Create New Customer Account Firstname`)
        await this.setText(this.lastname,lastname,`Create New Customer Account Lastname`)
        await this.setText(this.email_address,email_address,`Create New Customer Account Mail ID`)
        await browser.pause(2000)
        await this.setText(this.cr_password,password,`Create New Customer Account password`)
        await this.setText(this.cr_confirmPassword,password,`Create New Customer Account confirm password`)
        await(this.cr_submitBt).scrollIntoView()
        await this.performClick(this.cr_submitBt)
        await cucumberJson.attach("INFO: Create New Customer Account Button Clicked ");
        await this.waitUntilExist(this.accountExisttext,20000)
        const logintext=await (await this.accountExisttext).getText()
        expect(data.accountExistText).to.equal(logintext)
        await cucumberJson.attach(`INFO: ${data.exisit_email_address} is Used so user Not able to use the existing Maild for New Account---->${logintext}`);
    }

    public async loginAsuser(email:any,password:any){
        this.waitUntilExist(await this.signin,10000)
        await this.performClick(this.signin)
        await this.setText(this.mail,email,`Login Mail id`)
        await this.setText(this.password,password,`Login Password`)
        await this.performClick(this.siginBtn)
        await cucumberJson.attach("INFO: Login Signin Button clicked");
        await browser.pause(2000)

    }

    public async logout(){
        await browser.pause(3000)
        await this.performClick(this.profileDropDownarrow)
        await this.performClick(this.signout)
        await this.waitUntilExist(this.logouttext)
        const text=await  (await this.logouttext).getText()
        await expect('You are signed out').to.equal(text)
        await this.cucumberJsonattach('You are signed out is Dispalyed')
    }

    public async cucumberJsonattach(message){
        console.log(message)
        cucumberJson.attach(message, "text/plain")

    }
}
export default new LUMAPage();