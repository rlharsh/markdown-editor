import React, { useContext } from "react";
import { DocumentContext } from "../Providers/DocumentProvider/DocumentProvider";

import IconLinkedin from "remixicon-react/LinkedinBoxLineIcon";
import { LINKEDIN_URL } from "../../assets/js/gvars";

const Footer = () => {
  const { totalWords } = useContext(DocumentContext);
  return (
    <div className="footer">
      <div>
        <p>
          Total Words: <span className="orange">{totalWords}</span>
        </p>
      </div>
      <div>
        <button
          className="btn-clear"
          onClick={() => {
            window.open("https://www.linkedin.com/in/ronald-harsh/", "_blank");
          }}
        >
          <IconLinkedin />
        </button>
      </div>
    </div>
  );
};

export default Footer;
