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
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import getMerchantTypeList from "services/merchantType";
import { deleteMerchantType } from "services/merchantType"
import "../components/Dashboard.css";
import { getMerchantTypeDiscountByMerchantType_id } from "services/merchantType";
import getMerchantList from "services/merchant";
import { deleteMerchantTypeDiscountByMerchantType_id } from "services/merchantType";

function MerchantTypeList() {
  const [tableData, setTableData] = React.useState([{
    Checked: false,
    id: "",
    Title: ""
  }])
  const history = useHistory();
  const [status, setStatus] = React.useState(false)
  const [toSearch, setToSearch] = React.useState("")
  const [filterTableData, setFilterTableData] = React.useState([])
  useEffect(() => {
    setFilterTableData([])
    getMerchantTypeList().
      then(function (response) {
        console.log(response.data)
        setTableData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    // setTableData([{
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },
    // {
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },
    // {
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },
    // {
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },
    // {
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },
    // {
    //   Checked: false,
    //   Title: "shaffan",
    //   Status: false
    // },])

  }, [])



  useEffect(() => {
    let tempTable = []
    tableData.map((item, index) => {
      if (item.Title.includes(toSearch)) {

      }
      else {
        tempTable.push(item)
      }
    })
    setFilterTableData(tempTable)


  }, [toSearch])

  const toggleStatus = (index) => {
    let tempTable = [...tableData]
    tempTable[index].Status = !tempTable[index].Status
    setTableData(tempTable)
  }

  const deleteRow = (itemToDelete) => {
    getMerchantList()
      .then(function (rsp) {
        const result = rsp.data.map((item) => {
          if (item.MerchantType_id == tableData[itemToDelete].id) {
            alert("Cannot Delete Merchant has it in use !!!")
            return true
          }
          return false
        })
        for (let i = 0; i < result.length; i++) {
          if (result[i] == true) {
            return
          }
        }
        deleteMerchantTypeDiscountByMerchantType_id(tableData[itemToDelete].id)
          .then(function (response) {
            deleteMerchantType(tableData[itemToDelete].id)
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log("failed mtdb" + error)
                console.log(error.message)
              })
          })
          .catch(function (error) {
            console.log("failed mtdbymt" + error)
            console.log(error.message)
          })
      })
      .catch((error) => {
        console.log(error)
      })

    setTableData(tableData.filter((item, index) => index !== itemToDelete))
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3" className="heading">Merchant Type</Card.Title>
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
                    onClick={() => history.push("/admin/MerchantTypeForm")}
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
                      <th className="border-0">Title</th>
                      <th className="border-0">
                        Actions
                      </th>
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
                          <td> {item.Title} </td>

                          <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={() =>
                                history.push(
                                  "/admin/MerchantTypeForm/?id=" + item.id
                                )
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

export default MerchantTypeList;
