import { test, expect } from '@playwright/test';
import { AuthorizationPage } from'../models/authorization.page';
const USER_DATA = require('../fixtures/customer_data.json');

const EMAIL=USER_DATA.autotest_user.email
const PASSWORD=USER_DATA.autotest_user.PASSWORD

test.beforeEach(async ({ page }) => {
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
});

test('Email+password', async ({ page }) => {
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.authorizationByEmail(EMAIL, PASSWORD);
    console.log('Перенаправление на np');
    await authorizationPage.assertAuthorization(EMAIL);
});

test('VK', async ({ page }) => {
    await page.getByRole('list').getByRole('button').first().click();
    await page.waitForURL("https://id.vk.com/**");
    await page.locator('.vkuiInput__el').click();
    await page.locator('.vkuiInput__el').fill(USER_DATA.vk_user.email);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL("https://id.vk.com/**");
    await page.locator('[name="password"]').click();
    await page.locator('[name="password"]').fill(USER_DATA.vk_user.service_password);
    await page.locator('.vkuiButton__in').first().click();
    await page.locator('[data-test-id="continue-as-button"]').click();
    // await page.waitForURL("https://nuzhnapomosh.ru/**");
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization(USER_DATA.vk_user.email);
});


test('Odnoklassniki', async ({ page }) => {
    await page.getByRole('list').getByRole('button').nth(1).click();
    await page.locator('[id="field_email"]').click();
    await page.locator('[id="field_email"]').fill(USER_DATA.ok_user.phone);
    await page.locator('[id="field_password"]').click();
    await page.locator('[id="field_password"]').fill(USER_DATA.ok_user.service_password);
    await page.locator('#widget-el > div.ext-widget_cnt-w.__center > div > div > div.form-actions > input').click();
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization(USER_DATA.ok_user.email);
  });

  test('Yandex', async ({ page }) => {
    await page.getByRole('list').getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Другие способы входа' }).click();
    await page.getByPlaceholder('Логин или email').click();
    await page.getByPlaceholder('Логин или email').fill(USER_DATA.yandex_user.email);
    await page.getByRole('button', { name: 'Войти' }).click();
    await page.getByPlaceholder('Введите пароль').click();
    await page.getByPlaceholder('Введите пароль').fill(USER_DATA.yandex_user.service_password);
    await page.getByRole('button', { name: 'Продолжить', exact: true }).click();
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization(USER_DATA.yandex_user.email);
  });

test('Mail.ru', async ({ page }) => {
  await page.getByRole('list').getByRole('button').nth(4).click();
  await page.getByPlaceholder('Account name').click();
  await page.getByPlaceholder('Account name').fill(USER_DATA.mailru_user.email);
  await page.locator('[data-test-id="next-button"]').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(USER_DATA.mailru_user.service_password);
  await page.locator('[data-test-id="submit-button"]').click();
  const authorizationPage = new AuthorizationPage(page);
  await authorizationPage.assertAuthorization(USER_DATA.mailru_user.email);
});