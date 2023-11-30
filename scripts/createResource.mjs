/// Use with pnpm create:router
/// Generates routers and respective controllers if asked for it
/// Can also generate boilerplate

import inquirer from "inquirer";
import * as fs from "fs";
import {
    privateControllerBoilerplate,
    privateRouterBoilerplate,
    publicControllerBoilerplate,
    publicRouterBoilerplate,
} from "./generators/generateRouters.mjs";
import { cacheResource } from "./generators/cacheResource.mjs";
import { exec } from "child_process";
import { frontendAPIResource } from "./generators/frontendAPIResource.mjs";
import { capitalize } from "./utils.mjs";
import { useResource } from "./generators/useResource.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromises = fs.promises;

const Questions = [
    {
        type: "input",
        name: "name",
        message: "Enter the router's name",
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else
                return "Project name may only include letters, numbers, underscores and hashes.";
        },
    },
    {
        type: "confirm",
        name: "skip",
        message: "Run full auto ?",
        default: true,
    },
];

const Questions2 = [
    {
        type: "confirm",
        name: "public",
        message: "Is it a public router ?",
        default: true,
    },
    {
        type: "confirm",
        name: "private",
        message: "Is it a private router ?",
        default: true,
    },
    {
        type: "confirm",
        name: "controllers",
        default: true,
        message: "Create controller(s) for the router(s) ?",
    },
    {
        type: "confirm",
        name: "crud",
        default: true,
        message: "Create boilerplate CRUD ?",
    },
    {
        type: "confirm",
        name: "cacheEvents",
        default: true,
        message: "Create cache events for the resource ?",
    },
    {
        type: "confirm",
        name: "clientApi",
        default: true,
        message: "Create a API file for the client ?",
    },
    {
        type: "confirm",
        name: "tanstack",
        default: true,
        message: "Create a tanstack query mutations hook file ?",
    },
    {
        type: "confirm",
        name: "hasMeAccess",
        default: true,
        message: "Is it a resource that has a /me endpoint ?",
    },
];

const publicRouterPath = "./src/routes/public/v1/";
const privateRouterPath = "./src/routes/private/v1/";
const publicControllerPath = "./src/controllers/public/v1/";
const privateControllerPath = "./src/controllers/private/v1/";
const cacheEventPath = "./src/libs/cache/events/";
const cacheKeysFile = "./src/libs/cache/cache.keys.ts";
const apiFilePath = "./client/src/api/";
const tanstackPath = "./client/src/hooks/";
const cacheHandlersFile = "./src/libs/cache/events/index.ts";

const writeToCacheKeys = (name) => {
    fs.readFile(cacheKeysFile, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Find the location where add the new key-value pair
        const insertIndex = data.indexOf("};") - 1;
        const newLine = `    ${name}: "${name}",\n`;

        // Insert
        const updatedData =
            data.slice(0, insertIndex) + newLine + data.slice(insertIndex);

        fs.writeFile(cacheKeysFile, updatedData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Cache Key-value pair added successfully!");
        });
    });
};

const createCacheEvents = (name) => {
    const cacheEventsFileName = `cache.${name}.events.ts`;
    const cacheEventsContent = cacheResource(name);
    const fullPath = cacheEventPath + cacheEventsFileName;
    fsPromises
        .writeFile(fullPath, cacheEventsContent)
        .then(() => console.log(`✅ Cache events created at: ${fullPath}`))
        .catch((err) =>
            console.error(`❌ Error creating cache events: ${err}`)
        );
};

const createCacheHandler = (name) => {
    const importStatement = `import { ${name}CacheEventCallbackHandler } from "./cache.${name}.events";`;

    const filePath = path.join(
        __dirname,
        "..",
        "src",
        "libs",
        "cache",
        "events",
        "index.ts"
    );

    // Read the content of the file
    fs.promises
        .readFile(filePath, "utf8")
        .then((data) => {
            // Check if the import statement already exists
            if (data.includes(importStatement)) {
                console.log(`Import statement for ${name} already exists.`);
            } else {
                // Add the import statement at the top of the file
                const modifiedData = `${importStatement}\n${data}`;

                // Write the modified content back to the file
                return fs.promises.writeFile(filePath, modifiedData, "utf8");
            }
        })
        .then(() => {
            console.log(
                `\n Import statement for ${name} added successfully.\n`
            );
            console.log(
                `------------------------- 🚨🚨🚨 -------------------------`
            );
            console.log(
                `The cache handler was not added automatically to ${filePath}. Please add it yourself. \n\n`
            );
        })
        .catch((err) => {
            console.error(err);
        });
};

