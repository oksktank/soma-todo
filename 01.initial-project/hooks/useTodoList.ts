import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { QueryCache, useMutation, useQuery, useQueryClient } from "react-query";
import { Record } from "../interfaces";
export function useTodoList() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const key = "todo-list";

  const todoListQuery = useQuery(key, () => {
    return axios.get("/api/todo");
  });

  const { mutate, isLoading } = useMutation(
    () =>
      axios.post("/api/todo", {
        fields: {
          Name: "새 Todo",
          Done: false,
        },
      }),
    {
      onSuccess: () => {
        refresh();
        toast({
          title: "Added",
          status: "info",
          position: "bottom",
          duration: 1500,
        });
      },
    }
  );
  const refresh = () => {
    queryClient.invalidateQueries(key);
  };

  useEffect(() => {
    if (!todoListQuery.isSuccess) {
      toast({
        title: "Data fetch success!",
        status: "info",
        position: "bottom",
        duration: 1500,
      });
    }
  }, [todoListQuery.isSuccess]);

  return {
    todoList: todoListQuery.isSuccess
      ? (todoListQuery.data.data.records as Record[])
      : [],
    isLoading: todoListQuery.isLoading,
    refresh: refresh,
    addNewTodo: mutate,
  };
}
