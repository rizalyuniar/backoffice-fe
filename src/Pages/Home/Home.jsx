import React, { useState, useEffect } from 'react';
import Side from "../../Components/Sidebar/Side";
import style from "./style.module.css";
import Tabs from '../../Components/Tabs/tabsOrder';
import Table from '../../Components/Table/tableOrder';

const Home = () => {

  return (
    <body id="page-top">
      <div id="wrapper">
        <Side />
        <div className="d-flex flex-column">
          <div id="content">
            <div className={`container ${style.mode}`}>
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>

              <div className="row">
                <div className={`${style.mode}`}>
                  <div className="row px-1">

                    <Tabs />
                    <Table />

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

export default Home;
