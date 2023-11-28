import { capitalize, getNameVariants } from "./utils.mjs";

export const publicRouterBoilerplate = (name) => {
    console.log(`🔨 Generating public router boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `import { Router } from "express";
import { param } from "express-validator";
import { validate } from "../../middlewares/validator.middleware";
import {
    getAll${capitalized},
    get${capitalizedSingular}ById,
} from "../../../controllers/public/v1/${name}.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";

const r: Router = Router();

r.get("/", getAll${capitalized});
r.get(
    "/:${singular}Id",
    passthroughMe,
    [param("${singular}Id").isMongoId()],
    validate,
    get${capitalizedSingular}ById
);

export default r;
`;
};

export const privateRouterBoilerplate = (name) => {
    console.log(`🔨 Generating private router boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    delete${capitalizedSingular}ById,
    getCurrent${capitalizedSingular},
    update${capitalizedSingular}ById,
} from "../../../controllers/private/v1/${name}.private.controller";
import {
    isNonEmptyEmail,
    isValidPassword,
    validate,
} from "../../middlewares/validator.middleware";
import { param } from "express-validator";

const r: Router = Router();

r.use(authenticate);

r.get("/me", getCurrent${capitalizedSingular});
r.put(
    "/:${singular}Id",
    [isNonEmptyEmail, isValidPassword],
    validate,
    update${capitalizedSingular}ById
);
r.delete(
    "/:${singular}Id",
    [param("${singular}Id").isMongoId()],
    validate,
    delete${capitalizedSingular}ById
);

export default r;
`;
};

export const publicControllerBoilerplate = (name) => {
    console.log(`🔨 Generating public controller boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `import { NextFunction, Request, Response } from "express";
import { ${capitalizedSingular} } from "../../../models";

/**
 * Gets all ${name}
 */
export const getAll${capitalized} = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ${name} = await ${capitalizedSingular}.find().lean();
        return res.json(${name});
    } catch (err) {
        next(err);
    }
};

/**
 * Gets a ${singular} by ID
 */
export const get${capitalizedSingular}ById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ${singular} = await ${capitalizedSingular}.findById(req.params.${singular}Id);

        if (!${singular}) {
            return res.status(404).json({ error: "Not found" });
        }

        return res.json(${singular});
    } catch (err) {
        next(err);
    }
};
`;
};

export const privateControllerBoilerplate = (name) => {
    console.log(`🔨 Generating private controller boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `import { NextFunction, Request, Response } from "express";
import { ${capitalizedSingular} } from "../../../models";

/**
 * Gets the ${singular} in session
 */
export const getCurrent${capitalizedSingular} = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ${singular} = await ${capitalizedSingular}.findById(req.session.user._id)
            .lean();
        if (!${singular}) return res.status(404).json({ error: "${capitalizedSingular} not found" });
        return ${singular};
    } catch (err) {
        next(err);
    }
};

/**
 * Updates a ${singular} by ID
 */
export const update${capitalizedSingular}ById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ${singular} = await ${capitalizedSingular}.findByIdAndUpdate(
            req.params.${singular}Id,
            { ...req.body },
            { new: true, runValidators: true }
        )
            .lean();

        return res.json(${singular});
    } catch (err) {
        next(err);
    }
};

/**
 * Deletes a ${singular} by ID
 */
export const delete${capitalizedSingular}ById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ${singular} = await ${capitalizedSingular}.findByIdAndDelete(req.params.${singular}Id);

        if (!${singular}) return res.status(404).json({ error: "${capitalizedSingular} not found" });
        return res.json(${singular});
    } catch (err) {
        next(err);
    }
};
`;
};
