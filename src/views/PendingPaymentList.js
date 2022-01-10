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
import { getissuancehistoryByClientId } from "services/issuanceHistory";
import { getMerchantData } from "services/merchant";
import { getClientData } from "services/client";
import { getNfcSingleData } from "services/nfc";
import "../components/Dashboard.css";

function PendingPaymentList() {
  const [tableData, setTableData] = React.useState([
    {
      DateTime: "",
      Amount: "",
      AmountPaid: "",
      PaybackPeriod: "",
      Client_id: "",
      NfcCard_id: "",
      Merchants_id: "",
      id: "",
      status: "",
    },
  ]);

  const [ClientID, setClientID] = React.useState(null);
  const history = useHistory();
  const [status, setStatus] = React.useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const [clientName, setClientName] = React.useState(null);
  const [merchantName, setMerchantName] = React.useState(null);

  const params = queryParams.get("id");

  useEffect(() => {
    if (!ClientID) return;

    getissuancehistoryByClientId(ClientID)
      .then(function (response) {
        console.log(response);
        const temp = Promise.all(
          response.data.map(async (item, index) => {
            const merchantData = await getMerchantData(item.Merchants_id);
            item.Merchants_id = merchantData.data.Name;
            const nfcData = await getNfcSingleData(item.NfcCard_id);
            item.NfcCard_id = nfcData.data.number;
            const clientData = await getClientData(ClientID);
            item.Client_id = clientData.data.Code;
            return item;
          })
        );
        temp.then(function (response) {
          setTableData(response);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [ClientID]);
  useEffect(() => {
    if (params != null) {
      setClientID(params);
    }
  }, []);

  const toggleStatus = (index) => {
    let tempTable = [...tableData];
    tempTable[index].Status = !tempTable[index].Status;
    setTableData(tempTable);
  };
  const deleteRow = (itemToDelete) => {
    setTableData(tableData.filter((item, index) => index !== itemToDelete));
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h3">Pending Payments</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div className="top-btn-wrapper">
                  {/* <Button
                  className="btn-fill"
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
                  className="btn-fill "
                  type="submit"
                  variant="info"
                                      style={{
                      border: "none",
                    }}
                >
                  Active
                </Button>
                <Button
                  className="btn-fill"
                  type="submit"
                  variant="danger"
                                      style={{
                      border: "none",
                    }}
                >
                  Block
                </Button> */}
                </div>
                <Table className="table-hover mt-3">
                  <thead>
                    <tr>
                      <th className="border-0">Fetcha</th>
                      <th className="border-0">Kliente</th>
                      <th className="border-0">Montante </th>
                      <th className="border-0">Montante Paid</th>
                      <th className="border-0">Periodo di Pago </th>
                      <th className="border-0">Nfc Card </th>
                      <th className="border-0">Negoshi</th>
                      {/* <th className="border-0">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((item, index) => {
                      if (item.AmountPaid > 0) return;
                      return (
                        <tr key={index}>
                          <td> {item.id} </td>
                          <td> {item.Client_id} </td>
                          <td> {item.Amount} </td>
                          <td> {item.AmountPaid ? item.AmountPaid : 0} </td>
                          <td> {item.PaybackPeriod} </td>
                          <td> {item.NfcCard_id} </td>
                          <td> {item.Merchants_id} </td>

                          {/* <td>
                            <i
                              className="fa fa-edit"
                              style={{ color: "green" }}
                              onClick={() =>
                                history.push("/admin/ClientForm/" + index)
                              }
                            />
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-trash red"
                              style={{ color: "red" }}
                              onClick={() => {
                              if (window.confirm('Are you sure you want to delete?'))
                                deleteRow(index);
                              }}
                            />
                          </td> */}
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

export default PendingPaymentList;
