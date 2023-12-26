import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const tableOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/cashier/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setLoading(true);

    axios
      .patch(
        `${import.meta.env.VITE_API_ENDPOINT}/cashier/order/${id}/updateStatus/${newStatus}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchData();
        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Order status updated successfully!",
        });
      })
      .catch((err) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update order status.",
        });
      });
  };

  return (
    <div>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama Customer</th>
            <th scope="col">status</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Action</th>
            {/* <th scope="col">Name</th>
            <th scope="col">Handphone</th>
            <th scope="col">Notes</th>
            <th scope="col">detail</th> */}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={item.id}>
              <th>{index + 1}</th>
              <td>{item.customer_name}</td>
              <td>{item.status}</td>
              <td>{item.payment.code}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pilih Status
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => handleUpdateStatus(item.id, 0)}
                      disabled={loading}
                    >
                      Cancel Paid
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleUpdateStatus(item.id, 1)}
                      disabled={loading}
                    >
                      Paid
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleUpdateStatus(item.id, 4)}
                      disabled={loading}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableOrder;
