import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { getGroupsSingleData } from "services/groups";
import { updateGroups } from "services/groups";
import getGroupsData from "services/groups";
import { addGroupsData } from "services/groups";
import _uniqueId from "lodash/uniqueId";
import "../components/Dashboard.css";
import { getActiveClientList } from "services/client";

function addGroups() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"));
  const [dealers, setDealers] = React.useState([]);

  const [formData, setFormData] = React.useState({
    id: "",
    Code: "",
    Client_id: "",
  });

  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setFormData({ ...formData, ["id"]: uniqueID });
    }
    getActiveClientList().
      then(function (response) {
        console.log(response.data)
        response.data.unshift({})
        setDealers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    if (ClientID == null) return;
    getGroupsSingleData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data);
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });
  }, [ClientID]);
  const { id, Code, Client_id } = formData;

  const validateInput = (name, value) => {
    if (name === "nameNumber" || name === "batteryStatus") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }

    return true;
  };

  const handleInputChange = (e) => {
    if (e.target.name == "status") {
      setFormData({ ...formData, [e.target.name]: !status });
      return;
    }

    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ClientID) {
      updateGroups(formData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      addGroupsData(formData)
        .then(function (response) {
          console.log(response, "data");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    history.push("/admin/groups");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h3" className="text-center m-3 heading">
                  Groups
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label className="requiredelement">Group Code</label>
                        <Form.Control
                          required
                          placeholder="Group Code"
                          type="text"
                          value={Code}
                          name="Code"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label className="requiredelement">
                          Si e Kontesta ta si, serka ken?
                        </label>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          value={Client_id}
                          name="Client_id"
                          onChange={(e) => {
                            console.log(e);
                            console.log("e.target.value", e.target.value);
                            handleInputChange(e);
                          }}
                        >
                          {dealers.map((item, index) => {
                            if (index == 0) {
                              return (
                                <option value={item.id}>
                                  {" "}
                                  Dealers : {item.Code}
                                </option>
                              );
                            }
                            return (
                              <option value={item.id}> {item.Code}</option>
                            );
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="text-center">
                    <Col md="12">
                      <div className="button-wrapper">
                        <Button
                          className="btn-fill res-size"
                          type="submit"
                          style={{
                            backgroundColor: "#3AAB7B",
                            border: "none",
                          }}
                        >
                          Save
                        </Button>
                        <Link to="/admin/groups">
                          <Button
                            className="btn-fill res-size"
                            variant="danger"
                            style={{
                              border: "none",
                            }}
                          >
                            Back
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default addGroups;
