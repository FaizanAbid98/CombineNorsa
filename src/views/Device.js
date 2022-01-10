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
import getDeviceData from "services/device";
import { deleteDevice } from "services/device";
import { updateDevice } from "services/device";
import "../components/Dashboard.css"

function Device() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      id: "",
      nameNumber: "",
      batteryStatus: "",
      status: "",
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
    getDeviceData()
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
      if (
        item?.nameNumber?.includes(toSearch)
      ) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);

  const toggleStatus = (index) => {
    let tempTable = [...tableData];
    tempTable[index].status = !tempTable[index].status;
    updateDevice(tempTable[index])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTableData(tempTable);
  };

  const deleteRow = (itemToDelete) => {
    deleteDevice(tableData[itemToDelete].id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
      alert("Are you sure you want to delete?");
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
                  Device
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
                    onClick={() => history.push("/admin/adddevice")}
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
                            item.status = true;
                            updateDevice(item)
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
                            updateDevice(item)
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
                      <th className="border-0">Device Name</th>
                      <th className="border-0">Battery Status</th>
                      <th className="border-0">Status</th>
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
                          <td> {item.nameNumber} </td>
                          <td> {item.batteryStatus} </td>
                          <td>
                            {item.status ? (
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
                            ) : (
                                <Button onClick={() => toggleStatus(index)}
                                style={{ border: "none" }}>
                                <i
                                  className="fa fa-ban"
                                  style={{ color: "red", textAlign: "center"  , cursor:"pointer"}}
                                />
                              </Button>
                            )}
                          </td>
                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" , cursor:"pointer" }}
                              onClick={() =>
                                history.push("/admin/adddevice/?id=" + item.id)
                              }
                            />
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-trash red"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you want to delete?"
                                  )
                                )
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

export default Device;
