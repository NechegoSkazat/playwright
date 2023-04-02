import { test, expect } from '@playwright/test';
//главная - логин в маил - редирект на главную - разлог
// не работает
test('test', async ({ page }) => {
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  await page.getByRole('list').getByRole('button').nth(4).click();
  await page.getByPlaceholder('Account name').fill('htpthajh');
  await page.locator('[data-test-id="next-button"]').click();
  await page.getByPlaceholder('Password').fill('Alexey09');
  await page.locator('[data-test-id="submit-button"]').click();
  //await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'На главную Нужна помощь' });
  await page.getByRole('button', { name: 'Меню пользователя' }).click();
  //await page.waitForTimeout(10000);
  await page.getByRole('link', { name: 'Выйти' }).click();//долго выходит
  //await page.waitForTimeout(10000);
  await page.getByRole('link', { name: 'войти' });//проверка, что произошел разлог
  await page.close();
});
