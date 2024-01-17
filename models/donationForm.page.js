import { test, expect } from '@playwright/test';

exports.DonationPage = class DonationPage {
    constructor(page) {
      this.page = page;
      this.singleDonation = page.getByLabel('Разовое пожертвование');
      this.recurrentPayment = page.getByLabel('Ежемесячное пожертвование');
      this.customSum = page.getByPlaceholder('Другая сумма');
      this.userFirstName = page.getByLabel('Имя');
      this.userLastName = page.getByLabel('Фамилия');
      this.userPhone = page.getByLabel('Телефон', { exact: true });
      this.offerAccept = page.locator('span').filter({ hasText: 'Соглашаюсь с офертой' });
      this.personalDataAgreement = page.locator('span').filter({ hasText: 'Соглашаюсь на обработку персональных данных' });
      this.donateButton = page.getByRole('button', { name: `Оформить пожертвование` });
      this.continuePayment = page.getByRole('button', { name: 'Перейти к оплате' })
      this.funds = page.getByRole('link', { name: 'Фонды', exact: true });
    };
   
    async assertAuthorization(email) {
      await this.accountPageButton.click();
      await this.accountSettings.click();
      await expect(this.userEmail).toHaveValue(email);
    }

    async getRandomFund() {
      // await this.page.goto('https://nuzhnapomosh.ru/');
      await this.funds.click();
      await this.page.waitForTimeout(10000)
      const funds = await this.page.$$eval('.np-card__title', (elements) => elements.map((element) => element.textContent));
      const randomIndex = Math.floor(Math.random() * funds.length);
      const randomFund = funds[randomIndex];
      return randomFund;
    };

    async fillDonationForm(donation, firstName, lastName, phone){
      
      await this.page.waitForTimeout(3000);
      await this.customSum.click();
      await this.customSum.fill(donation);
      await this.page.waitForTimeout(3000);
      await this.continuePayment.click();
      await this.userFirstName.click();
      await this.userFirstName.fill(firstName);
      await this.userLastName.click();
      await this.userLastName.fill(lastName);
      await this.userPhone.click();
      await this.userPhone.fill(phone);
    };

    async checkSingleDonation(fundname, donation, date){
      await this.page.waitForTimeout(60000)
      await this.page.getByRole('menuitem', { name: 'Меню пользователя' }).click();
      await this.page.getByRole('link', { name: 'Пожертвования' }).click();
      await this.page.getByRole('link', { name: 'Разовые пожертвования' }).click();
      
      await expect(this.page.getByRole('cell').first().locator('.donation-item__name.fbook-20.js-fund-name')).toHaveText(`Фонд «${fundname}»`);
      await expect(this.page.getByRole('cell').first().locator('.donation-item__sum.fdemi-20')).toHaveText(`${donation} ₽`);
      await expect(this.page.getByRole('cell').first().locator('.donation-item__date.fbook-17')).toHaveText(date);
    }

    async checkRecurrentDonation(fundname, donation){
      await this.page.waitForTimeout(60000)
      await this.page.getByRole('menuitem', { name: 'Меню пользователя' }).click();
      await this.page.getByRole('link', { name: 'Пожертвования' }).click();
      await expect(this.page).toHaveURL(/^https:\/\/my.nuzhnapomosh\.ru\/payments\/recurrent\?utm_source=np&utm_campaign=header_user&_ga=.*$/)

      await expect(this.page.getByRole('cell').first().locator('.donation-item__name')).toHaveText(fundname);
      await expect(this.page.getByRole('cell').first().locator('.donation-item__sum.fdemi-20')).toHaveText(`${donation} ₽`)
    }
  }