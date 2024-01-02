import axios from "axios";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";
import { FormatRupiah } from "@arismun/format-rupiah";
import style from "./style.module.css";
import ModalDetail from "../Modal/orderCashier";
import Button from 'react-bootstrap/Button';
import { Badge } from "react-bootstrap";

const tabsOrder = () => {
  const [key, setKey] = useState("home");
  const [dataPaidCashier, setDataPaidCashier] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [dataPaid, setDataPaid] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    fetchDataPaidCashier();
    fetchDataNew();
    fetchDataPaid();
    fetchDataDone();
  }, []);

  const fetchDataPaidCashier = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/paidCashier`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataPaidCashier(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchDataNew = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/statusNew`, {
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
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/statusPaid`, {
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

  const fetchDataDone = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order/statusDone`, {
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

  const handlePaidClick = (id) => {
    setLoading(true);

    axios
      .patch(
        `${import.meta.env.VITE_API_ENDPOINT
        }/cashier/order/${id}/updateStatus/1`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchDataPaidCashier();
        fetchDataNew();
        fetchDataPaid();
        fetchDataDone();
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Pesanan Sudah Dibayar!",
        });
      })
      .catch((err) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Pesanan Gagal Dibayar.",
        });
      });
  };

  const handleDoneClick = (id) => {
    setLoading(true);

    axios
      .patch(
        `${import.meta.env.VITE_API_ENDPOINT
        }/cashier/order/${id}/updateStatus/4`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchDataPaidCashier();
        fetchDataNew();
        fetchDataPaid();
        fetchDataDone();
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Pesanan Selesai!",
        });
      })
      .catch((err) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Pesanan Belum Selesai.",
        });
      });
  };

  const handleCancelClick = (id) => {
    setLoading(true);

    axios
      .patch(
        `${import.meta.env.VITE_API_ENDPOINT
        }/cashier/order/${id}/updateStatus/0`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchDataPaidCashier();
        fetchDataNew();
        fetchDataPaid();
        fetchDataDone();
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Pesanan Dibatalkan!",
        });
      })
      .catch((err) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Pesanan Gagal Dibatalkan.",
        });
      });
  };

  return (
    <>
      <div className="card" style={{ width: "38rem", padding: "5px" }}>
        <div className="card-body">
          <h3 className="card-title">Data Order</h3>
          <div className={`${style.scrollableTabs}`} style={{ overflowX: "auto" }}>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className={`mb-3 ${style.tabs}`}
            >
              <Tab eventKey="paidcashier" title={<span>Bayar Di kasir <Badge variant="info" style={{ borderRadius: "50%" }}>{dataPaidCashier.length}</Badge></span>}>
                {dataPaidCashier &&
                  dataPaidCashier.map((item, indexPaidCashier) => (
                    <div className="card" style={{ width: "17rem", padding: "25px" }}>
                      <div className="row">
                        <div className="text-center">
                          <h5 className="card-title font-weight-bold">
                            # Table {item.table_no}
                          </h5>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {item.customer_name}
                          </h5>
                        </div>

                        <div className="d-flex mb-2">
                          <p className="card-title">Harga</p>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {<FormatRupiah value={item.price} />}
                          </h5>
                        </div>

                        <div className="d-flex">

                          <ModalDetail item={item} />

                          <button
                            className="btn btn-primary ms-auto"
                            onClick={() => handlePaidClick(item.id)}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Paid"}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
              </Tab>
              <Tab eventKey="nopaid" title={<span>Pesanan Baru <Badge variant="info" style={{ borderRadius: "50%" }}>{dataNew.length}</Badge></span>}>
                {dataNew &&
                  dataNew.map((item, indexDataNew) => (
                    <div className="card" style={{ width: "17rem", padding: "25px" }}>
                      <div className="row">
                        <div className="text-center">
                          <h5 className="card-title font-weight-bold">
                            # Table {item.table_no}
                          </h5>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {item.customer_name}
                          </h5>
                        </div>

                        <div className="d-flex mb-2">
                          <p className="card-title">Harga</p>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {<FormatRupiah value={item.price} />}
                          </h5>
                        </div>

                        <div className="d-flex">

                          <ModalDetail item={item} />

                          <button
                            className="btn btn-primary ms-auto"
                            onClick={() => handlePaidClick(item.id)}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Paid"}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
              </Tab>
              <Tab eventKey="paid" title={<span>Pesanan Berlangsung <Badge variant="info" style={{ borderRadius: "50%" }}>{dataPaid.length}</Badge></span>}>
                {dataPaid &&
                  dataPaid.map((item, indexDataPaid) => (
                    <div className="card" style={{ width: "17rem", padding: "25px" }}>
                      <div className="row">
                        <div className="text-center">
                          <h5 className="card-title font-weight-bold">
                            # Table {item.table_no}
                          </h5>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {item.customer_name}
                          </h5>
                        </div>

                        <div className="d-flex mb-2">
                          <p className="card-title">Harga</p>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {<FormatRupiah value={item.price} />}
                          </h5>
                        </div>

                        <div className="d-flex">

                          <ModalDetail item={item} />

                          <button
                            className="btn btn-primary ms-auto"
                            onClick={() => handleDoneClick(item.id)}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Done"}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
              </Tab>
              <Tab eventKey="done" title={<span>Pesanan Selesai <Badge variant="info" style={{ borderRadius: "50%" }}>{dataDone.length}</Badge></span>}>
                {dataDone &&
                  dataDone.map((item, indexDataDone) => (
                    <div className="card" style={{ width: "17rem", padding: "25px" }}>
                      <div className="row">
                        <div className="text-center">
                          <h5 className="card-title font-weight-bold">
                            # Table {item.table_no}
                          </h5>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {item.customer_name}
                          </h5>
                        </div>

                        <div className="d-flex mb-2">
                          <p className="card-title">Harga</p>
                          <h5 className="card-title font-weight-bold ms-auto">
                            {<FormatRupiah value={item.price} />}
                          </h5>
                        </div>

                        <div className="d-flex">

                          <ModalDetail item={item} />

                          <button
                            className="btn btn-danger ms-auto"
                            onClick={() => handleCancelClick(item.id)}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Back"}
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
              </Tab>
            </Tabs>
          </div>

        </div>
      </div>
    </>
  );
};

export default tabsOrder;
