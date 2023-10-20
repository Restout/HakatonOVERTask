export const checkEmptyValidity = (values: string[]) => {
    return values.every((value) => value.trim().length > 0);
};
