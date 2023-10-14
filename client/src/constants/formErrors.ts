export const formErrors = {
    required: "Required field",
    maxLengthLimit: (length: number) => `Max length: ${length}`,
    minLengthLimit: (length: number) => `Min length: ${length}`,
} as const;
