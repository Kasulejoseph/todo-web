import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  Col,
  Row,
  Form,
} from "react-bootstrap";

import {
  addNewTodo,
  getAllTodos,
  selectStatusMessages,
} from "../Todo/todoSlice";

const INITIAL_STATE = {
  category: "",
  description: "",
  dueDate: "",
};

export const AddTodoForm = ({
  handleShow,
  handleClose,
  show,
  handleChange,
  inputs,
  handleSubmit,
}) => (
  <>
    <Row className="mt-5">
      <ToastContainer />
      <Col></Col>
      <Col md={2} xs={6} className="ml-2" onClick={handleShow}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Add Todo Form</Tooltip>}
        >
          <span className="d-inline-block">
            <Button
              variant="outline-primary"
              className="btn-add"
              style={{ pointerEvents: "none" }}
            >
              +
            </Button>{" "}
          </span>
        </OverlayTrigger>
      </Col>
    </Row>
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextCategory">
            <Form.Label column sm="2">
              Category:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Category"
                name="category"
                value={inputs.category}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm="2">
              Details:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={inputs.description}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextDate">
            <Form.Label column sm="2">
              Date:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                placeholder="date"
                name="dueDate"
                value={inputs.dueDate}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} name="addTodo" disabled = {!inputs.category || !inputs.description || !inputs.dueDate}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export const AddTodo = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectStatus = useSelector(selectStatusMessages);

  const [inputs, setInputs] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    setInputs((inputs) => ({ ...inputs, [target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { description, category, dueDate } = inputs;
    const content = {
      category,
      description,
      dueDate,
    };
    toast("Submitted Successfully!");
    await dispatch(addNewTodo(content));
    if (selectStatus.success) {
      await dispatch(getAllTodos(""));
      handleClose();
    }
  };

  return (
    <>
      <AddTodoForm
        show={show}
        handleClose={handleClose}
        inputs={inputs}
        handleShow={handleShow}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
