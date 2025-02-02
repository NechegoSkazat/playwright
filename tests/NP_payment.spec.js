import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { AuthorizationPage } from'../models/authorization.page';
import { DonationPage } from'../models/donationForm.page';
import { Utils } from'../models/utils';
const USER_DATA = require('../fixtures/customer_data.json');

const CURRENT_USER = USER_DATA.autotest_user

const FIRST_NAME = CURRENT_USER.first_name
const LAST_NAME = CURRENT_USER.last_name
const EMAIL = CURRENT_USER.email
const PASSWORD = CURRENT_USER.NP_password
const PHONE = CURRENT_USER.phone
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

test('Разовое пожертвование в случайный фонд', async ({ page }) => {
  test.setTimeout(120000);
  
  const donationPage = new DonationPage(page);
  const randomFund = await donationPage.getRandomFund();
  console.log(`Разовое пожертвование в ${randomFund}`);
  await page.getByRole('link', { name: `Помочь ${randomFund}`, exact: true }).click();
  await donationPage.singleDonation.check();
  await page.waitForTimeout(2000)
  await page.getByPlaceholder('Другая сумма').fill(DONATION);
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: `Перейти к оплате` }).click();
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: `Оформить пожертвование на ${DONATION} ₽` }).click();

  const utils = new Utils();
  const formattedDate = await utils.currentDate();
  //Проверка отображения пожертвования в ЛК
  await donationPage.checkSingleDonation(randomFund, DONATION, formattedDate);
});

test('Оформление подписки на случайный фонд', async ({ page }) => {
  test.setTimeout(120000);

  const donationPage = new DonationPage(page);
  const randomFund = await donationPage.getRandomFund();
  console.log(`Создаём подписку на ${randomFund}`);
  await page.getByRole('link', { name: `Помочь ${randomFund}`, exact: true }).click();
  await donationPage.recurrentPayment.check();
  await page.waitForTimeout(2000)
  await page.getByPlaceholder('Другая сумма').fill(DONATION);
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: `Перейти к оплате` }).click();
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: `Оформить пожертвование на ${DONATION} ₽` }).click();

  await donationPage.checkRecurrentDonation(randomFund, DONATION);
});
