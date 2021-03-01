
import React, { useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip, Col, Row, Form } from 'react-bootstrap';

const AddTodo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Row className="mt-5">
      <Col></Col>
          <Col md={2} xs={6} className="ml-2" onClick={handleShow}>
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add Todo</Tooltip>}>
            <span className="d-inline-block">
              <Button variant="outline-primary" className="btn-add" style={{ pointerEvents: 'none' }}>+</Button>{' '}
            </span>
          </OverlayTrigger>
          </Col>
        </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Category:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Category" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm="2">Details:</Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Date:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="date" placeholder="date" />
            </Col>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTodo;
