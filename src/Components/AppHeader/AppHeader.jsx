import React, { useContext, useEffect, useRef, useState } from "react";
import { MenuContext } from "../Providers/MenuProvider/MenuProvider";

// Import the Icons for the Menu Button
import IconClosed from "remixicon-react/MenuFillIcon";
import IconOpen from "remixicon-react/CloseFillIcon";
import IconTrash from "remixicon-react/DeleteBinLineIcon";
import IconSave from "remixicon-react/SaveFillIcon";
import IconFile from "remixicon-react/File3LineIcon";
import IconRefresh from "remixicon-react/RefreshLineIcon";
import IconCancel from "remixicon-react/CloseCircleLineIcon";

// Import the Document Controller context.
import { DocumentContext } from "../Providers/DocumentProvider/DocumentProvider";

const Header = () => {
  // Used to set the side-menu to showing or not.
  const { toggleMenu, menuVisible } = useContext(MenuContext);
  // Import the functions needed to update document features.
  const { currentDocument, saveDocumentFile, deleteCurrentDocument, updateTitle } = useContext(DocumentContext);
  // Used to set the editing title flag to true or false,
  // this will change the layouts so that user can edit title.
  const [editTitle, setEditTitle] = useState(false);
  // Contains the title of the currently loaded document.
  const [currentTitle, setCurrentTitle] = useState("untitled.md");
  // Input ref.
  const titleInputRef = useRef(null);

  /* Function that is called whenever we want to
   * toggle whether we are editing the title or not. */
  const toggleEdit = () => {
    setEditTitle(!editTitle); // Toggle editing title flag.
  };

  /* Function that is called whenever we want to
   * rename a file. */
  const handleRename = (e) => {
    e.preventDefault(); // Handle the default action of the form.
    const newTitle = titleInputRef.current.value;
    console.log(titleInputRef.current.value);
    setEditTitle(false); // Clear the editing title flag.
    setCurrentTitle(newTitle); // Change the current title.
    updateTitle(newTitle); // Call the setCurrentTitle function.
  };

  /* Use Effect that is called anytime the current document
   * has changed. */
  useEffect(() => {
    setCurrentTitle(currentDocument?.title || "untitled.md"); // Set current title to passed document title or "untitled.md".
  }, [currentDocument]);

  return (
    <header className={`header ${editTitle ? "editing" : ""}`}>
      {/* If the title is currently being edited, we will not draw the toggle menu button. */}
      {!editTitle && (
        <button onClick={toggleMenu} className="btn btn--flat-header full-height">
          {menuVisible ? <IconOpen /> : <IconClosed />}
        </button>
      )}

      <div className="header-file">
        {/* If we are editing title, no need to display the file icon. */}
        {!editTitle && <IconFile />}
        <div className="header-file-data">
          {/* If we are editing title, no need to draw file information. */}
          {!editTitle && <p>Document Name</p>}
          {!editTitle ? (
            <h3 onClick={toggleEdit}>{currentTitle}</h3>
          ) : (
            <div className="edit-title">
              <form action="" onSubmit={handleRename}>
                <input ref={titleInputRef} type="text" name="filename" id="filename" placeholder="Enter filename." />
                <button type="button" onClick={handleRename}>
                  <IconRefresh />
                </button>
                <button type="button" onClick={toggleEdit}>
                  <IconCancel />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* If we are editing title, then we will not be drawing the right hand side of header. */}
      {!editTitle && (
        <div className="header-save">
          <button
            className="clear"
            onClick={() => {
              if (currentDocument) {
                deleteCurrentDocument(); // User confirmed deletion of current file.
              }
            }}
          >
            <IconTrash />
          </button>
          <button
            onClick={() => {
              if (currentDocument) {
                saveDocumentFile(); // User confirms they want to save the current file.
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
