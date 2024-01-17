import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { AuthorizationPage } from'../models/authorization.page';
import { DonationPage } from'../models/donationForm.page';
import { Utils } from'../models/utils';

const FIRST_NAME = 'Дмитрий'
const LAST_NAME = 'Подвербный'
const EMAIL = 'permanent@nechegoskazat.ru'
const PASSWORD = 'tuIw1I0}T7PJQY1S9mO]'
const PHONE = '+381629267175'
const DONATION = '50'


test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test.beforeEach(async ({ page }) => {
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  const authorizationPage = new AuthorizationPage(page);
  await authorizationPage.authorizationByEmail(EMAIL, PASSWORD);
  await page.getByRole('menuitem', { name: 'Меню пользователя' });
});

test('Разовое пожертвование', async ({ page }) => {
  test.setTimeout(120000);
  
  const donationPage = new DonationPage(page)
  const randomFund = await donationPage.getRandomFund()
  console.log(`Разовое пожертвование в ${randomFund}`)
  await page.getByRole('link', { name: `Помочь ${randomFund}`, exact: true }).click();
  await donationPage.singleDonation.check();
  await donationPage.fillDonationForm(DONATION, FIRST_NAME, LAST_NAME, PHONE)
  await donationPage.offerAccept.first().click();
  await donationPage.personalDataAgreement.first().dispatchEvent('click');
  await page.getByRole('button', { name: `Оформить пожертвование на ${DONATION} ₽` }).click();

  const utils = new Utils();
  const formattedDate = await utils.currentDate();
  //Проверка отображения пожертвования в ЛК
  await donationPage.checkSingleDonation(randomFund, DONATION, formattedDate);
});

test('Оформление подписки', async ({ page }) => {
  test.setTimeout(120000);

  const donationPage = new DonationPage(page);
  const randomFund = await donationPage.getRandomFund();
  console.log(`Создаём подписку на ${randomFund}`);
  await page.getByRole('link', { name: `Помочь ${randomFund}`, exact: true }).click();
  await donationPage.recurrentPayment.check();
  await donationPage.fillDonationForm(DONATION, FIRST_NAME, LAST_NAME, PHONE);
  await donationPage.offerAccept.first().click();
  await donationPage.personalDataAgreement.first().dispatchEvent('click');
  await page.getByRole('button', { name: `Оформить пожертвование на ${DONATION} ₽` }).click();

  await donationPage.checkRecurrentDonation(randomFund, DONATION);
});
