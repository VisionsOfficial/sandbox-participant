import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Styles from "./ExampleTodosPage.module.scss";
import {
    createTodo,
    deleteTodo,
    getUserTodos,
    updateTodo,
} from "../../../api/todos.api";
import { Button } from "../../../components/atoms/Buttons/Button/Button";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

export const ExampleTodosPage = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["todos"],
        queryFn: getUserTodos,
        gcTime: 1000 * 5,
    });

    const mutationCreate = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const mutationDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const [newTodoTitle, setNewTodoTitle] = useState("");

    const [editedTitle, setEditedTitle] = useState("");

    // Debounce is useless here but just for demo purposes
    // for the template
    const debouncedTitle = useDebounce(editedTitle, 1000);

    const handleEditTodo = (todoId: string) => {
        if (debouncedTitle) {
            mutationUpdate.mutate({ id: todoId, name: debouncedTitle });
            setEditedTitle("");
        }
    };

    return (
        <div className={Styles.ExampleUsersPage}>
            <ul>
                {query.data?.map((todo) => (
                    <li key={todo._id}>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder={todo.name}
                        />
                        <Button
                            onClick={() => handleEditTodo(todo._id)}
                            disabled={!debouncedTitle}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => {
                                mutationDelete.mutate(todo._id);
                            }}
                        >
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => {
                        setNewTodoTitle(e.target.value);
                    }}
                />
            </div>
            <Button
                onClick={() => {
                    // Type infered from the mutationFn params
                    mutationCreate.mutate({ name: "Test new Todo" });
                }}
            >
                Add Todo
            </Button>
        </div>
    );
};
