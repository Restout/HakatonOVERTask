export const getPreviousMonday = (date?: string): string => {
    const currentDate = date ? new Date(date) : new Date();
    const dayOfWeek = currentDate.getUTCDay();
    const daysToSubtract = (dayOfWeek + 6) % 7;
    const previousMonday = new Date(currentDate);
    previousMonday.setUTCDate(currentDate.getUTCDate() - daysToSubtract);
    return previousMonday.toISOString().slice(0, 10);
};

export const getPreviousWeekMonday = (date?: string): string => {
    const currentDate = date ? new Date(date) : new Date();
    const dayOfWeek = currentDate.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    currentDate.setDate(currentDate.getDate() - daysToSubtract);

    currentDate.setDate(currentDate.getDate() - 7);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const getNextMonday = (date?: string): string => {
    const today = date ? new Date(date) : new Date();
    const daysUntilNextMonday = 8 - today.getDay();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);

    const year = nextMonday.getFullYear();
    const month = (nextMonday.getMonth() + 1).toString().padStart(2, "0");
    const day = nextMonday.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
};
