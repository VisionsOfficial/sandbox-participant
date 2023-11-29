/// Test of inquirer for using variables in future questions

import inquirer from "inquirer";

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
    },
    {
        type: "confirm",
        name: "private",
        message: "Is it a private router ?",
        default: true,
    },
];

inquirer.prompt(Questions).then((answers) => {
    const isPublicRouter = answers["public"];
    const isPrivateRouter = answers["private"];
    const name = answers["name"];

    console.log(answers);

    const q2 = [
        {
            type: "confirm",
            name: "controllers",
            default: true,
            message: `Created ${name} should i do something else ?`,
        },
        {
            type: "confirm",
            name: "crud",
            default: true,
            message: `isPublicRouter is ${isPublicRouter.toString()} and isPrivateRouter is ${isPrivateRouter.toString()}`,
        },
    ];

    inquirer.prompt(q2).then((ans) => {
        console.log(ans);
    });
});
