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
} from "./generateRouters.mjs";

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
        name: "public",
        message: "Is it a public router ?",
        default: true,
        transformer: (answer) => (answer ? "👍" : "👎"),
    },
    {
        type: "confirm",
        name: "private",
        message: "Is it a private router ?",
        default: true,
        transformer: (answer) => (answer ? "👍" : "👎"),
    },
    {
        type: "confirm",
        name: "controllers",
        default: true,
        message: "Create controller(s) for the router(s) ?",
        transformer: (answer) => (answer ? "👍" : "👎"),
    },
    {
        type: "confirm",
        name: "crud",
        default: true,
        message: "Create boilerplate CRUD ?",
        transformer: (answer) => (answer ? "👍" : "👎"),
    },
];

const publicRouterPath = "./src/routes/public/v1/";
const privateRouterPath = "./src/routes/private/v1/";
const publicControllerPath = "./src/controllers/public/v1/";
const privateControllerPath = "./src/controllers/private/v1/";

inquirer.prompt(Questions).then((answers) => {
    const isPublicRouter = answers["public"];
    const isPrivateRouter = answers["private"];
    const name = answers["name"];
    const createControllers = answers["controllers"];
    const createCRUD = answers["crud"];

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
    
    if (options.publicRouterFileName) {
        const publicRouterContent = options.createCRUD
            ? publicRouterBoilerplate(name)
            : "";
        const publicRouterFilePath = `${publicRouterPath}${options.publicRouterFileName}`;
        fsPromises
            .writeFile(publicRouterFilePath, publicRouterContent)
            .then(() =>
                console.log(
                    `✅ Public router created at: ${publicRouterFilePath}`
                )
            )
            .catch((err) =>
                console.error(`❌ Error creating public router: ${err}`)
            );
    }

    if (options.privateRouterFileName) {
        const privateRouterContent = options.createCRUD
            ? privateRouterBoilerplate(name)
            : "";
        const privateRouterFilePath = `${privateRouterPath}${options.privateRouterFileName}`;
        fsPromises
            .writeFile(privateRouterFilePath, privateRouterContent)
            .then(() =>
                console.log(
                    `✅ Private router created at: ${privateRouterFilePath}`
                )
            )
            .catch((err) =>
                console.error(`❌ Error creating private router: ${err}`)
            );
    }

    if (options.publicControllerFileName) {
        const publicControllerContent = options.createCRUD
            ? publicControllerBoilerplate(name)
            : "";
        const publicControllerFilePath = `${publicControllerPath}${options.publicControllerFileName}`;
        fsPromises
            .writeFile(publicControllerFilePath, publicControllerContent)
            .then(() =>
                console.log(
                    `✅ Public controller created at: ${publicControllerFilePath}`
                )
            )
            .catch((err) =>
                console.error(`❌ Error creating public controller: ${err}`)
            );
    }

    if (options.privateControllerFileName) {
        const privateControllerContent = options.createCRUD
            ? privateControllerBoilerplate(name)
            : "";
        const privateControllerFilePath = `${privateControllerPath}${options.privateControllerFileName}`;
        fsPromises
            .writeFile(privateControllerFilePath, privateControllerContent)
            .then(() =>
                console.log(
                    `✅ Private controller created at: ${privateControllerFilePath}`
                )
            )
            .catch((err) =>
                console.error(`❌ Error creating private controller: ${err}`)
            );
    }
});