const createResourceFile = (
    filePath,
    content,
    successMessage,
    errorMessage
) => {
    fsPromises
        .writeFile(filePath, content)
        .then(() => console.log(`✅ ${successMessage}: ${filePath}`))
        .catch((err) => console.error(`❌ ${errorMessage}: ${err}`));
};

const run = async () => {
    const answers = await inquirer.prompt(Questions);
    const name = answers["name"].toLowerCase();
    const fullAuto = answers["skip"];

    if (!name.endsWith("s")) {
        const interlude = await inquirer.prompt([
            {
                type: "confirm",
                name: "notPlural",
                message:
                    "Resource name does not seem to be plural. This can break the conventions set by this template. Are you sure to proceed ?",
                default: false,
            },
        ]);

        if (!interlude["notPlural"]) return;
    }

    let isPublicRouter = true;
    let isPrivateRouter = true;
    let createControllers = true;
    let createCRUD = true;
    let createCache = true;
    let createAPIFile = true;
    let createTanstackHook = true;
    let hasMeAccess = true;

    if (!fullAuto) {
        const answers2 = await inquirer.prompt(Questions2);
        isPublicRouter = answers2["public"];
        isPrivateRouter = answers2["private"];
        createControllers = answers2["controllers"];
        createCRUD = answers2["crud"];
        createCache = answers2["cache"];
        createAPIFile = answers2["clientApi"];
        createTanstackHook = answers2["tanstack"];
        hasMeAccess = answers2["hasMeAccess"];
    }

    const options = {
        publicRouterFileName: isPublicRouter
            ? `${name}.public.router.ts`
            : undefined,
        privateRouterFileName: isPrivateRouter
            ? `${name}.private.router.ts`
            : undefined,
        createControllers,
        publicControllerFileName:
            createControllers && isPublicRouter
                ? `${name}.public.controller.ts`
                : undefined,
        privateControllerFileName:
            createControllers && isPublicRouter
                ? `${name}.private.controller.ts`
                : undefined,
        createCRUD,
    };

    if (createCache) {
        writeToCacheKeys(name);
        createCacheEvents(name);
        createCacheHandler(name);
    }

    if (createAPIFile) {
        const apiFileName = `${name}.api.ts`;
        createResourceFile(
            `${apiFilePath}${apiFileName}`,
            frontendAPIResource(name, { hasMeAccess }),
            "Client API File created",
            "Error creating client API file"
        );
    }

    if (createTanstackHook) {
        const tanstackFileName = `use${capitalize(name)}.tsx`;
        createResourceFile(
            `${tanstackPath}${tanstackFileName}`,
            useResource(name, { hasMeAccess }),
            "Tanstack Query hook File created",
            "Error creating Tanstack Query file"
        );
    }

    if (options.privateRouterFileName) {
        const privateRouterContent = options.createCRUD
            ? privateRouterBoilerplate(name, {
                  hasMeAccess,
              })
            : "";
        const privateRouterFilePath = `${privateRouterPath}${options.privateRouterFileName}`;
        createResourceFile(
            privateRouterFilePath,
            privateRouterContent,
            "Private router created",
            "Error creating private router"
        );
    }

    if (options.publicRouterFileName) {
        const publicRouterContent = options.createCRUD
            ? publicRouterBoilerplate(name, { hasMeAccess })
            : "";
        const publicRouterFilePath = `${publicRouterPath}${options.publicRouterFileName}`;
        createResourceFile(
            publicRouterFilePath,
            publicRouterContent,
            "Public router created",
            "Error creating public router"
        );
    }

    if (options.publicControllerFileName) {
        const publicControllerContent = options.createCRUD
            ? publicControllerBoilerplate(name, { hasMeAccess })
            : "";
        const publicControllerFilePath = `${publicControllerPath}${options.publicControllerFileName}`;
        createResourceFile(
            publicControllerFilePath,
            publicControllerContent,
            "Public controller created",
            "Error creating public controller"
        );
    }

    if (options.privateControllerFileName) {
        const privateControllerContent = options.createCRUD
            ? privateControllerBoilerplate(name, {
                  hasMeAccess,
              })
            : "";
        const privateControllerFilePath = `${privateControllerPath}${options.privateControllerFileName}`;
        createResourceFile(
            privateControllerFilePath,
            privateControllerContent,
            "Private controller created",
            "Error creating private controller"
        );
    }

    console.log(`🧹 Cleaning up the generated files...`);

    exec(`pnpm prettier`, (err, stdo, stde) => {
        if (err) {
            console.error(`Error executing prettier: ${err}`);
            return;
        }
        console.log(
            `🏆 Job complete !\nMake sure to go in and make the necessary adjustments for the new resource.`
        );
    });
};

run();
