import React, { useEffect, useState } from "react";

const Switch = ({ PreIcon, PostIcon, Callback, Checked }) => {
  const [checked, setChecked] = useState(Checked);

  useEffect(() => {
    setChecked(Checked);
  }, [Checked]);

  return (
    <div className="pre-switch">
      <PreIcon className={`${checked ? "switch--inactive" : "switch--active"}`} size="14" />
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(!checked);
            Callback();
          }}
        />
        <span className="slider round"></span>
      </label>
      <PostIcon className={`${checked ? "switch--active" : "switch--inactive"}`} size="14" />
    </div>
  );
};

export default Switch;
