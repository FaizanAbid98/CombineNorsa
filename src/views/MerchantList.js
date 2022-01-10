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
import getMerchantList from "services/merchant";
import { deleteMerchant } from "services/merchant";
import "../components/Dashboard.css";

function MerchantList() {
  const [tableData, setTableData] = React.useState([
    {
      Checked: false,
      id: "",
      Code: "",
      Name: "",
      AccountNo: "",
      BankName: "",
      Status: false,
    },
  ]);
  const history = useHistory();
  const [status, setStatus] = React.useState(false);
  const [toSearch, setToSearch] = React.useState("");
  const [filterTableData, setFilterTableData] = React.useState([]);
  useEffect(() => {
    setFilterTableData([]);
    getMerchantList().
      then(function (response) {
        console.log(response.data)
        setTableData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    // setTableData([
    //   {
    //     Checked: false,
    //     Code: "1",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    //   {
    //     Checked: false,
    //     Code: "2",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    //   {
    //     Checked: false,
    //     Code: "3",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    //   {
    //     Checked: false,
    //     Code: "4",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    //   {
    //     Checked: false,
    //     Code: "5",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    //   {
    //     Checked: false,
    //     Code: "6",
    //     Name: "shaffan",
    //     AccountNo: "nasir",
    //     BankName: "none",
    //     Status: false,
    //   },
    // ]);
  }, []);

  
  function sortHandler(a, b) {
    if (a.Name < b.Name) {
      return -1;
    }
    if (a.Name > b.Name) {
      return 1;
    }
    return 0;
  }

  const sortedArrayData = tableData;
  sortedArrayData.sort(sortHandler);


  useEffect(() => {
    let tempTable = [];
    tableData.map((item, index) => {
      if (
        item.Code.includes(toSearch) ||
        item.AccountNo.includes(toSearch) ||
        item.BankName.includes(toSearch) ||
        item.Name.includes(toSearch)
      ) {
      } else {
        tempTable.push(item);
      }
    });
    setFilterTableData(tempTable);
  }, [toSearch]);

  const toggleStatus = (index) => {
    let tempTable = [...tableData];
    tempTable[index].Status = !tempTable[index].Status;
    setTableData(tempTable);
  };

  const deleteRow = (itemToDelete) => {
    deleteMerchant(tableData[itemToDelete].id)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
        console.log(error.message)
      })
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
                  Merchants
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-1">
                <div className="top-btn-wrapper">
                  <Button
                    className="btn-fill res-size"
                    type="submit"
                    style={{
                      backgroundColor: "#3AAB7B",
                      border: "none",
                    }}
                    onClick={() => history.push("/admin/MerchantForm")}
                  >
                    ADD
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
                      <th className="border-0">Code Negoshi</th>
                      <th className="border-0">Nomber Negoshi</th>
                      <th className="border-0">NUMBER DI KUENTA</th>
                      <th className="border-0">NOMBER DI BANKO</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      if (filterTableData.includes(item)) {
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
                          <td> {item.Name} </td>
                          <td> {item.AccountNo} </td>
                          <td> {item.BankName} </td>
                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" , cursor:"pointer" }}
                              onClick={() =>
                                history.push(
                                  "/admin/MerchantForm/?id=" + item.id
                                )
                              }
                            />
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-trash red"
                              style={{ color: "red" , cursor:"pointer" }}
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

export default MerchantList;
