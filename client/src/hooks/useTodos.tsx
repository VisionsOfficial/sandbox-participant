import {
    UndefinedInitialDataOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { APIDocument } from "../types";
import { ITodo } from "../../../src/types/todo";
import { DefaultTanstackQueryOptions } from "../libs/tanstack-query/tanstack-query.defaults";
import {
    createTodo,
    deleteTodo,
    getUserTodos,
    updateTodo,
} from "../api/todos.api";

type TodosQueryOptions = Omit<
    UndefinedInitialDataOptions<
        APIDocument<ITodo>[],
        Error,
        APIDocument<ITodo>[],
        string[]
    >,
    "queryKey"
> & { queryKey?: string[] };

const TODOS_KEY = "todos";

export const useTodos = (options: TodosQueryOptions) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        ...DefaultTanstackQueryOptions,
        queryFn: getUserTodos,
        queryKey: [TODOS_KEY],
        ...options,
    });

    const mutationCreate = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TODOS_KEY] });
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TODOS_KEY] });
        },
    });

    const mutationDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TODOS_KEY] });
        },
    });

    return {
        query,
        mutationCreate,
        mutationUpdate,
        mutationDelete,
    };
};
