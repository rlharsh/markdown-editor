import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../AppHeader/AppHeader";
import Sidebar from "../Sidebar/Sidebar";
import MenuProvider from "../Providers/MenuProvider/MenuProvider";
import DocumentProvider from "../Providers/DocumentProvider/DocumentProvider";

const PrimaryLayout = () => {
  return (
    <div className="primary">
      <MenuProvider>
        <DocumentProvider>
          <Sidebar />
          <div className="primary-main">
            <Header />
            <Outlet />
          </div>
        </DocumentProvider>
      </MenuProvider>
    </div>
  );
};

export default PrimaryLayout;
