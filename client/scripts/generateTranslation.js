/// Generates an object to reference a json object's properties
/// using the dot-separated access paths as a camelCase key

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationData = JSON.parse(
    fs.readFileSync(
        path.join(
            __dirname,
            "..",
            "public",
            "locales",
            "en",
            "translation.json"
        ),
        "utf8"
    )
);

// Helper function to convert string to camelCase
function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        )
        .replace(/(\.[a-z])/g, (group) => group.toUpperCase().replace(".", ""));
}

// Recursively flatten JSON keys and convert keys to camelCase
function flattenObject(obj, parentKey = "") {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        const camelCaseKey = toCamelCase(newKey);

        if (typeof obj[key] === "object") {
            return { ...acc, ...flattenObject(obj[key], newKey) };
        }
        return {
            ...acc,
            [camelCaseKey]: newKey,
        };
    }, {});
}

const translationKeys = flattenObject(translationData);

const tsFileContent = `/// FILE GENERATED AUTOMATICALLY USING pnpm generate:translation
export const TRANSLATION_KEYS = ${JSON.stringify(translationKeys, null, 2)};\n`;

const writePath = path.join(
    __dirname,
    "..",
    "src",
    "constants",
    "translationKeys.ts"
);

fs.writeFileSync(writePath, tsFileContent);

console.log("Translation keys have been generated and saved to " + writePath);
