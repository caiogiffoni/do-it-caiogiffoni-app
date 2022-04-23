import { Background, Container, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo de 8 Dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    api
      .post("/user/login", data)
      .then((res) => {
        toast.success("Sucesso ao entrar na conta");
        const { token, user } = res.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user));
        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Erro ao entrar na conta, tente novamente");
      });
  };

  if (authenticated) return <Redirect to="/dashboard" />;

  return (
    <div>
      <Container>
        <Content>
          <AnimationContainer>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <h1>Login</h1>
              <Input
                register={register}
                icon={FiMail}
                label="Email"
                placeholder="Seu melhor email"
                name="email"
                error={errors.email?.message}
              />
              <Input
                register={register}
                icon={FiLock}
                label="Senha"
                placeholder="Uma senha bem segura"
                name="password"
                error={errors.password?.message}
              />
              <Button type="submit">Enviar</Button>
              <p>
                Não tem uma conta? Faça seu <Link to="/signup">cadastro</Link>{" "}
              </p>
            </form>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </div>
  );
};

export default Login;
