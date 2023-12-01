/**
 * Returns the amount of {value} in milliseconds for the specified {unit}
 */
export const numberToMs = (value: number, unit: string = "ms"): number => {
    switch (unit) {
        case "ms":
            return value;
        case "s":
            return value * 1000;
        case "min":
            return value * 60 * 1000;
        case "h":
            return value * 60 * 60 * 1000;
        default:
            return value;
    }
};
