exports.Utils = class Utils {
    currentDate() {
        const today = new Date();  // Получаем день, месяц и год
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const year = today.getFullYear();
        const yy = year % 100;
        const formattedDate = `${dd}.${mm}.${yy}`;  // Форматируем дату в требуемый формат dd.mm.yyyy
        return formattedDate;
    }
};