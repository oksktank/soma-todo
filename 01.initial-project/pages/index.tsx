import {
  Button,
  useToast,
  Fade,
  Spinner,
  IconButton,
  Stack,
  Skeleton,
  Checkbox,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Record } from "../interfaces";
import { RepeatIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
import produce from "immer";
import _ from "lodash";
export default function Home() {
  const toast = useToast();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);
  return (
    <div className="container">
      <TodoList />

      <style jsx global>{`
        #__next,
        body,
        html {
          margin: 0px;
          height: 100%;
        }
        body {
          padding: 25px;
          background: #eeeeee;
        }
      `}</style>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #ffffff;
          padding: 25px;
          width: 400px;
          margin-left: auto;
          margin-right: auto;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

const TodoList = () => {
  const {
    todoList,
    isLoading,
    isProcessing,
    refresh,
    addNewTodo,
    deleteTodo,
    updateTodo,
  } = useTodoList();

  if (isLoading) {
    return (
      <div>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          minWidth: 260,
        }}
      >
        <IconButton
          aria-label="Refresh"
          icon={<RepeatIcon />}
          onClick={() => {
            refresh();
          }}
          style={{ marginRight: 10 }}
        />
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          onClick={() => {
            addNewTodo();
          }}
          style={{ marginRight: 10 }}
        />
        {isProcessing && <Spinner color="blue.500" />}
      </div>

      {todoList.map((todo) => {
        const debounceUpdate = _.debounce((todo: Record, nextValue: string) => {
          const updated = produce(todo, (nextTodo) => {
            nextTodo.fields.Name = nextValue;
          });
          updateTodo(updated);
        }, 1500);
        return (
          <Fade key={todo.id + "/" + todo.fields.Name} in>
            <div className="todo">
              <Checkbox
                defaultChecked={todo.fields.Done === true}
                style={{ marginRight: 10, verticalAlign: "top" }}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const updated = produce(todo, (nextTodo) => {
                    nextTodo.fields.Done = checked;
                  });
                  updateTodo(updated);
                }}
              />
              <div style={{ width: 200, marginRight: 10 }}>
                <Editable
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                  defaultValue={todo.fields.Name}
                  onChange={(nextValue) => {
                    debounceUpdate(todo, nextValue);
                  }}
                >
                  <EditablePreview style={{ width: "100%" }} />
                  <EditableInput />
                </Editable>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="Delete"
                  size="xs"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                />
              </div>
            </div>
          </Fade>
        );
      })}
      <style jsx>{`
        .todo {
          display: flex;
        }
      `}</style>
    </div>
  );
};
