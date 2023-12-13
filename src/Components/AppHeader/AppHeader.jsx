import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../Providers/MenuProvider/MenuProvider";

// Import the Icons for the Menu Button
import IconClosed from "remixicon-react/MenuFillIcon";
import IconOpen from "remixicon-react/CloseFillIcon";
import IconTrash from "remixicon-react/DeleteBinLineIcon";
import IconSave from "remixicon-react/SaveFillIcon";
import IconFile from "remixicon-react/File3LineIcon";
import IconRefresh from "remixicon-react/RefreshLineIcon";
import IconCancel from "remixicon-react/CloseCircleLineIcon";
import { DocumentContext } from "../Providers/DocumentProvider/DocumentProvider";

const Header = () => {
  const { toggleMenu, menuVisible } = useContext(MenuContext);
  const { currentDocument, saveDocumentFile, deleteCurrentDocument, updateTitle } = useContext(DocumentContext);
  const [editTitle, setEditTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("untitled.md");

  const toggleEdit = () => {
    setEditTitle(!editTitle);
  };

  const handleRename = (e) => {
    e.preventDefault();
    setEditTitle(false);
    setCurrentTitle(document.getElementById("filename").value);
    updateTitle(document.getElementById("filename").value);
  };

  useEffect(() => {
    setCurrentTitle(currentDocument?.title || "untitled.md");
  }, [currentDocument]);

  return (
    <header className={`header ${editTitle ? "editing" : ""}`}>
      {!editTitle && (
        <button onClick={toggleMenu} className="btn btn--flat-header full-height">
          {menuVisible ? <IconOpen /> : <IconClosed />}
        </button>
      )}

      <div className="header-file">
        {!editTitle && <IconFile />}
        <div className="header-file-data">
          {!editTitle && <p>Document Name</p>}
          {!editTitle && <h3 onClick={toggleEdit}>{currentTitle}</h3>}
          {editTitle && (
            <div className="edit-title">
              <form action="" onSubmit={handleRename}>
                <input type="text" name="filename" id="filename" placeholder="Enter filename." />
                <button>
                  <IconRefresh />
                </button>
                <button onClick={toggleEdit}>
                  <IconCancel />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {!editTitle && (
        <div className="header-save">
          <button
            className="clear"
            onClick={() => {
              if (currentDocument) {
                deleteCurrentDocument();
              }
            }}
          >
            <IconTrash />
          </button>
          <button
            onClick={() => {
              if (currentDocument) {
                saveDocumentFile();
              }
            }}
          >
            <IconSave />
            <p className="dynamic-button">Save Changes</p>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
