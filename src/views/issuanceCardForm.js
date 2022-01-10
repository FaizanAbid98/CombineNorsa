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
import getClientList from "services/client";
import getMerchantList from "services/merchant";
import { getMerchantTypeDiscountByMerchantType_id } from "services/merchantType";
import { useEffect } from "react";
import { getMerchantData } from "services/merchant";
import { getNfcList } from "services/nfc";
import addIssuanceHistory from "services/issuanceHistory";
import _uniqueId from 'lodash/uniqueId';
import { getActiveClientList } from "services/client";
import "../components/Dashboard.css";


function IssuanceCardForm() {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [allClients, setAllClients] = React.useState([{}])
  const [allNfcCards, setAllNfcCards] = React.useState([])
  const [allMerchants, setAllMerchants] = React.useState([])
  const [uniqueID] = React.useState(_uniqueId("prefix-"))
  const [allPaybackPeriodsOfCurrentMerchant, setAllPaybackPeriodsOfCurrentMerchant] = React.useState([])
  const [formData, setFormData] = React.useState({
    DateTime: "",
    Amount: "",
    PaybackPeriod: "",
    Client_id: "",
    NfcCard_id: "",
    Merchants_id: "",
    Pincode : "",
    id: "",
  });
  const [merchantAndMonths, setmerchantAndMonths] = React.useState([])

  const {
    DateTime,
    Amount,
    PaybackPeriod,
    Client_id,
    NfcCard_id,
    Merchants_id,
    Pincode,
    id,
    status,
  } = formData;
  useEffect(() => {
    const params = queryParams.get("id");
    if (params != null) {
      setClientID(params);
    } else {
      setClientID(null);
      setFormData({ ...formData, ["id"]: uniqueID })
    }

    getMerchantList().
      then(function (response) {

        response.data.map((item) => {
          const merchant = { ...item }
          let months = []
          getMerchantTypeDiscountByMerchantType_id(item.MerchantType_id).then((res) => {
            console.log(res.data)
            months = [...res.data]
            setmerchantAndMonths([...merchantAndMonths, { merchant: merchant, months: months }])
          }).catch((err) => {
            console.log(err)
          })
        })
        console.log(response.data)
        response.data.unshift({})
        setAllMerchants(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    getActiveClientList().
      then(function (response) {
        console.log(response.data)
        response.data.unshift({})
        setAllClients(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    getNfcList()
      .then(function (response) {
        response.data.unshift({})
        setAllNfcCards(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    console.log(merchantAndMonths)
  }, [merchantAndMonths])

  useEffect(() => {
    if (Merchants_id.length < 1) return
    getMerchantData(Merchants_id)
      .then(function (response) {
        getMerchantTypeDiscountByMerchantType_id(response.data.MerchantType_id)
          .then(function (response) {
            console.log(response)
            response.data.unshift({})
            setAllPaybackPeriodsOfCurrentMerchant(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log("cannot fetch the data with an " + error);
      });

  }, [Merchants_id])

  useEffect(() => {
    if (ClientID != null) {
      // get client data
      const response = null;
      //setFormData(response)
    }
  }, [ClientID]);


  const validateInput = (name, value) => {
    if (name === "Code") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }
    if (name === "FirstName" || name === "LastName" || name === "WorksAt") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "WorkNo" || name === "FaxNumber" || name === "ContactNo") {
      let pattern = new RegExp("^[0-9 ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }
    return true;
  };

  const handleInputChange = (e) => {
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email) => {
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    }
    return "not a valid email";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    addIssuanceHistory(formData)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    history.push("/admin/ClientList");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="form-wrapper mt-4">
              <Card.Header style={{ backgroundColor: "#F7F7F8" }}>
                <Card.Title as="h4" className="text-center m-3 heading">
                  Card Issuance
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="12" md="4">
                      <Form.Group>
                        <label className="requiredelement">Pin Code</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="text"
                          value={Pincode}
                          name="Pincode"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="4">
                      <Form.Group>
                        <label className="requiredelement">Montante</label>
                        <Form.Control
                          required
                          placeholder="100"
                          type="number"
                          value={Amount}
                          name="Amount"
                          onChange={(e) => handleInputChange(e)}
                        ></Form.Control>

                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="4">
                      <Form.Group>
                        <label className="requiredelement">Date</label>
                        <Form.Control
                          required
                          placeholder="123"
                          type="date"
                          value={DateTime}
                          name="DateTime"
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
                        <label
                          htmlFor="exampleLastName"
                          className="requiredelement"
                        >
                          Client Code
                        </label>
                        <Form.Control
                          as="select"
                          value={Client_id}
                          name="Client_id"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {allClients.map((item) => {
                            return <option value={item.id}>{item.Code}</option>;
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">NFC Card ID</label>
                        <Form.Control
                          as="select"
                          value={NfcCard_id}
                          name="NfcCard_id"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {allNfcCards.map((item) => {
                            return (
                              <option value={item.id}>{item.number}</option>
                            );
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col sm="12" md="12" >
                      <div >
                        {merchantAndMonths.map((item) => {
                          return (
                            <div >
                              Merchant Name : <br />
                              <Button style={{ marginTop: "5px", marginBottom: "5px" }}>{item.merchant.Name} </Button>
                              <br /> Months : <br />
                              <div style={{ display: "flex" }}>

                                {item.months.map((itm) => {
                                  return (

                                    <Button style={{ marginRight: "10px" }}>
                                      {itm.NumberOfMonths}
                                    </Button>
                                  )
                                })}
                              </div>
                            </div>)
                        })}
                      </div>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">
                          Number Of Months
                        </label>
                        <Form.Control
                          as="select"
                          value={PaybackPeriod}
                          name="PaybackPeriod"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {allPaybackPeriodsOfCurrentMerchant.map((item) => {
                            return (
                              <option value={item.id}>
                                {item.NumberOfMonths}
                              </option>
                            );
                          })}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide a value.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">
                          Merchant Details
                        </label>

                        <Form.Control
                          as="select"
                          value={Merchants_id}
                          name="Merchants_id"
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        >
                          {allMerchants.map((item) => {
                            return <option value={item.id}>{item.Name}</option>;
                          })}
                        </Form.Control>

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
                          <Button className="btn-fill res-size" variant="danger">
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

export default IssuanceCardForm;
