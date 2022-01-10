import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Form,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import checkUser from "services/auth";
import { login } from "services/auth";
import getClientList from "services/client";
import { deleteClient } from "services/client";
import { updateClient } from "services/client";
import "../components/Dashboard.css";
import { deleteClientImage } from "services/client";
import { deleteClientBankStatement } from "services/client";
import { deleteClientSalarySlips } from "services/client";

function ClientList() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      id: "",
      Code: "",
      FirstName: "",
      Dealer_id: "",
      LastName: "",
      WorkNo: "",
      ContactNo: "",
      WorksAt: "",
      Email: "",
      FaxNumber: "",
      Status: 0,
      MaxBorrowAmount: "",
      Dealer_id: "",
    },
  ]);
  const history = useHistory();
  const [toSearch, setToSearch] = React.useState("");
  const [filterTableData, setFilterTableData] = React.useState([]);
  const [newTableData, setNewTableData] = React.useState([]); //filterd data on basis of status

  useEffect(() => {
    if (!checkUser()) {
      history.push("/login");
      return;
    }
    setFilterTableData([]);
    getClientList()
      .then(function (response) {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // setTableData([{
    //   Checked: false,
    //   Code: "1", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "2", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "3", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "4", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "5", FirstName: "shaffan", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },
    // {
    //   Checked: false,
    //   Code: "6", FirstName: "anas", LastName: "nasir", WorkNo: "none", ContactNo: "0332", WorksAt: "Fast", Email: "shaffan@gmail.com",
    //   FaxNumber: "None", Fax: "None", Status: false, MaxBorrowAmount: "100", Dealer_id: "1",
    // },])
  }, []);

  useEffect(() => {
    let tempTable = [];
    tableData.map((item, index) => {
      if (
        item.LastName.includes(toSearch) ||
        item.FirstName.includes(toSearch) ||
        item.Email.includes(toSearch) ||
        item.Code.includes(toSearch) ||
        item.Dealer_id.includes(toSearch)
      ) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);

  const toggleStatus = (index) => {
    let tempTable = [...tableData];

    tempTable[index].Status =
      tempTable.Status == 2 ? 1 : !tempTable[index].Status;
    updateClient(tempTable[index])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTableData(tempTable);
  };

  function sortHandler(a, b) {
    if (a.FirstName < b.FirstName) {
      return -1;
    }
    if (a.FirstName > b.FirstName) {
      return 1;
    }
    return 0;
  }

  const sortedArrayData = tableData;
  sortedArrayData.sort(sortHandler);

  // filtering data on basis of status
  // useEffect(() => {
  //   var newData = tableData?.filter((pendingData) => {
  //     if (pendingData.Status === 1) {
  //       return pendingData;
  //     }
  //   });
  //   // newData.sort(sortHandler)
  //   setFilterTableData([...filterTableData,newData]);
  //   console.log(newData, "pending Data");
  // }, [tableData]);

  const deleteRow = (itemToDelete) => {
    deleteClientBankStatement(tableData[itemToDelete].id).then(function (response) {
      deleteClientSalarySlips(tableData[itemToDelete].id).then(function (response) {
        deleteClientImage(tableData[itemToDelete].id)
          .then(function (response) {
            deleteClient(tableData[itemToDelete].id)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
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
                  LISTA di Kliente
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
                    onClick={() => history.push("/admin/ClientForm")}
                  >
                    ADD
                  </Button>
                  <Button
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
                            item.Status = true;
                            updateClient(item)
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
                            item.Status = false;
                            updateClient(item)
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
                  </Button>
                  <Button
                    className="btn-fill res-size"
                    type="submit"
                    style={{
                      backgroundColor: "#22577E",
                      border: "none",
                    }}
                    onClick={() => history.push("/admin/pendingClientList")}
                  >
                    New Clients
                  </Button>
                </div>
                <Col md="4">
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
                      <th className="border-0">Code</th>
                      <th className="border-0">Nomber</th>
                      <th className="border-0">Fam</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Celullar</th>
                      <th className="border-0">Ta taraha na</th>
                      <th className="border-0">Dealer</th>
                      <th className="border-0">Kredito Maksimo</th>
                      <th className="border-0">Status</th>
                      {/* <th className="border-0">Issuance History</th> */}
                      {/* <th className="border-0">Pending Payment</th> */}
                      <th
                        className="border-0"
                      // style={{ width: "350px"}}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      if (filterTableData.includes(item)) {
                        return;
                      }
                      if (item.Status != 1) {
                        return
                      }
                      return (
                        <tr
                          key={index}
                          style={
                            item.Status == 2
                              ? { backgroundColor: "#7FB5A2" }
                              : null
                          }
                        >
                          <td>
                            {" "}
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
                          <td> {item.Code} </td>
                          <td> {item.FirstName} </td>
                          <td> {item.LastName} </td>
                          <td> {item.Email} </td>
                          <td> {item.ContactNo} </td>
                          <td> {item.WorksAt} </td>
                          <td> {item.Dealer_id} </td>
                          <td> {item.MaxBorrowAmount} </td>
                          <td>
                            {" "}
                            {item.Status == 1 ? (
                              <Button
                                onClick={() => toggleStatus(index)}
                                style={{ border: "none" }}
                              >
                                <i
                                  className="fa fa-toggle-on"
                                  style={{
                                    color: "green",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                />
                              </Button>
                            ) : item.Status == 2 ? (
                              <Button
                                onClick={() => toggleStatus(index)}
                                style={{ border: "none" }}
                              >
                                <i
                                  className="fa fa-hourglass"
                                  style={{
                                    color: "black",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => toggleStatus(index)}
                                style={{ border: "none" }}
                              >
                                <i
                                  className="fa fa-ban"
                                  style={{
                                    color: "red",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                />
                              </Button>
                            )}
                          </td>
                          <td className="actions-styling">
                            <i
                              onClick={() =>
                                history.push(
                                  "/admin/IssuanceHistory/?id=" + item.id
                                )
                              }
                              className="nc-icon nc-notes action-childs"
                              style={{ color: "black", cursor: "pointer" }}
                            />
                            <i
                              onClick={() =>
                                history.push(
                                  "/admin/PendingPaymentList/?id=" + item.id
                                )
                              }
                              className="nc-icon nc-notes action-childs"
                              style={{ color: "black", cursor: "pointer" }}
                            />
                            <i
                              onClick={() =>
                                history.push("/admin/ClientForm/?id=" + item.id)
                              }
                              className="fa fa-edit action-childs"
                              style={{ color: "green", cursor: "pointer" }}
                            />

                            <i
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete?"
                                  )
                                )
                                  deleteRow(index);
                              }}
                              className="fa fa-trash action-childs"
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    {/* <td align="center" >
                        <i className="nc-icon nc-notes" onClick={() => alert("clicked issuance History")} />
                      </td>
                      <td align="center">
                        <i className="fa fa-edit" onClick={() => alert("clicked edit")} />
                      </td>
                    </tr> */}
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

export default ClientList;
