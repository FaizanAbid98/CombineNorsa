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
import { useHistory, Link } from 'react-router-dom';
import getMerchantTypeList from "services/merchantType";

import { useEffect } from "react";
import { getMerchantData } from "services/merchant";
import { updateMerchant } from "services/merchant";
import { addMerchant } from "services/merchant";
import _uniqueId from 'lodash/uniqueId';
import "../components/Dashboard.css";


function MerchantForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState()
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [validated, setValidated] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: "", Code: "", Name: "", MerchantType_id: "", AccountNo: "", BankName: "", Email: "", address: "", phoneNumber: ""
  });
  const [merchantTypes, setMerchantTypes] = React.useState([])
  useEffect(() => {
    const params = queryParams.get("id")
    if (params != null) {
      setClientID(params)
    }
    else {
      setFormData({ ...formData, ["id"]: uniqueID })
    }
    getMerchantTypeList().
      then(function (response) {
        console.log(response.data)
        response.data.unshift({})
        setMerchantTypes(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  useEffect(() => {
    if (ClientID == null) return
    getMerchantData(ClientID)
      .then(function (response) {
        console.log(response);
        setFormData(response.data)
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });
  }, [ClientID])


  const { id, Code, Name, MerchantType_id, AccountNo, BankName, address, phoneNumber, Email } = formData


  const validateInput = (name, value) => {

    if (name === "Code"  || name == "address") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$")
      if (pattern.test(value)) {
        return true
      }
      return "No special characters"
    }
    if (name === "Name") {
      return true
    }
    if (name === "BankName") {
      let pattern = new RegExp("^[a-zA-Z ]*$")
      if (pattern.test(value)) {
        return true
      }
      return "only alphabets and spaces"
    }
    if (name === "AccountNo") {
      let pattern = new RegExp("^[0-9 ]*$")
      if (pattern.test(value)) {
        return true
      }
      return "only numbers or spaces"
    }
    if (name === "phoneNumber") {
      let pattern = new RegExp("^[0-9 +]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }
    return true
  }

  const validateEmail = (email) => {
    if (email.length < 1) return true
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    }
    return "not a valid email";
  };

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value)
    if (valid != true) {
      alert(valid)
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const valid = validateEmail(Email);
    if (valid != true) {
      alert(valid);
      return;
    }
    if (ClientID) {
      updateMerchant(formData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      addMerchant(formData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
          console.log(error.message)
        })
    }
    history.push('/admin/MerchantList')
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h3" className="text-center m-3 heading">
                  Merchant
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">Code</label>
                        <Form.Control
                          required
                          placeholder="123"
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
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">Nomber</label>
                        <Form.Control
                          required
                          placeholder="Nomber"
                          type="text"
                          value={Name}
                          name="Name"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Adres</label>
                        <Form.Control
                          required
                          placeholder="Adres"
                          type="text"
                          value={address}
                          name="address"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">Email</label>
                        <Form.Control
                          placeholder="Email"
                          type="text"
                          value={Email}
                          name="Email"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement"> Phone Number</label>
                        <Form.Control
                          required
                          placeholder="042"
                          type="text"
                          value={phoneNumber}
                          name="phoneNumber"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">
                          Kuenta di Banko
                        </label>
                        <Form.Control
                          required
                          placeholder="Kuenta di Banko"
                          type="lastName"
                          value={AccountNo}
                          name="AccountNo"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">
                          Nomber di Banko
                        </label>
                        <Form.Control
                          required
                          placeholder="Nomber di Banko"
                          type="text"
                          value={BankName}
                          name="BankName"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="12">
                      <Form.Group>
                        <label className="requiredelement">Merchant Type</label>

                        <Form.Control
                          as="select"
                          value={MerchantType_id}
                          name="MerchantType_id"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {merchantTypes.map((item) => {
                            return (
                              <option value={item.id}>{item.Title}</option>
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
                        <Link to="/admin/MerchantList">
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

export default MerchantForm;
