export const formatTime = (inputDate: string): string => {
    const date = new Date(inputDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const timeString = `${formattedHours}:${formattedMinutes}`;

    return timeString;
};
