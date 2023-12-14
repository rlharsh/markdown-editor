import React, { useContext } from "react";
import { DocumentContext } from "../Providers/DocumentProvider/DocumentProvider";

import IconLinkedin from "remixicon-react/LinkedinBoxLineIcon";

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
        <IconLinkedin />
      </div>
    </div>
  );
};

export default Footer;
