import {
  Button,
  useToast,
  Fade,
  Spinner,
  IconButton,
  Stack,
  Skeleton,
  Checkbox,
} from "@chakra-ui/react";
import { RepeatIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
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
      <Fade in={mounted}>
        <Button
          colorScheme="blue"
          onClick={() => {
            toast({
              title: "Initialized!",
              description: "성공적으로 next.js, chakra-ui를 설정했습니다.",
              status: "success",
              position: "top",
              duration: 1500,
            });
          }}
        >
          Click!
        </Button>
      </Fade>
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
  const { todoList, isLoading, refresh, addNewTodo } = useTodoList();
  console.log(todoList);
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
      <div>
        <IconButton
          aria-label="Refresh"
          icon={<RepeatIcon />}
          onClick={() => {
            refresh();
          }}
        />
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          onClick={() => {
            addNewTodo();
          }}
        />
      </div>

      {todoList.map((todo) => {
        return (
          <div key={todo.id} className="todo">
            <Checkbox
              isChecked={todo.fields.Done === true}
              style={{ marginRight: 10 }}
            />
            {todo.fields.Name}
          </div>
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
