import React, { useContext, useEffect } from "react";
import { MenuContext } from "../Providers/MenuProvider/MenuProvider";
import { APP_ID } from "../../assets/js/gvars";
import Switch from "../Core/Switch";
import { signOutOfApplication, auth } from "../../assets/js/firebase";

/* Import the icons for our switch */
import IconMoon from "remixicon-react/MoonClearLineIcon";
import IconSun from "remixicon-react/SunLineIcon";
import IconLeave from "remixicon-react/LogoutBoxLineIcon";

/* Import the default user icon. */
import IconAvatar from "../../assets/images/user-avatar.svg";

/* Import the Theme Context provider */
import { ThemeContext } from "../Providers/ThemeProvider/ThemeProvider";
import DocumentsContainer from "../DocumentsContainer/DocumentsContainer";

const Sidebar = () => {
  /* Import the ToggleTheme from ThemeProvider */
  const { toggleTheme, isDark } = useContext(ThemeContext);

  /* Import the menuVisible to pass initial value to the switch. */
  const { menuVisible } = useContext(MenuContext);

  return (
    <div className={`sidebar ${menuVisible ? "sidebar--visible" : null}`}>
      <div className="sidebar-inner">
        {/* Display the application version. */}
        <div className="sidebar-inner-title">
          <h2>{APP_ID}</h2>
          <div className="sidebar-inner-theme-switcher">
            <Switch
              PreIcon={IconMoon}
              PostIcon={IconSun}
              Checked={!isDark}
              Callback={toggleTheme}
            />
          </div>
        </div>
        {/* Display the documents container. */}
        <div className="sidebar-inner-documents">
          <DocumentsContainer />
        </div>
        <div className="avatar-block">
          <img
            className="avatar-block__image"
            src={auth.currentUser.photoURL || IconAvatar}
            alt={`${auth?.currentUser?.displayName || "USER Avatar Image"}`}
          />
          <div className="avatar-block__name">
            <p>{auth.currentUser.displayName.toUpperCase() || "USER"}</p>
            <button onClick={signOutOfApplication}>
              <IconLeave /> <p className="dynamic-button">Sign Out</p>
            </button>
          </div>
        </div>
        {/* Display the theme selector switch */}
      </div>
    </div>
  );
};

export default Sidebar;
