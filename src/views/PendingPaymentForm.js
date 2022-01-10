import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import "../components/Dashboard.css"

function PendingPaymentForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    DateTime: "",
    Amount: "",
    PaybackPeriod: "",
    TypeOfPayment: "",
    DateDeposit: null,
    Client_id: "",
    NfcCard_id: "",
    Merchants_id: "",
    id: "",
    Status: false,
  });
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setClientID(null);
    }
  }, []);

  useEffect(() => {
    if (ClientID != null) {
      // get client data
      const response = null;
      // setFormData(response)
    }
  }, [ClientID]);
  const {
    DateTime,
    Amount,
    PaybackPeriod,
    TypeOfPayment,
    DateDeposit,
    Client_id,
    NfcCard_id,
    Merchants_id,
    id,
  } = formData;
  const validateInput = (name, value) => {
    if (name === "AmountPaid") {
      let pattern = new RegExp("^[0-9]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers";
    }
    return true;
  };

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    history.push("/admin/PendingPaymentList");
    alert("i am submitted");
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h4" className="text-center m-3 heading">
                  Pending Payment
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label className="requiredelement">Title</label>
                        <Form.Control
                          required
                          placeholder="abcd"
                          type="text"
                          value={Title}
                          name="Title"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="text-center mt-2">
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
                        {/* <Link to="/admin/????">
                        <Button className="btn-fill res-size" variant="danger" style={{
                      border: "none",
                    }}>
                          Back
                        </Button>
                      </Link> */}
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

export default PendingPaymentForm;
