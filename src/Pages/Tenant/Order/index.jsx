import React from "react";
import Side from "../../../Components/Sidebar/Side";
import Tabs from "../../../Components/Tabs/tabsOrderTenant";
const index = () => {
  return (
    <body id="page-top">
      <div id="wrapper">
        <Side />
        <div className="d-flex flex-column">
          <div id="content">
            <div className="container">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Order</h1>
              </div>

              <div className="row">
                <div className="">
                  <div className="row px-1">
                    <Tabs />
                    {/* <Table /> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default index;
