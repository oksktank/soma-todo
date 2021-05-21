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

  const createMutation = useMutation(
    () =>
      axios.post("/api/todo", {
        fields: {
          Name: "",
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

  const deleteMutation = useMutation(
    (id: string) => axios.delete(`/api/todo?id=${id}`),
    {
      onSuccess: () => {
        refresh();
        toast({
          title: "Deleted",
          status: "error",
          position: "bottom",
          duration: 1500,
        });
      },
    }
  );

  const updateMutation = useMutation(
    (record: Record) => axios.patch(`/api/todo?id=${record.id}`, record),
    {
      onSuccess: () => {
        // refresh();
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
    isProcessing:
      createMutation.isLoading ||
      deleteMutation.isLoading ||
      updateMutation.isLoading,
    refresh: refresh,
    addNewTodo: createMutation.mutate,
    deleteTodo: deleteMutation.mutate,
    updateTodo: updateMutation.mutate,
  };
}
