import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { getDeviceSingleData } from "services/device";
import "../components/Dashboard.css";
import { updateDevice } from "services/device";
import getDeviceData from "services/device";
import { addDeviceData } from "services/device";
import _uniqueId from "lodash/uniqueId";

function addDevice() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState(null);
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"));
  const [dealers, setDealers] = React.useState([]);

  const [formData, setFormData] = React.useState({
    id: "",
    nameNumber: "",
    batteryStatus: "",
    status: 0,
  });
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setFormData({ ...formData, ["id"]: uniqueID });
    }
    getDeviceData()
      .then(function (response) {
        console.log(response.data);
        setDealers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (ClientID == null) return;
    getDeviceSingleData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data);
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });
  }, [ClientID]);
  const { id, nameNumber, batteryStatus ,  status } = formData;

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
      updateDevice(formData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      addDeviceData(formData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    history.push("/admin/device");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h3" className="text-center m-3 heading">
                  Device
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label className="requiredelement">Device Name</label>
                        <Form.Control
                          required
                          placeholder="Device Name"
                          type="text"
                          value={nameNumber}
                          name="nameNumber"
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
                          Battery Status
                        </label>
                        <Form.Control
                          required
                          placeholder="Battery Status"
                          type="text"
                          value={batteryStatus}
                          name="batteryStatus"
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
                      <div className="radio-wrapper">
                        <label className="mt-1 requiredelement">Status</label>
                        <Form.Check
                          inline
                          label="Active"
                          name="group1"
                          type="Radio"
                          name="status"
                          checked={status}
                          onClick={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </div>
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
                        <Link to="/admin/device">
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

export default addDevice;
