import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../../components/Button";
import { Container, Content } from "./styles";

function Home({ authenticated }) {
  const history = useHistory();
  const HandleNavigation = (path) => {
    return history.push(path);
  };

  if (authenticated) return <Redirect to="/dashboard" />;

  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>
        <div>
          <Button onClick={() => HandleNavigation("./signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => HandleNavigation("./login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
