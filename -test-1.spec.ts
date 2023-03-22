import { test, expect } from '@playwright/test';
// не работает, не отмечается второй чекбокс 
test('test', async ({ page }) => {
  // await page.goto('https://nuzhnapomosh.ru/');
  // await page.getByRole('link', { name: 'войти' }).click();
  // await page.getByPlaceholder('Email').fill('aplsd@yandex.ru');
  // await page.getByRole('button', { name: 'Продолжить' }).click();
  // await page.getByPlaceholder('Введите пароль').fill('Alexey09');
  // await page.getByRole('button', { name: 'Войти' }).click();
  // await page.waitForTimeout(10000);
  await page.goto('https://nuzhnapomosh.ru/pay/?npFormPayment=once&npFormSum=50&npFormHelp=0');
  await page.getByLabel('Система быстрых платежей').click();

  await page.locator("text=Соглашаюсь с офертой").click();
  await page.locator("text=Соглашаюсь на обработку персональных данных").click();//не работает
  // await page.locator('//*[@id="np-donate-form-personal-offer-data"]').click();
  // await page.locator('input[id="np-donate-form-personal-offer-data"]').click();
  //*[@id="np-donate-form-personal-offer-data"]
  // await page.locator('span').filter({ hasText: 'Соглашаюсь с офертой' }).first().click(); 
  // await page.locator('span').filter({ hasText: 'Соглашаюсь на обработку персональных данных' }).first().click();
  // label:nth-child(3)
  // label.np-form-checkbox.np-form-checkbox_off-white.np-form-checkbox_margin-top >
  // await page.locator('#np-donate-form-personal-offer').click();
  // await page.locator('#np-donate-form-personal-offer-data').click()
  // await page.locator('label:has-text(" Соглашаюсь с ")').click();
  // await page.locator('label:has-text(" Соглашаюсь на ")').click();
  // await page.getByLabel('Соглашаюсь на обработку персональных данных').click();
  // await page.getByRole('button', { name: 'Оплатить' }).click();
  // await page.goto('https://nuzhnapomosh.ru/sbp-pay/');
  // await page.waitForTimeout(5000);
  // await page.getByRole('button', { name: 'Оплатить' }).click();
  // await page.goto('https://qr.nspk.ru/AD100061H9VVF8NK8AP865AFMPJNICNN?type=02&bank=100000000004&sum=5000&cur=RUB&crc=854C');
  // await page.getByText('Для оплаты', { exact: true });
  // await page.close();
});
