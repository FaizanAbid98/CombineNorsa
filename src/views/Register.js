import React from "react";

// react-bootstrap components
import {
  Button,
  Form,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import checkUser from "services/auth";
import { getUserData } from "services/register";
import { deleteUser } from "services/register";
import { updateUser } from "services/register";
import "../components/Dashboard.css";

function Register() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      id: "",
      email: "",
      password: "",
      isAdmin : "",
      // status: "",
    },
  ]);
  const history = useHistory();
  const [toSearch, setToSearch] = React.useState("");
  const [filterTableData, setFilterTableData] = React.useState([]);

  useEffect(() => {
    if (!checkUser()) {
      history.push("/login");
      return;
    }
    setFilterTableData([]);
    getUserData()
      .then(function (response) {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let tempTable = [];
    tableData.map((item, index) => {
      if (item?.email?.includes(toSearch)) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);

  // const toggleStatus = (index) => {
  //   let tempTable = [...tableData];
  //   tempTable[index].status = !tempTable[index].status;
  //   updateUser(tempTable[index])
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   setTableData(tempTable);
  // };

  const deleteRow = (itemToDelete) => {
    deleteUser(tableData[itemToDelete].id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTableData(tableData.filter((item, index) => index !== itemToDelete));
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3" className="heading">
                  Usuarionan
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div className="top-btn-wrapper">
                  <Button
                    className="btn-fill res-size"
                    type="submit"
                    style={{
                      backgroundColor: "#3AAB7B",
                      border: "none",
                    }}
                    onClick={() => history.push("/admin/addregister")}
                  >
                    ADD
                  </Button>
                  {/* <Button
                    className="btn-fill res-size"
                    type="submit"
                    variant="info"
                    style={{
                      border: "none",
                    }}
                    onClick={() => {
                      setTableData(
                        tableData.map((item) => {
                          if (item.Checked === true) {
                            item.status = true;
                            updateUser(item)
                              .then(function (response) {
                                console.log(response);
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                            item.Checked = false;
                          }
                          return item;
                        })
                      );
                    }}
                  >
                    Active
                  </Button>
                  <Button
                    className="btn-fill res-size"
                    type="submit"
                    variant="danger"
                    style={{
                      border: "none",
                    }}
                    onClick={() => {
                      setTableData(
                        tableData.map((item) => {
                          if (item.Checked === true) {
                            item.status = false;
                            updateUser(item)
                              .then(function (response) {
                                console.log(response);
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                            item.Checked = false;
                          }
                          return item;
                        })
                      );
                    }}
                  >
                    Block
                  </Button> */}
                </div>
                <Col sm="12" md="4">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="mt-4"
                      placeholder="Search"
                      onChange={(e) => setToSearch(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Table className="table-hover" responsive>
                  <thead>
                    <tr>
                      <th className="border-0"> st </th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Role</th>
                      {/* <th className="border-0">Status</th> */}
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((item, index) => {
                      if (filterTableData?.includes(item)) {
                        return;
                      }
                      return (
                        <tr key={index}>
                          <td>
                            <Form.Control
                              placeholder="Fax"
                              type="checkbox"
                              checked={item.Checked}
                              onChange={() => {
                                let temp = [...tableData];
                                temp[index].Checked = !temp[index].Checked;
                                setTableData(temp);
                              }}
                              style={{ width: "16px" }}
                            ></Form.Control>
                          </td>
                          <td> {item.email} </td>
                          <td> {item.isAdmin == 0 ? 'Admin' : 'Employee'} </td>
                          {/* <td>
                            {item.status ? (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-toggle-on"
                                  style={{
                                    color: "green",
                                    textAlign: "center",
                                  }}
                                />
                              </Button>
                            ) : (
                              <Button onClick={() => toggleStatus(index)}>
                                <i
                                  className="fa fa-ban"
                                  style={{ color: "red", textAlign: "center" }}
                                />
                              </Button>
                            )}
                          </td> */}
                          <td>
                            {/* <i
                              className="fa fa-edit"
                              style={{ color: "green"  , cursor:"pointer"}}
                              onClick={() =>
                                history.push("/admin/addregister/?id=" + item.id)
                              }
                            /> */}

                            <i
                              className="fa fa-trash red ml-3"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete?'))
                                  deleteRow(index);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
