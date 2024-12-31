import { Container } from "@mui/material";
import { TaskManager } from "./components/TaskManager";
import { Nav } from "./components/AppBar";

const App = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="lg">
        <TaskManager />
      </Container>
    </>
  );
};

export default App;
