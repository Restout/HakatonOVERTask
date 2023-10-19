export const getInterval = (date?: string): string => {
    const currentDate = date ? new Date(date) : new Date();

    // Находим текущий день недели (0 - воскресенье, 1 - понедельник, и так далее)
    const currentDayOfWeek = currentDate.getDay();

    // Вычисляем разницу в днях между текущим днем недели и понедельником
    const daysUntilLastMonday = (currentDayOfWeek + 6) % 7;

    // Вычисляем дату последнего понедельника
    const lastMonday = new Date(currentDate);
    lastMonday.setDate(currentDate.getDate() - daysUntilLastMonday);

    // Вычисляем дату субботы
    const nextSaturday = new Date(lastMonday);
    nextSaturday.setDate(lastMonday.getDate() + 5);

    const formattedLastMonday = `${lastMonday.getDate()}.${
        lastMonday.getMonth() + 1
    }`;
    const formattedNextSaturday = `${nextSaturday.getDate()}.${
        nextSaturday.getMonth() + 1
    }`;

    return `${formattedLastMonday} - ${formattedNextSaturday}`;
};
