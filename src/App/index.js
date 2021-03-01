import "./App.css";
import { Navbar, Container, Col, Row, Form } from "react-bootstrap";
import Home from "../Home";
import AddTodo from "../AddTodo";

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
              New Lists
            </Col>
            <Col>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select">
                    <option>Select a category</option>
                    <option>Science</option>
                    <option>Sports</option>
                    <option>Java</option>
                    <option>Python</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Home />
          <AddTodo />
        </Container>
      </section>
    </div>
  );
}

export default App;
