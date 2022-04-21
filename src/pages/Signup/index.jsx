import { Background, Container, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Signup = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo de 8 Dígitos"),
    passwordConfirm: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "Senhas Diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Container>
        <Background />
        <Content>
          <AnimationContainer>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
              <h1>Cadastro</h1>
              <Input
                register={register}
                icon={FiUser}
                label="Nome"
                placeholder="Seu nome"
                name="name"
                error={errors.name?.message}
              />
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
                icon={FiMail}
                label="Senha"
                placeholder="Uma senha bem segura"
                name="password"
                error={errors.password?.message}
              />
              <Input
                register={register}
                icon={FiLock}
                label="Confirmação da senha"
                placeholder="Confirmação da senha"
                name="passwordConfirm"
                error={errors.passwordConfirm?.message}
              />
              <Button type="submit">Enviar</Button>
              <p>
                Já tem uma conta? Faça seu <Link to="/login">login</Link>{" "}
              </p>
            </form>
          </AnimationContainer>
        </Content>
      </Container>
    </div>
  );
};

export default Signup;
