import React, {useState, useContext, useRef} from "react";
import {Button, Form, Alert} from "react-bootstrap";

import {MyContext} from "../context";
import Stage2 from "./stage_2";

const Stage1 = () => {
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);
  const textInput = useRef(null);

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "Please enter a name"]);
      return false;
    } else if (value.length <= 2) {
      setError([true, "Name must be longer than 2 characters"]);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);
    if (validate) {
      setError([false, ""]);
      context.addPlayer(value);
      textInput.current.value = "";
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type={"text"}
            placeholder="Add player one"
            name={"player"}
            ref={textInput}
          />
          {error[0] ? <Alert variant={"danger"}>{error[1]}</Alert> : null}
          <Button className="miami" variant="primary" type="submit">
            Add player
          </Button>
          {context.state.players.length > 0 ? (
            <>
              <hr />
              <div>
                <ul className="list-group">
                  {context.state.players.map((player, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                    >
                      {player}
                      <span
                        className="badge badge-danger"
                        onClick={() => {
                          context.deletePlayer(player);
                        }}
                      >
                        X
                      </span>
                    </li>
                  ))}
                </ul>
                <div
                  className="action_button"
                  onClick={() => {
                    context.next();
                  }}
                >
                  NEXT
                </div>
              </div>
            </>
          ) : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default Stage1;
