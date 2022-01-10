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
import getGroupsData from "services/groups";
import { deleteGroups } from "services/groups";
import { updateGroups } from "services/groups";
import "../components/Dashboard.css";

function Groups() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      id: "",
      Code: "",
      Client_id: "",
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
    getGroupsData()
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
      if (item?.nameNumber?.includes(toSearch)) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);


  const deleteRow = (itemToDelete) => {
    deleteGroups(tableData[itemToDelete].id)
      .then(function (response) {
        console.log(response);
        setTableData(tableData.filter((item, index) => index !== itemToDelete));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3" className="heading">
                  Groups
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
                    onClick={() => history.push("/admin/addgroups")}
                  >
                    ADD
                  </Button>{" "}
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
                      <th className="border-0">Dealer</th>
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
                          <td> {item.Code} </td>
                          <td> {item.Client_id} </td>

                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={() =>
                                history.push("/admin/addgroups/?id=" + item.id)
                              }
                            />
                            &nbsp; &nbsp;
                            <i
                              onClick={() =>
                                history.push("/admin/ClientList/?id=" + item.Code)
                              }
                              className="fa fa-user action-childs"
                              style={{ color: "green", cursor: "pointer" }}
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

export default Groups;
