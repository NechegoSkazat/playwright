import { test, expect, request } from '@playwright/test';
const RU_EMAIL = 'rumail@nechegoskazat.ru';
const GEN_PASSWORD = 'P@$$W0RD';
let EMAIL

//Генерируем e-mail на 1secmail.com
async function fetchAndSaveEmail() {
  try {
    const response = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json(); // преобразование ответа в формат JSON
    return jsonData[0]; // возврат email из JSON
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    // если нужно обработать ошибку или вернуть какое-то значение по умолчанию в случае ошибки
    return null;
  }
};

//Получаем список писем в виде JSON
async function fetchAndSaveMails(username, domain) {
  try {
    const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonData = await response.json(); // преобразование ответа в формат JSON
    return jsonData; // возврат JSON
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    // если нужно обработать ошибку или вернуть какое-то значение по умолчанию в случае ошибки
    return null;
  }
};

test.beforeAll(async () => {
  EMAIL = await fetchAndSaveEmail();
  console.log(EMAIL);
});



test('Registration foreign email', async ({ page }) => {
  EMAIL = await fetchAndSaveEmail();
  await console.log(EMAIL)
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL);
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').click();
  await page.getByPlaceholder('Введите пароль').fill(GEN_PASSWORD);
  await page.locator('.b-checkbox__decor').click();
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByRole('menuitem', { name: 'Меню пользователя' }).click();
  await page.getByRole('link', { name: 'Личный кабинет' }).click();
  await expect(page.locator('.notify__text')).toContainText(
    ['Подтвердите ваш email – нажмите на ссылку в письме, которое мы отправили вам на ' + 
    EMAIL + '. ' +
    'После этого вы получите доступ ко всему личному кабинету. '+ 
    'Отправить письмо еще раз. '+'Если возникли сложности, напишите нам на '+ 
    'mne@nuzhnapomosh.ru']);
  await page.locator('[id="np-header-button-user"]').click();
  await page.getByLabel('Меню пользователя').getByRole('link', { name: 'Настройки аккаунта' }).click();
  await expect(page.getByPlaceholder('Введите email')).toHaveValue(EMAIL);
});


test('Check registration mails', async ({ page }) => {
  await console.log(EMAIL)
  await page.goto('https://nuzhnapomosh.ru/');
  await page.getByRole('link', { name: 'войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(EMAIL);
  await page.getByRole('button', { name: 'Продолжить' }).click();
  await page.getByPlaceholder('Введите пароль').click();
  await page.getByPlaceholder('Введите пароль').fill(GEN_PASSWORD);
  await page.locator('.b-checkbox__decor').click();
  await page.getByRole('button', { name: 'Продолжить' }).click();
  let username = EMAIL.substring(0, EMAIL.indexOf('@'));
  let domain = EMAIL.substring(EMAIL.indexOf('@') + 1);
  await console.log(username, domain);
  let Data = await fetchAndSaveMails(username, domain);
  await console.log(Data)
});
