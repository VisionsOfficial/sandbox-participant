/// Generator for the default mutations for a resource
/// in tanstack query. Subject to evolve, still a beginner
/// at Tanstack Query

import { getNameVariants } from "../utils.mjs";

export const useResource = (name) => {
    console.log(
        `🔨 Generating Tanstack Query mutations hook boilerplate for ${name}`
    );

    const { capitalized, capitalizedSingular, singular } =
        getNameVariants(name);

    return `import {
    UndefinedInitialDataOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { APIDocument } from "../types";
import { I${capitalizedSingular} } from "../../../src/types/${singular}";
import { DefaultTanstackQueryOptions } from "../libs/tanstack-query/tanstack-query.defaults";
import {
    create${capitalizedSingular},
    delete${capitalizedSingular},
    getUser${capitalized},
    update${capitalizedSingular},
} from "../api/${name}.api";

type ${capitalized}QueryOptions = Omit<
    UndefinedInitialDataOptions<
        APIDocument<I${capitalizedSingular}>[],
        Error,
        APIDocument<I${capitalizedSingular}>[],
        string[]
    >,
    "queryKey"
> & { queryKey?: string[] };

const ${name.toUpperCase()}_KEY = "${name}";

export const use${capitalized} = (options: ${capitalized}QueryOptions) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        ...DefaultTanstackQueryOptions,
        queryFn: getUser${capitalized},
        queryKey: [${name.toUpperCase()}_KEY],
        ...options,
    });

    const mutationCreate = useMutation({
        mutationFn: create${capitalizedSingular},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [${name.toUpperCase()}_KEY] });
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: update${capitalizedSingular},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [${name.toUpperCase()}_KEY] });
        },
    });

    const mutationDelete = useMutation({
        mutationFn: delete${capitalizedSingular},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [${name.toUpperCase()}_KEY] });
        },
    });

    return {
        query,
        mutationCreate,
        mutationUpdate,
        mutationDelete,
    };
};
`;
};
