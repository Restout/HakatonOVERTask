export function formatDate(inputDate: string) {
    const inputDateFormat = new Date(inputDate);
    const day = inputDateFormat.getDate();
    const month = inputDateFormat.getMonth() + 1;
    const year = inputDateFormat.getFullYear();

    // Добавляем нули перед днями и месяцами, если они однозначные
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const result = {
        // dayOfWeek: inputDateFormat.getUTCDay(),
        dayOfWeek: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            inputDateFormat,
        ),
        day: formattedDay,
        month: formattedMonth,
        year: year,
        date: `${formattedDay}.${formattedMonth}.${year}`,
    };

    return result;
}
