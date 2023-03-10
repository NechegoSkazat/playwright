import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  await page.getByPlaceholder('Email').fill('dismitry@yandex.ru');
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').fill('Alexey09');
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.waitForTimeout(10000);
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('button', { name: 'Меню пользователя' }).click();
  await page.close();
});
