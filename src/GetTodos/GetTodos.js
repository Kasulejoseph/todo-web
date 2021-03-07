import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Form, Col, Row } from "react-bootstrap";

import { selectAllTodos, getAllTodos, toggleTodoStatus, deleteTodoAction, selectLoadingStatus } from "../Todo/todoSlice";

const TodoList = ({ handleChange, todo, handleDelete }) => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item style={{ textDecoration: todo.status === "completed" ? 'line-through': 'none' }}>
          <Row>
            <Col xs={1} md={1}>
              <Form.Group controlId="formBasicCheckbox" className="mr-5">
                <Form.Check
                  type="checkbox"
                  onChange={handleChange}
                  name={todo.id}
                  value={todo.status}
                  checked={todo.status === 'completed' ? true: false }
                />
              </Form.Group>
            </Col>
            <Col xs={9} md={10}>
              <div className="ml-5">{todo.description}</div>
            </Col>
            <Col>
              <div name={todo.id} onClick={(e) => handleDelete(e, todo.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                color="red"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
                name={todo.id}
              >
                <path name={todo.id} d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
              </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export const GetAllTodos = () => {
  const todos = useSelector(selectAllTodos);
  const isLoading = useSelector(selectLoadingStatus)
  const dispatch = useDispatch();
  // const [inputs, setInputs] = useState(INITIAL_STATE)

  const handleChange = async (event) => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const status = value ? 'completed': 'pending';
    await dispatch(toggleTodoStatus(target.name, status));
    await dispatch(getAllTodos("")); 
  };

  const handleDelete = async (event, id) => {
    event.persist();
    await dispatch(deleteTodoAction(id));
    await dispatch(getAllTodos(""));  

  }

  React.useEffect(() => {
    dispatch(getAllTodos(""));
    return () => {
      dispatch(getAllTodos(""));
    };
  }, [dispatch]);

  return (
    <>
      {todos.length
        ? todos.map((todo) => (
            <div key={todo.id}>
              <TodoList handleChange={handleChange} todo={todo} handleDelete={handleDelete} />
            </div>
          ))
        : null}
        <div>
          {!isLoading && !todos.length && <p>No Todo(s) Yet</p>}
          {isLoading && <p>Loading</p>}
        </div>
    </>
  );
};
