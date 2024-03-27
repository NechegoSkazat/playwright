import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.use({
  viewport: {
    height: 1080,
    width: 1920
  }
});

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Running ${testInfo.title}`);
  await page.goto('https://nuzhnapomosh.ru/');
  await page.waitForTimeout(2000);
});  


test.describe('Навигация в шапке', () => {

  test('Вкладка "О нас"', async ({ page }) => {
    await page.getByRole('link', { name: 'О нас', exact: true }).click(); 
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/about/");
  });

  test('Вкладка "Фонды"', async ({ page }) => {
    await page.getByRole('link', { name: 'Фонды', exact: true }).click();   
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/funds/");
  });

  test('Вкладка "Отчёты"', async ({ page }) => {
    await page.getByLabel('Основная навигация').getByRole('link', { name: 'Отчёты' }).click();
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/reports/");
  });

  test('Вкладка "Для НКО"', async ({ page }) => {
    await page.getByLabel('Основная навигация').getByRole('link', { name: 'Для НКО' }).click();
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/nko/");
  });

  test('Вкладка "Партнёрам"', async ({ page }) => {
    await page.getByRole('link', { name: 'Партнёрам' }).click();
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/partners/");
  });

  test('Вкладка "Помогаем"', async ({ page }) => {
    await page.getByRole('link', { name: 'Помогаем', exact: true }).click();
    await expect(page).toHaveURL(/^https:\/\/takiedela\.ru\/topics\/.*$/);
  });

  test('Вкладка "Материалы"', async ({ page }) => {
    await page.getByLabel('Основная навигация').getByRole('button', { name: 'Исследования' }).click();
    await page.getByRole('link', { name: 'Материалы' }).click();
    await page.waitForURL("https://nuzhnapomosh.ru/materials/");
  });
    
  test('Вкладка "Бенчмаркинг"', async ({ page }) => {
    await page.getByLabel('Основная навигация').getByRole('button', { name: 'Исследования' }).click();
    await page.getByRole('link', { name: 'Бенчмаркинг' }).click();
    await page.waitForURL("https://nuzhnapomosh.ru/benchmark/");
  });

  test('Вкладка "Контакты"', async ({ page }) => {
    await page.getByLabel('Основная навигация').getByRole('link', { name: 'Контакты' }).click();
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/contacts/");
  });

  test('Проверка кнопки поиска', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Поиск' }).click();
    await expect(page.getByRole('searchbox', { name: 'Искать' })).toBeVisible();
  });
});

test.describe('Навигация в бургере', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.getByRole('menuitem', { name: 'Меню' }).click();
  });  

  test('Бургер: НП', async ({ page }) => {
    await page.getByRole('link', { name: 'Нужна помощь', exact: true }).click();
    await expect(page).toHaveURL("https://nuzhnapomosh.ru/");
  });

  // test('Бургер: ТД', async ({ page }) => {
  //   await page.getByRole('link', { name: 'Такие дела' }).click();
  //   await expect(page).toHaveURL(/^https:\/\/takiedela\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  // });

  // test('Бургер: ЕБТ', async ({ page }) => {
  //   await page.getByRole('link', { name: 'Если быть точным', exact: true }).click();
  //   await expect(page).toHaveURL("https://tochno.st/?utm_source=np&utm_campaign=header_aside");
  // });

  // test('Бургер: Есть смысл', async ({ page }) => {
  //   await page.getByRole('link', { name: 'Есть смысл' }).click();
  //   await expect(page).toHaveURL("https://smysl.shop/?utm_source=np&utm_campaign=header_aside");
  // });

  test('Бургер: ПС', async ({ page }) => {
    await page.getByRole('link', { name: 'Пользуясь случаем Создать свое благотворительное событие', exact: true }).click();
    await expect(page).toHaveURL(/^https:\/\/sluchaem\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: ОП', async ({ page }) => {
    await page.getByRole('link', { name: 'Опытным путем Учиться в школе «Нужна помощь»', exact: true }).click();
    await expect(page).toHaveURL(/^https:\/\/edu\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });
  
  test('Бургер: ЯДРО', async ({ page }) => {
    await page.getByRole('link', { name: 'Ядро Стать партнером и начать эффективно зарабатывать', exact: true }).click();
    await expect(page).toHaveURL(/https:\/\/core\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: Акция «Один для всех»', async ({ page }) => {
    await page.getByRole('link', { name: 'Один для всех' }).click();
    await expect(page).toHaveURL(/^https:\/\/one\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: Акция «Помогаем миллионам»', async ({ page }) => {
  await page.getByRole('link', { name: 'Помогаем миллионам' }).click();
  await expect(page).toHaveURL(/^https:\/\/help\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: Акция «Остаёмся помогать»', async ({ page }) => {
    await page.getByRole('link', { name: 'Остаёмся помогать' }).click();
    await expect(page).toHaveURL(/^https:\/\/stay\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: Акция «Безнадёге нет»', async ({ page }) => {
    await page.getByRole('link', { name: 'Безнадёге нет' }).click();
    await expect(page).toHaveURL('https://beznadege.net/?utm_source=np&utm_campaign=header_aside');
  });

  test('Бургер: Акция «Рубль в день»', async ({ page }) => {
    await page.getByRole('link', { name: 'Рубль в день' }).click();
    await expect(page).toHaveURL(/^https:\/\/365\.nuzhnapomosh\.ru\/\?utm_source=np&utm_campaign=header_aside&_ga=.*$/);
  });

  test('Бургер: Акция «Меняй игру»', async ({ page }) => {
    await page.getByRole('link', { name: 'Меняй игру' }).click();
    await expect(page).toHaveURL('https://changethegame.ru/?utm_source=np&utm_campaign=header_aside');
  });
});


test.describe('Футер', () => {

  test('НП', async ({ page }) => {
    const pagePromise = page.context().waitForEvent('page');
    await page.getByRole('link', { name: 'О нас . Откроется в новой вкладке' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log(await newPage.title());
    await expect(newPage).toHaveURL('https://nuzhnapomosh.ru/about/');
  });

  test('Фонды', async ({ page }) => {
    const pagePromise = page.context().waitForEvent('page');
    await page.getByRole('link', { name: 'Фонды . Откроется в новой вкладке' }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://nuzhnapomosh.ru/funds/');
  });

  test('Отчёты', async ({ page }) => {
    await page.getByLabel('Дополнительная').getByRole('link', { name: 'Отчёты' }).click();
    await expect(page).toHaveURL('https://nuzhnapomosh.ru/reports/');
  });

  test('Пожертвовать', async ({ page }) => {
    await page.getByLabel('Дополнительная').getByRole('link', { name: 'Пожертвовать' }).click();
    await expect(page).toHaveURL('https://nuzhnapomosh.ru/donate/');
  });

  test('Для НКО', async ({ page }) => {
    await page.getByLabel('Дополнительная').getByRole('link', { name: 'Для НКО' }).click();
    await expect(page).toHaveURL('https://nuzhnapomosh.ru/nko/');
  });
  
  test('Контакты', async ({ page }) => {
    await page.getByLabel('Дополнительная').getByRole('link', { name: 'Контакты' }).click();
    await expect(page).toHaveURL('https://nuzhnapomosh.ru/contacts/');
  });
  
  // test('Оферта', async ({ page }) => {
  //   const pagePromise = page.context().waitForEvent('page');
  //   await page.getByRole('link', { name: 'Оферта . Откроется в новой вкладке' }).click(modifiers=["Alt", ]);
  //   const newPage = await pagePromise;
  //   await newPage.waitForLoadState();
  //   console.log(await newPage.title());
  //   await expect(newPage).toHaveURL('https://nuzhnapomosh.ru/wp-content/themes/np/assets/pdf/oferta_np.pdf');
  // });

  test('Оферта', async ({ page }) => {
    const [download] = await Promise.all([
      page.waitForEvent('download'), // wait for download to start
      page.getByRole('link', { name: 'Оферта . Откроется в новой вкладке' }).click()
    ]);
    expect(download.suggestedFilename()).toBe('Оферта № 1 на уставные цели new.pdf')
  });
  // await page.goto('https://nuzhnapomosh.ru/');
  // const page3Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Оферта . Откроется в новой вкладке' }).click();
  // const page3 = await page3Promise;
  // await page.getByRole('link', { name: 'mne@nuzhnapomosh.ru' }).click();
  // const page4Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы Вконтакте. Откроется в новой вкладке' }).click();
  // const page4 = await page4Promise;
  // const page5Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы в Telegram. Откроется в новой вкладке' }).click();
  // const page5 = await page5Promise;
  // const page6Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы в Viber. Откроется в новой вкладке' }).click();
  // const page6 = await page6Promise;
  // const page7Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы в Одноклассниках. Откроется в новой вкладке' }).click();
  // const page7 = await page7Promise;
  // const page8Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы в Twitter. Откроется в новой вкладке' }).click();
  // const page8 = await page8Promise;
  // const page9Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Мы на Youtube. Откроется в новой вкладке' }).click();
  // const page9 = await page9Promise;
  // await page9.getByLabel('Для активации кнопки "Пауза" нажмите k').click();
  
});