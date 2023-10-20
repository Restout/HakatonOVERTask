export function transformDate(inputDate: Date) {
    const inputDateFormat = new Date(inputDate);
    const day = inputDateFormat.getDate();
    const month = inputDateFormat.getMonth() + 1;
    const year = inputDateFormat.getFullYear();

    // Добавляем нули перед днями и месяцами, если они однозначные
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
}
