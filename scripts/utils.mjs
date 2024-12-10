export const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const getNameVariants = (str) => {
    const capitalized = capitalize(str);
    const singular = str.endsWith("ies")
        ? str.slice(0, -3) + "y"
        : str.endsWith("s")
        ? str.slice(0, -1)
        : str;
    const capitalizedSingular = capitalize(singular);

    return { capitalized, singular, capitalizedSingular };
};
