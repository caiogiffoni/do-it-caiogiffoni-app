import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FiEdit2 } from "react-icons/fi";
import { InputContainer, Container, TaskContainer } from "./styles";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Dashboard({ authenticated }) {
  const [tasks, setTasks] = useState("");
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  function loadTasks() {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((res) => {
        const apiTasks = res.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = ({ task }) => {
    if (!task) toast.error("Complete o campo para enviar a tarefa");

    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setTasks(newTasks));
  };

  if (!authenticated) return <Redirect to="/login" />;

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>
          {new Date(Date.now()).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova Tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tasks &&
          tasks.map((task) => (
            <Card
              key={task._id}
              title={task.description}
              date={task.createdAt}
              onClick={() => handleCompleted(task._id)}
            />
          ))}
      </TaskContainer>
    </Container>
  );
}

export default Dashboard;
