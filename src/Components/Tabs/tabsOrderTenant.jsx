import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";

const tabsOrderTenant = () => {
  const [key, setKey] = useState("home");
  const [dataNew, setDataNew] = useState([]);
  const [dataPaid, setDataPaid] = useState([]);
  const [dataAccepted, setDataAccepted] = useState([]);
  const [dataCooking, setDataCooking] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataNew();
    fetchDataPaid();
    fetchDataAccepted();
    fetchDataCooking();
    fetchDataDone();
  }, []);

  const fetchDataNew = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/tenantNew`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataNew(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDataPaid = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/tenantPaid`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataPaid(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDataAccepted = () => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/cashier/order/tenantAccepted`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDataAccepted(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDataCooking = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/tenantCooking`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataCooking(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDataDone = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/tenantDone`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataDone(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="card" style={{ width: "63rem", padding: "5px" }}>
      <div className="card-body">
        <h3 className="card-title">Data Order</h3>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="new" title="Pesanan Baru">
            {dataNew &&
              dataNew.map((item, index) => (
                <div className="card" style={{ width: "58rem" }}>
                  <div className="row">
                    <div className="d-flex mb-2">
                      <h5 className="card-title font-weight-bold">
                        # {item.order_no}
                      </h5>
                      <h5 className="card-title font-weight-bold ms-auto">
                        Table {item.table_no}
                      </h5>
                    </div>

                    <div className="d-flex">
                      <div className="row mr-2">
                        <h6 className="font-weight-bold">Customer Name :</h6>
                        <h6 className="font-weight-bold">No. Handphone :</h6>
                        <h6 className="font-weight-bold">Notes :</h6>
                        <h6 className="font-weight-bold">Detail :</h6>
                      </div>
                      <div className="row" style={{ paddingRight: "50px" }}>
                        <h6 className="">{item.customer_name}</h6>
                        <h6 className="">{item.hp_no}</h6>
                        <h6 className="">{item.notes}</h6>
                        <h6 className="">{item.has_detail}</h6>
                      </div>

                      <div className="row">
                        {/* <h6 className="font-weight-bold">Payment Method :</h6> */}
                        <h6 className="font-weight-bold">Discount :</h6>
                        <h6 className="font-weight-bold">
                          Price before Discount :
                        </h6>
                        <h6 className="font-weight-bold">
                          Price with Discount :
                        </h6>
                      </div>
                      <div className="row">
                        {/* <h6 className="">{item.payment.code}</h6> */}
                        <h6 className="">{item.discount_value}</h6>
                        <h6 className="">{item.price_before_discount}</h6>
                        <h6 className="">{item.price}</h6>
                      </div>
                    </div>

                    {/* <button
                      className="btn btn-primary mt-2"
                      onClick={() => handlePaidClick(item.id)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Paid"}
                    </button> */}
                  </div>
                </div>
              ))}
          </Tab>
          <Tab eventKey="paid" title="Pesanan Telah Dibayar">
            {dataPaid &&
              dataPaid.map((item, index) => (
                <div className="card" style={{ width: "58rem" }}>
                  <div className="row">
                    <div className="d-flex mb-2">
                      <h5 className="card-title font-weight-bold">
                        # {item.order_no}
                      </h5>
                      <h5 className="card-title font-weight-bold ms-auto">
                        Table {item.table_no}
                      </h5>
                    </div>

                    <div className="d-flex">
                      <div className="row mr-2">
                        <h6 className="font-weight-bold">Customer Name :</h6>
                        <h6 className="font-weight-bold">No. Handphone :</h6>
                        <h6 className="font-weight-bold">Notes :</h6>
                        <h6 className="font-weight-bold">Detail :</h6>
                      </div>
                      <div className="row" style={{ paddingRight: "50px" }}>
                        <h6 className="">{item.customer_name}</h6>
                        <h6 className="">{item.hp_no}</h6>
                        <h6 className="">{item.notes}</h6>
                        <h6 className="">{item.has_detail}</h6>
                      </div>

                      <div className="row">
                        {/* <h6 className="font-weight-bold">Payment Method :</h6> */}
                        <h6 className="font-weight-bold">Discount :</h6>
                        <h6 className="font-weight-bold">
                          Price before Discount :
                        </h6>
                        <h6 className="font-weight-bold">
                          Price with Discount :
                        </h6>
                      </div>
                      <div className="row">
                        {/* <h6 className="">{item.payment.code}</h6> */}
                        <h6 className="">{item.discount_value}</h6>
                        <h6 className="">{item.price_before_discount}</h6>
                        <h6 className="">{item.price}</h6>
                      </div>
                    </div>

                    <h5 className="card-title font-weight-bold mt-4">Detail</h5>

                    {/* order detail */}
                    {item.orderDetails.map((orderDetail, orderDetailIndex) => (
                      <div className="d-flex" key={orderDetailIndex}>
                        <div className="row mr-2">
                          <h6 className="font-weight-bold">Nama Menu :</h6>
                          <h6 className="font-weight-bold">Jumlah Pesanan :</h6>
                        </div>
                        <div className="row" style={{ paddingRight: "50px" }}>
                          <h6 className="">{orderDetail.menu_name}</h6>
                          <h6 className="">{orderDetail.menu_qty}</h6>
                        </div>
                      </div>
                    ))}

                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handlePaidClick(item.id)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Terima Pesanan"}
                    </button>
                  </div>
                </div>
              ))}
          </Tab>
          <Tab eventKey="accepted" title="Pesanan Diterima">
            {dataAccepted &&
              dataAccepted.map((item, index) => (
                <div className="card" style={{ width: "58rem" }}>
                  <div className="row">
                    <div className="d-flex mb-2">
                      <h5 className="card-title font-weight-bold">
                        # {item.order_no}
                      </h5>
                      <h5 className="card-title font-weight-bold ms-auto">
                        Table {item.table_no}
                      </h5>
                    </div>

                    <div className="d-flex">
                      <div className="row mr-2">
                        <h6 className="font-weight-bold">Customer Name :</h6>
                        <h6 className="font-weight-bold">No. Handphone :</h6>
                        <h6 className="font-weight-bold">Notes :</h6>
                        <h6 className="font-weight-bold">Detail :</h6>
                      </div>
                      <div className="row" style={{ paddingRight: "50px" }}>
                        <h6 className="">{item.customer_name}</h6>
                        <h6 className="">{item.hp_no}</h6>
                        <h6 className="">{item.notes}</h6>
                        <h6 className="">{item.has_detail}</h6>
                      </div>

                      <div className="row">
                        {/* <h6 className="font-weight-bold">Payment Method :</h6> */}
                        <h6 className="font-weight-bold">Discount :</h6>
                        <h6 className="font-weight-bold">
                          Price before Discount :
                        </h6>
                        <h6 className="font-weight-bold">
                          Price with Discount :
                        </h6>
                      </div>
                      <div className="row">
                        {/* <h6 className="">{item.payment.code}</h6> */}
                        <h6 className="">{item.discount_value}</h6>
                        <h6 className="">{item.price_before_discount}</h6>
                        <h6 className="">{item.price}</h6>
                      </div>
                    </div>

                    {/* <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleDoneClick(item.id)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Pesanan Selesai"}
                    </button> */}
                  </div>
                </div>
              ))}
          </Tab>
          <Tab eventKey="cooking" title="Pesanan Dimasak">
            {dataCooking &&
              dataCooking.map((item, index) => (
                <div className="card" style={{ width: "58rem" }}>
                  <div className="row">
                    <div className="d-flex mb-2">
                      <h5 className="card-title font-weight-bold">
                        # {item.order_no}
                      </h5>
                      <h5 className="card-title font-weight-bold ms-auto">
                        Table {item.table_no}
                      </h5>
                    </div>

                    <div className="d-flex">
                      <div className="row mr-2">
                        <h6 className="font-weight-bold">Customer Name :</h6>
                        <h6 className="font-weight-bold">No. Handphone :</h6>
                        <h6 className="font-weight-bold">Notes :</h6>
                        <h6 className="font-weight-bold">Detail :</h6>
                      </div>
                      <div className="row" style={{ paddingRight: "50px" }}>
                        <h6 className="">{item.customer_name}</h6>
                        <h6 className="">{item.hp_no}</h6>
                        <h6 className="">{item.notes}</h6>
                        <h6 className="">{item.has_detail}</h6>
                      </div>

                      <div className="row">
                        {/* <h6 className="font-weight-bold">Payment Method :</h6> */}
                        <h6 className="font-weight-bold">Discount :</h6>
                        <h6 className="font-weight-bold">
                          Price before Discount :
                        </h6>
                        <h6 className="font-weight-bold">
                          Price with Discount :
                        </h6>
                      </div>
                      <div className="row">
                        {/* <h6 className="">{item.payment.code}</h6> */}
                        <h6 className="">{item.discount_value}</h6>
                        <h6 className="">{item.price_before_discount}</h6>
                        <h6 className="">{item.price}</h6>
                      </div>
                    </div>

                    {/* <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleCancelClick(item.id)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Pesanan Belum Selesai"}
                    </button> */}
                  </div>
                </div>
              ))}
          </Tab>
          <Tab eventKey="done" title="Pesanan Selesai">
            {dataDone &&
              dataDone.map((item, index) => (
                <div className="card" style={{ width: "58rem" }}>
                  <div className="row">
                    <div className="d-flex mb-2">
                      <h5 className="card-title font-weight-bold">
                        # {item.order_no}
                      </h5>
                      <h5 className="card-title font-weight-bold ms-auto">
                        Table {item.table_no}
                      </h5>
                    </div>

                    <div className="d-flex">
                      <div className="row mr-2">
                        <h6 className="font-weight-bold">Customer Name :</h6>
                        <h6 className="font-weight-bold">No. Handphone :</h6>
                        <h6 className="font-weight-bold">Notes :</h6>
                        <h6 className="font-weight-bold">Detail :</h6>
                      </div>
                      <div className="row" style={{ paddingRight: "50px" }}>
                        <h6 className="">{item.customer_name}</h6>
                        <h6 className="">{item.hp_no}</h6>
                        <h6 className="">{item.notes}</h6>
                        <h6 className="">{item.has_detail}</h6>
                      </div>

                      <div className="row">
                        {/* <h6 className="font-weight-bold">Payment Method :</h6> */}
                        <h6 className="font-weight-bold">Discount :</h6>
                        <h6 className="font-weight-bold">
                          Price before Discount :
                        </h6>
                        <h6 className="font-weight-bold">
                          Price with Discount :
                        </h6>
                      </div>
                      <div className="row">
                        {/* <h6 className="">{item.payment.code}</h6> */}
                        <h6 className="">{item.discount_value}</h6>
                        <h6 className="">{item.price_before_discount}</h6>
                        <h6 className="">{item.price}</h6>
                      </div>
                    </div>

                    {/* <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleCancelClick(item.id)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Pesanan Belum Selesai"}
                    </button> */}
                  </div>
                </div>
              ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default tabsOrderTenant;
