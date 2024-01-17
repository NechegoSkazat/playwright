import { test, expect } from '@playwright/test';
import { AuthorizationPage } from'../models/authorization.page';

const EMAIL='kotleta88@gmail.com'
const PASSWORD='RXuiuFDHLUU3unf'

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
    await page.locator('.vkuiInput__el').fill('kotleta88@gmail.com');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL("https://id.vk.com/**");
    await page.locator('[name="password"]').click();
    await page.locator('[name="password"]').fill('PYGu0Yil4OFxRHKVR');
    await page.locator('.vkuiButton__in').first().click();
    await page.locator('[data-test-id="continue-as-button"]').click();
    await page.waitForURL("https://nuzhnapomosh.ru/**");
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization(EMAIL);
});


test('Odnoklassniki', async ({ page }) => {
    await page.getByRole('list').getByRole('button').nth(1).click();
    await page.locator('[id="field_email"]').click();
    await page.locator('[id="field_email"]').fill('+381629267175');
    await page.locator('[id="field_password"]').click();
    await page.locator('[id="field_password"]').fill('?#;!=0FZW;3mAn#x<rBW');
    await page.locator('#widget-el > div.ext-widget_cnt-w.__center > div > div > div.form-actions > input').click();
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization('d.podverbnyi@gmail.com');
  });

  test('Yandex', async ({ page }) => {
    const yandex_email = 'nuzhnapomosh-test@yandex.ru'
    await page.getByRole('list').getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Другие способы входа' }).click();
    await page.getByPlaceholder('Логин или email').click();
    await page.getByPlaceholder('Логин или email').fill(yandex_email);
    await page.getByRole('button', { name: 'Войти' }).click();
    await page.getByPlaceholder('Введите пароль').click();
    await page.getByPlaceholder('Введите пароль').fill('Z{];nnK]UjT}uhHAB?1s');
    await page.getByRole('button', { name: 'Продолжить', exact: true }).click();
    const authorizationPage = new AuthorizationPage(page);
    await authorizationPage.assertAuthorization(yandex_email);
  });

test('Mail.ru', async ({ page }) => {
  const mailru_email = 'd.podverbny@mail.ru'
  await page.getByRole('list').getByRole('button').nth(4).click();
  await page.getByPlaceholder('Account name').click();
  await page.getByPlaceholder('Account name').fill(mailru_email);
  await page.locator('[data-test-id="next-button"]').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('M;(69Ap[3A)yHM2<#Nv1');
  await page.locator('[data-test-id="submit-button"]').click();
  const authorizationPage = new AuthorizationPage(page);
  await authorizationPage.assertAuthorization(mailru_email);
});