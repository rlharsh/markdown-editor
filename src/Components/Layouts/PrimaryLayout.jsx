import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../AppHeader/AppHeader";
import Sidebar from "../Sidebar/Sidebar";
import MenuProvider from "../Providers/MenuProvider/MenuProvider";
import DocumentProvider from "../Providers/DocumentProvider/DocumentProvider";
import Footer from "../Footer/Footer";

const PrimaryLayout = () => {
  return (
    <div className="primary">
      <MenuProvider>
        <DocumentProvider>
          <Sidebar />
          <div className="primary-main">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </DocumentProvider>
      </MenuProvider>
    </div>
  );
};

export default PrimaryLayout;
