/// Sets up the model after creating it with Folder Templates
/// Ex: create a model using fttemplates "Foo" then run:
///     pnpm setup-model --model=Foo
/// This will place the types in the types/models and update
/// the models barrel file

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Parsing command line arguments
const args = process.argv.slice(2);
const modelArg = args.find((arg) => arg.startsWith("--model="));
const modelName = modelArg?.split("=")[1];

if (!modelName) {
    console.error("Model name is required. Use --model=ModelName");
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, "..", "src", "models");
const modelDir = path.join(modelsDir, modelName);
const modelTypePath = path.join(modelDir, `${modelName.toLowerCase()}.d.ts`);
const typesDir = path.join(__dirname, "..", "src", "types", "models");

// Check if the model directory exists
if (!fs.existsSync(modelDir)) {
    console.error(`Error: Directory ${modelDir} does not exist.`);
    process.exit(1);
}

// Check if the model type definition file exists
if (!fs.existsSync(modelTypePath)) {
    console.error(
        `Error: Type definition file ${modelTypePath} does not exist.`
    );
    process.exit(1);
}

// Move the type definition file to the types directory
fs.renameSync(
    modelTypePath,
    path.join(typesDir, `${modelName.toLowerCase()}.d.ts`)
);

// Update the index.ts to export all models
const models = fs
    .readdirSync(modelsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const exportStatements = models
    .map((modelName) => {
        // Capitalize the first letter of the model name for the export
        const exportName =
            modelName.charAt(0).toUpperCase() + modelName.slice(1);
        return `export { ${exportName} } from "./${exportName}";\n`;
    })
    .join("");

const indexPath = path.join(modelsDir, "index.ts");
fs.writeFileSync(indexPath, exportStatements);

console.log(`Updated exports in ${indexPath}`);
