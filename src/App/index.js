import "./App.css";
import { Navbar, Container, Col, Row } from "react-bootstrap";
import { GetAllTodos, AddTodo, SelectTodo } from "../Todo";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar expand="lg" variant="light" bg="light" className="page-header">
          <Container>
            <Col className="header-site-name mt-2">
              <h1>GetItDone</h1>
            </Col>
          </Container>
        </Navbar>
      </header>
      <section>
        <Container>
          <Row className="mt-4">
            <Col mt={2} className="mt-3">
              New Listings
            </Col>
            <Col>
              <SelectTodo />
            </Col>
          </Row>
          <GetAllTodos />
          <AddTodo />
        </Container>
      </section>
    </div>
  );
}

export default App;
