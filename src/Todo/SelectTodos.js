import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { getAllTodos } from "./todoSlice";

const SelectForm = ({ input, handleChange }) => (
  <div>
    <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Control
          as="select"
          onChange={handleChange}
          name="todoCategory"
          value={input}
        >
          <option>Select a category</option>
          <option>test 3</option>
          <option>Sports</option>
          <option>Java</option>
          <option>Python</option>
        </Form.Control>
      </Form.Group>
    </Form>
  </div>
);

export const SelectTodo = () => {
  const dispatch = useDispatch();
  const [input, setInputs] = useState("");

  const handleChange = (event) => {
    event.persist();
    const target = event.target;
    setInputs(target.value);
    dispatch(getAllTodos(`category=${target.value}`));
  };
  return (
    <>
      <SelectForm input={input} handleChange={handleChange} />
    </>
  );
};
