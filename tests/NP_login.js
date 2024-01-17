const FIRST_NAME = 'Дмитрий'
const LAST_NAME = 'Подвербный'
const EMAIL = 'permanent@nechegoskazat.ru'
const PASSWORD = 'tuIw1I0}T7PJQY1S9mO]'
const PHONE = '+381629267175'
const DEFAULT_FUND_NAME = '«Созидание», г. Вологда'
const DONATION = '50'

export class NPLogin {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async login() {
    await page.goto('https://nuzhnapomosh.ru/');
    await page.getByRole('link', { name: 'войти' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(EMAIL);
    await page.getByRole('button', { name: 'Продолжить' }).click();
    await page.getByPlaceholder('Введите пароль').click();
    await page.getByPlaceholder('Введите пароль').fill(PASSWORD);
    await page.getByRole('button', { name: 'Войти' }).click();
  }
}