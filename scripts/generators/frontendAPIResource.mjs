import { getNameVariants } from "../utils.mjs";

export const frontendAPIResource = (name, options) => {
    console.log(`🔨 Generating client API file boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `
    import { config } from "../config/environment.config";
import { APIDocument } from "../types";
import { I${capitalizedSingular} } from "../../../src/types/${singular}";
import { APIClient } from "react-api-client-provider";

const ${name}Client = new APIClient({
    baseURL: config.apiURL + "/v1/${name}",
    requestInterceptors: (opts) => ({ ...opts, withCredentials: true }),
});

${
    options?.hasMeAccess &&
    `export const getUser${capitalized} = async () => {
    const res = await ${name}Client.GET({ url: "/me" });
    return res?.data as APIDocument<I${capitalizedSingular}>[];
};`
}

export const create${capitalizedSingular} = async ({ name }: Pick<I${capitalizedSingular}, "name">) => {
    try {
        const res = await ${name}Client.POST({ url: "/", data: { name } });
        return res?.data as APIDocument<I${capitalizedSingular}>;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const update${capitalizedSingular} = async ({
    id,
    name,
    completed,
}: {
    id: string;
    name?: string;
    completed?: boolean;
}) => {
    try {
        const res = await ${name}Client.PUT({
            url: \`/\${id}\`,
            data: { name, completed },
        });
        return res?.data as APIDocument<I${capitalizedSingular}>;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const delete${capitalizedSingular} = async (id: string) => {
    try {
        const res = await ${name}Client.DELETE({ url: \`/\${id}\` });
        return res?.data as APIDocument<I${capitalizedSingular}>;
    } catch (err) {
        console.log(err);
        return null;
    }
};
`;
};
