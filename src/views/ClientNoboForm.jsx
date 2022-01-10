import React from "react";
import PropTypes from "prop-types";
// react-bootstrap components
import { Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col, } from "react-bootstrap";
import "./clientForm.css";
import "../components/Dashboard.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import _uniqueId from "lodash/uniqueId";
import addClient from "../services/noboClient";
import { getActiveClientList } from "../services/noboClient";
import { getNextNK_Id } from "../services/noboClient";
import { addClientImage } from "../services/noboClient";
import { addBankStatement } from "../services/noboClient";
import { addSalarySlips } from "../services/noboClient";

function ClientNoboForm(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const [ClientID, setClientID] = React.useState();
  const [validated, setValidated] = React.useState(false);
  const [uniqueID] = React.useState(_uniqueId("prefix-"));
  const [dealers, setDealers] = React.useState([]);
  const [file, setFile] = React.useState();
  const [fuentediEntrada, setFuentediEntrada] = React.useState(null);
  const [salarySlips, setSalarySlips] = React.useState(null)
  const [bankStatements, setBankStatements] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Options State Management
  const [workNoOption, setWorkNoOption] = React.useState("+5999");
  const [contactNoOption, setContactNoOption] = React.useState("+5999");
  const [phoneNumberOption, setPhoneNumberOption] = React.useState("+5999");
  // Form State Management
  const [formData, setFormData] = React.useState({
    id: null, Date: "2021-01-01", Code: "", FirstName: "", LastName: "", address: "", idCard: "", WorkNo: "", ContactNo: "", WorksAt: "",
    Email: "", FaxNumber: "", Status: 2, MaxBorrowAmount: "", Dealer_id: "", SourceOfIncome: "", ExpiryDate: "", RecievedCreditInPast: false,
    Partner: false, Children: false, ChildrenCount: "", phoneNumber: "", NameOfPartner : "", Housing: "0"
  });
  const {
    id, Code, FirstName, LastName, idCard, WorkNo, ContactNo, WorksAt, Email, address, FaxNumber, Status, MaxBorrowAmount, Dealer_id,
    SourceOfIncome, RecievedCreditInPast, Partner, Children, ChildrenCount, phoneNumber, Date, ExpiryDate, NameOfPartner, Housing
  } = formData;
  const [fileForm, setFileForm] = React.useState({ id: _uniqueId("prefix-"), filePath: "", Client_id: "" });
  const { children, value, index, ...other } = props;
  useEffect(() => {
    // Next Form ID Api Calling
    getNextNK_Id().then(function (response) {
      console.log(response);
      setFormData({ ...formData, ["id"]: response.data.id, ["Code"]: response.data.id });
    }).catch(function (error) {
      console.log(error);
    });
    // Get Active Client Api Calling
    getActiveClientList().then(function (response) {
      console.log(response.data);
      response.data.unshift({});
      setDealers(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);
  // Validate Form Input Data
  const validateInput = (name, value) => {
    if (name === "Code" || name === "WorksAt") {
      let pattern = new RegExp("^[a-zA-Z 0-9_.-]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "No special characters";
    }
    if (name === "FirstName" || name === "LastName") {
      let pattern = new RegExp("^[a-zA-Z ]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only alphabets and spaces";
    }
    if (name === "WorkNo" || name === "FaxNumber" || name === "ContactNo" || name === "ChildrenCount" || name === "phoneNumber" || name == "idCard") {
      let pattern = new RegExp("^[0-9 +]*$");
      if (pattern.test(value)) {
        return true;
      }
      return "only numbers or spaces";
    }
    return true;
  };
  // Handle Form Inputs Change
  const handleInputChange = (e) => {
    if (e.target.name == "Status") {
      setFormData({ ...formData, [e.target.name]: !Status });
      return;
    }
    if (e.target.name == "RecievedCreditInPast") {
      setFormData({ ...formData, [e.target.name]: !RecievedCreditInPast });
      return;
    }
    if (e.target.name == "Partner") {
      setFormData({ ...formData, [e.target.name]: !Partner });
      return;
    }
    if (e.target.name == "NameOfPartner") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      return;
    }
    if ( e.target.name == "Children" ) {
      setFormData({ ...formData, [e.target.name]: !Children });
      return;
    }
    if ( e.target.name == "Housing" ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      return;
    }
    const valid = validateInput(e.target.name, e.target.value);
    if (valid != true) {
      alert(valid);
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Validate Email Method
  const validateEmail = (email) => {
    if (email.length < 1) return true;
    let pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pattern.test(email)) {
      return true;
    }
    return "not a valid email";
  };
  // Image Submit Method
  const handleFileSubmit = () => {

    const data = new FormData();
    data.append("file", file);
    data.append("id", uniqueID);
    data.append("Client_id", formData.id);
    return addClientImage(data);
  };
  const handleSalarySlipSubmit = (e) => {
    return addSalarySlips(salarySlips);
  };
  const handleBankStatementSubmit = () => {
    return addBankStatement(bankStatements);
  };
  // Form Submit Method
  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = validateEmail(Email);
    if (valid != true) {
      alert(valid);
      return;
    }
    setIsLoading(true)
    let fData = { ...formData };
    fData.WorkNo = workNoOption.trim() + " " + fData.WorkNo.trim();
    fData.ContactNo = contactNoOption.trim() + " " + fData.ContactNo.trim();
    addClient(fData).then(function (response) {
      handleFileSubmit().then(function (respons) {
        handleSalarySlipSubmit().then(function (repon) {
          handleBankStatementSubmit().then(function (respo) {
            alert("Danki! bo formulario a wordu entrega. \n Nos lo tuma kontakto kubo si nos nester di mas informashon");
            window.location.reload(false);
          }).catch(function (error) {
          })
        }).catch(function (err) {
        })
      }).catch(function (error) {

      })
    }).catch(function (err) {
      console.log(err);
    });
  };
  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files.length == 0) return
    if (e.target.name == "profilePicture") {
      setFile(e.target.files[0]);
    }
    else {
      if (e.target.files.length != 2) {
        alert("Select 2 files only")
        return;
      }
      const data = new FormData();
      data.append("id", uniqueID);
      data.append("file1", e.target.files[0]);
      data.append("file2", e.target.files[1]);
      data.append("Client_id", id);
      if (e.target.name == "salarySlips") {
        setSalarySlips(data)
      }
      else {
        setBankStatements(data)
      }
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md="8" className="main-container">
            <Card className="form-wrapper mt-4" style={{ border: "none" }}>
            <Card.Header style={{ backgroundColor: "#F7F7F8" }}></Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} style={{ border: "none" }}>
                  {/*<Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Date</label>
                        <Form.Control required placeholder="123" type="date" value={Date} name="Date" onChange={(e) => handleInputChange(e)}></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row className="padding-class">
                    {/* Code Field */}
                    <Col sm="12" lg="2">
                      <Form.Group>
                        <label className="requiredelement">Code</label>
                        <Form.Control required placeholder="123" type="text" size="lg" value={Code} disabled name="Code" style={{ padding: "20px 10px", fontSize: "14px" }}></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* First Name Field */}
                    <Col sm="12" md="6" lg="5">
                      <Form.Group>
                        <label className="requiredelement">Nomber</label>
                        <Form.Control
                          required placeholder="Frank" style={{ padding: "20px 10px", fontSize: "14px" }}
                          type="text" value={FirstName} name="FirstName" className="placeholder-Class" onChange={(e) => handleInputChange(e)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Last Name Field */}
                    <Col sm="12" md="6" lg="5">
                      <Form.Group>
                        <label htmlFor="exampleLastName" className="requiredelement">Fam</label>
                        <Form.Control required placeholder="Semper" type="text" value={LastName} name="LastName" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Address Field */}
                  <Row className="padding-class">
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Adres</label>
                        <Form.Control required placeholder="Adres" type="text" value={address} name="address" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    {/* ID Card Field */}
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">Sedula</label>
                        <Form.Control required placeholder="" type="text" value={idCard} name="idCard"
                          onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Expiry Date Field */}
                    <Col sm="12" md="6">
                      <Form.Group>
                        <label className="requiredelement">Fecha di Vensementu</label>
                        <Form.Control required placeholder="123" type="date" value={ExpiryDate} name="ExpiryDate"
                          onChange={(e) => handleInputChange(e)} style={{ fontSize: "14px", padding: "20px 10px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    {/* Contact Number Option Field */}
                    <Col sm="12" md="6" lg="4">
                      <Form.Group>
                        <label className="requiredelement"> Celullar</label>
                        <Form.Control
                          as="select" defaultValue="" required value={contactNoOption} name="contactNoOption"
                          onChange={(e) => { setContactNoOption(e.target.value) }} style={{ fontSize: "14px", height: "41px" }}
                        >
                          <option value={"+5999"}> +5999</option>
                          <option value={"+599"}> +599</option>
                          <option value={"+297"}> +297</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Contact Number Field */}
                    <Col sm="12" md="6" lg="8">
                      <Form.Group>
                        <label> &nbsp;</label>
                        <Form.Control required placeholder="042" type="text" value={ContactNo} name="ContactNo" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ fontSize: "14px", height: "41px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    {/* Work Number Option Field */}
                    <Col sm="12" md="6" lg="4">
                      <Form.Group>
                        <label>Telefon</label>
                        <Form.Control
                          as="select" defaultValue="" required value={workNoOption} name="workNoOption"
                          onChange={(e) => { setWorkNoOption(e.target.value) }} style={{ fontSize: "14px", height: "41px" }}
                        >
                          <option value={"+5999"}> +5999</option>
                          <option value={"+599"}> +599</option>
                          <option value={"+297"}> +297</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Work Number Field */}
                    <Col sm="12" md="6" lg="8">
                      <Form.Group>
                        <label>&nbsp;</label>
                        <Form.Control
                          placeholder="00-0000-00" type="text" value={WorkNo} name="WorkNo" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ fontSize: "14px", height: "41px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Email Field */}
                  <Row className="padding-class">
                    <Col sm="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          placeholder="Email" type="text" value={Email} name="Email" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Fuentedi Entrada Field */}
                  <Row className="padding-class-new">
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Fuente di Entrada</label>
                        <Form.Control
                          as="select" defaultValue="" value={fuentediEntrada} name="fuentediEntrada"
                          onChange={(e) => { setFuentediEntrada(e.target.value) }} style={{ fontSize: "14px", height: "41px" }}
                        >
                          <option></option>
                          <option value={1}> Trabou </option>
                          <option value={2}> Penshonado </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Works At Field */}
                  {fuentediEntrada == 1 ? (
                    <Row className="padding-class">
                      <Col sm="12">
                        <Form.Group>
                          <label className="requiredelement">Ta Emplea Na</label>
                          <Form.Control
                            required placeholder="Ta traha na" type="text" value={WorksAt} name="WorksAt" className="placeholder-Class"
                            onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  ) : null}
                  {/* Source Of Income Field */}
                  {fuentediEntrada == 2 ? (
                    <Row className="padding-class-new">
                      <Col sm="12">
                        <Form.Group>
                          <label className="requiredelement">Si bo no ta emplea, kiko ta bo medio di entrada ?</label>
                          <Form.Control
                            as="textarea" required placeholder="" value={SourceOfIncome} name="SourceOfIncome"
                            onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  ) : null}
                  {/* Partner Field */}
                  <Row>
                    <Col xs="6" sm="6" lg="6">
                      <label className="mr-5 requiredelement">Kasa/Partner</label>
                    </Col>
                    <Col xs="6" sm="6" lg="6">
                      <Form.Check
                        inline label="Si" name="group1" type="Radio" className="radio-btn mt-1 " name="Partner" checked={Partner}
                        onClick={(e) => { handleInputChange(e) }}
                      />
                      &nbsp; &nbsp;
                      <Form.Check
                        inline label="No" name="group1" type="Radio" className="radio-btn mt-1" name="Partner" checked={!Partner}
                        onClick={(e) => { handleInputChange(e) }}
                      />
                    </Col>
                  </Row>
                  {/* Number Of Partners Field */}
                  <Row className="padding-class">
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Nomber di Kasa/Prtn</label>
                        <Form.Control
                          required placeholder="Nomber di Kasa/Ptrn" type="text" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ padding: "20px 10px", fontSize: "14px" }}
                          value={NameOfPartner}
                          name="NameOfPartner"
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={ { alignItems: "center" } }>
                    {/* Children Field */}
                    <Col xs="6" sm="6" lg="2">
                      <label className="mr-5 requiredelement">Yu</label>
                    </Col>
                    <Col xs="6" sm="6" lg="4">
                      <Form.Check
                        inline label="Si" type="Radio" className="radio-btn mt-1 " name="Children" checked={ Children }
                        onClick={(e) => { handleInputChange(e) }}
                      />
                      &nbsp; &nbsp;
                      <Form.Check
                        inline label="No" type="Radio" className="radio-btn mt-1" name="Children" checked={ !Children }
                        onClick={(e) => { handleInputChange(e) }}
                      />
                    </Col>
                    {/* Number Of Children Field */}
                    { Children ?
                      <>  
                        <Col sm="12" lg="2">
                          <label className="requiredelement">Kantidat</label>
                        </Col>
                        <Col lg="4">
                          <Form.Group>
                            <Form.Control
                              required placeholder="Kantidat" type="text" value={ChildrenCount} name="ChildrenCount" className="placeholder-Class"
                              onChange={(e) => handleInputChange(e)} style={{ fontSize: "14px", height: "41px" }}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                          </Form.Group>
                        </Col> 
                      </>
                    : "" }
                  </Row>
                  {/* Housing Field */}
                  <Row className="padding-class" style={{marginTop:"5px"}}>
                    <Col sm="12" lg="12">
                      <label className="mr-5 requiredelement">Bibienda</label>
                      <br />
                      <Form.Check
                        inline label="Kas propio" name="group1" type="Radio" className="radio-btn mt-1 " value="0"
                        name="Housing"
                        checked={ Housing === "0" ? true : false }
                        onClick={(e) => { handleInputChange(e) }}
                      />
                      &nbsp; &nbsp;
                      <Form.Check
                        inline label="Hur" name="group1" type="Radio" className="radio-btn mt-1" value="1"
                        name="Housing"
                        checked={ Housing === "1" ? true : false }
                        onClick={(e) => { handleInputChange(e) }}
                      />
                      &nbsp; &nbsp;
                      <Form.Check
                        inline label="Serka Mayor" name="group1" type="Radio" className="radio-btn mt-1" value="2"
                        name="Housing"
                        checked={ Housing === "2" ? true : false }
                        onClick={(e) => { handleInputChange(e) }}
                      />
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    {/* Phone Number Code Field */}
                    <Col sm="12" md="6" lg="4">
                      <Form.Group>
                        <label>Tel Trabou</label>
                        <Form.Control
                          as="select" defaultValue="" required value={phoneNumberOption} name="phoneNumberCode"
                          onChange={(e) => { setPhoneNumberOption(e.target.value) }} style={{ fontSize: "14px", height: "41px" }}
                        >
                          <option value={"+5999"}>  +5999  </option>
                          <option value={"+599"}>   +599   </option>
                          <option value={"+297"}>   +297   </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    {/* Phone Number Field */}
                    <Col sm="12" md="6" lg="8">
                      <Form.Group>
                        <label>&nbsp;</label>
                        <Form.Control
                          placeholder="00-0000-00" type="text" value={phoneNumber} name="phoneNumber" className="placeholder-Class"
                          onChange={(e) => handleInputChange(e)} style={{ fontSize: "14px", height: "41px" }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Recieved Credit In Past Field */}
                  <Row className="padding-class">
                    <Col sm="12" lg="12">
                      <label className="mr-5 requiredelement">A yega di tuma bon den pasado kaba?</label>
                      <br />
                      <Form.Check
                        inline label="Si" name="group1" type="Radio" className="radio-btn mt-1 " name="RecievedCreditInPast"
                        checked={RecievedCreditInPast} onClick={(e) => { handleInputChange(e) }}
                      />
                      &nbsp; &nbsp;
                      <Form.Check
                        inline label="No" name="group1" type="Radio" className="radio-btn mt-1" name="RecievedCreditInPast"
                        checked={!RecievedCreditInPast} onClick={(e) => { handleInputChange(e) }}
                      />
                    </Col>
                  </Row>
                  {/* Dealer Id Field */}
                  { RecievedCreditInPast ?
                    <Row className="padding-class-new">
                      <Col sm="12">
                        <Form.Group>
                          <label className="requiredelement">
                            Si e Kontesta ta si, serka ken?
                          </label>
                          <Form.Control
                            as="select" defaultValue="" placeholder="select dealer" name="Dealer_id" value={Dealer_id}
                            onChange={(e) => { handleInputChange(e) }} style={{ fontSize: "14px", height: "41px" }}
                          >
                            {dealers?.map((item, index) => {
                              if (index == 0) {
                                return <option value={item.id}>Dealers : {item.Code}</option>
                              }
                              return <option value={item.id}> {item.Code}</option>
                            })}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row> : "" }
                  {/* Upload Image Field */}
                  <Row>
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Porfabor agrega un potret di bo Sedula</label>
                        <Form.Control
                          required type="file" name="profilePicture" accept="image/*"
                          onChange={(e) => { handleFileChange(e) }}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {file ?
                    <Row className="padding-class">
                      <Col sm="12">
                        <img src={URL.createObjectURL(file)} className="profilePic" />
                      </Col>
                    </Row> : ""}
                  <Row className="padding-class">
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">
                          Ultimo 2 slep nan di salario di trabou
                        </label>
                        <Form.Control
                          required type="file" multiple name="salarySlips" accept="application/pdf"
                          onChange={(e) => { handleFileChange(e) }}
                         
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="padding-class">
                    <Col sm="12">
                      <Form.Group>
                        <label className="requiredelement">Ultimo 2 statement di kuenta bankario</label>
                        <Form.Control
                          required type="file" multiple name="bankStatements" accept="application/pdf"
                          onChange={(e) => { handleFileChange(e) }}
                         
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">Please provide a value.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="text-center mt-2">
                    <Col sm="12">
                      <div className="button-wrapper">
                        <Button className="add-btn res-size" type="submit" disabled={isLoading}>
                          {isLoading ? <div> <i class="fa fa-spinner" aria-hidden="true">&nbsp;</i> Saving...</div> : <div>Save</div>}
                        </Button>
                        <Link to="/admin/ClientList">
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
                        {/* <Link to="#">
                          <Button className="delete-btn res-size">Back</Button>
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

export default ClientNoboForm;

ClientNoboForm.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
