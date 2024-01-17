import { test, expect } from '@playwright/test';

exports.AuthorizationPage = class AuthorizationPage {
    constructor(page) {
      this.page = page;
      this.accountPageButton = page.locator('[id="np-header-button-user"]');
      this.accountSettings = page.getByRole('link', { name: 'Настройки аккаунта' });
      this.userEmail = page.getByPlaceholder('Введите email');
      this.emailField = page.getByPlaceholder('Email');
      this.passwordField = page.getByPlaceholder('Введите пароль');
      this.continueButton = page.getByRole('button', { name: 'Продолжить' });
      this.enterButton = page.getByRole('button', { name: 'Войти' })
    }
   
    async checkAuthorization(email) {
      await this.accountPageButton.click();
      await this.accountSettings.click();
      await expect(this.userEmail).toHaveValue(email);
    }

    async authorizationByEmail(email, password) {
      await this.emailField.click();
      await this.emailField.fill(email);
      await this.continueButton.click();
      await this.passwordField.click();
      await this.passwordField.fill(password);
      await this.enterButton.click(); 
      // await this.page.getByRole('menuitem', { name: 'Меню пользователя' })
    }
  }