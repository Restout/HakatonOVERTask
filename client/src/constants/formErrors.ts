export const formErrors = {
    required: "Обязательное поле",
    maxLengthLimit: (length: number) => `Максимальная. длина: ${length}`,
    minLengthLimit: (length: number) => `Минимальная длина: ${length}`,
} as const;
