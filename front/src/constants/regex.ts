export const APP_REGEX = {
    name: /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/gm,
    email: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm,
};
