import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from 'react-bootstrap/Accordion';
import { FormatRupiah } from "@arismun/format-rupiah";
import style from "./style.module.css";

const orderCashier = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="success" onClick={() => setModalShow(true)}>
        Detail
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <h4>{item.order_no}</h4>
            <h4 className="ms-auto">Table {item.table_no}</h4>
          </div>

          <p>
            <div className="d-flex">
              <p className="font-weight-bold mr-2">Customer: </p>
              {item.customer_name}<br />
            </div>
            <p className="font-weight-bold">Rincian Pesanan:</p>
          </p>
          {item.orderDetails.map((orderDetail, orderDetailIndex) => (
            <div key={orderDetailIndex}>
              <p>
                {/* Menu */}
                <div className="d-flex">
                  {orderDetail.menu_name}
                  <p className="ms-auto mr-4" style={{ marginBottom: "0rem"}}>
                    {/* <b className="ml-2">{<FormatRupiah value={orderDetail.price_unit} />}</b> */}
                    {<FormatRupiah value="20000" />}
                  </p>
                </div>
                {/* Option */}
                {orderDetail.detailoptions.map((detailOption, detailOptionIndex) => (
                  <p className="d-flex ml-3" style={{ marginBottom: "0rem"}}>
                    <b className="mr-3">{detailOption.menu_option_detail_qty}</b>
                    {detailOption.menu_option_detail_name}
                    <div className="ms-auto mr-4">
                      {/* <b className="ml-2">{<FormatRupiah value={detailOption.price} />}</b> */}
                      {<FormatRupiah value="5000" />}
                    </div>
                  </p>
                ))}
                {/* Total */}
                <p>
                  <div className="d-flex">
                    <p className="ms-auto">
                      {/* <b className="mr-3">{orderDetail.menu_qty} x</b>
                      {<FormatRupiah value={orderDetail.price} />} = */}
                      {/* <b className="mr-3">3 x</b>
                      {<FormatRupiah value="30000" />} = */}
                    </p>
                    <div className="row" style={{ marginTop: 0}}>
                      {/* <hr className="ms-auto" style={{ width: "100px", marginTop: "0rem", marginBottom: "0rem" }} />
                      <b className="ms-auto" style={{ textAlign: "right"}}>{<FormatRupiah value={orderDetail.price} />}</b> */}
                      <hr className="ms-auto" style={{ width: "108px", marginTop: "0rem", marginBottom: "0rem" }} />
                      <div className={`${style.totalPermenu}`} style={{ textAlign: "right", marginBottom: 0}}><b>3 x</b> {<FormatRupiah value="30000" />}</div>
                      <div className="d-flex">
                        <b className="ms-auto" style={{ textAlign: "right"}}>{<FormatRupiah value="90000" />}</b>
                      </div>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <b className="ms-auto">{<FormatRupiah value={orderDetail.price} />}</b>
                  </div> */}
                </p>
              </p>
              {/* <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Options:</Accordion.Header>
                  <Accordion.Body>
                    {orderDetail.detailoptions.map((detailOption, detailOptionIndex) => (
                      <p key={detailOptionIndex}>
                        {detailOptionIndex + 1}. {detailOption.menu_option_detail_name}<br />
                        Discount:<br />
                        {<FormatRupiah value={detailOption.price_before_discount} />} - {<FormatRupiah value={detailOption.discount_value} />}<br />
                        Quantity:<br />
                        {detailOption.menu_option_detail_qty}<br />
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}
              {/* <hr /> */}
            </div>
          ))}
          <hr />
          <p>
            <div className="d-flex">
              harga sebelum discount:
              <p className="ms-auto">
                {<FormatRupiah value={item.price_before_discount} />}
              </p>
            </div>
            <div className="d-flex">
              discount:
              <p className="ms-auto">
                <b className="mr-1">-</b>
                {<FormatRupiah value={item.discount_value} />}
              </p>
            </div>
            <div className="d-flex font-weight-bold">
              Total Pembelian
              <p className="ms-auto">{<FormatRupiah value={item.price} />}</p>
            </div>
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Bayar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default orderCashier;
