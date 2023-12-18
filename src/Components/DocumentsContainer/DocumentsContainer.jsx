import React, { useContext } from "react";

import "./documentscontainer.css";
import { DocumentContext } from "../Providers/DocumentProvider/DocumentProvider";

import IconPlus from "remixicon-react/AddFillIcon";
import IconFile from "remixicon-react/FileFillIcon";

import { getFirestoreDate } from "../../assets/js/firebase.js";

const DocumentsContainer = () => {
  /* Import the variables from our Document Context */
  const {
    documents,
    setCurrentDocument,
    showSaveModal,
    unsavedChanges,
    createNewDocument,
  } = useContext(DocumentContext);

  /* Verify that no changes have been made,
   * if they have, prompt to save, otherwise open. */
  const openDocument = (document) => {
    unsavedChanges ? showSaveModal(document) : setCurrentDocument(document);
  };

  /* Render the list of documents. */
  const renderDocuments = () => {
    if (documents) {
      return documents.map((doc, index) => (
        <div key={index} className="doc-tile" onClick={() => openDocument(doc)}>
          <IconFile />
          <div className="doc-tile__data">
            <span className="date">{getFirestoreDate(doc?.dateLastEdit)}</span>
            <span className="file-name">{doc?.title}</span>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="documents-container">
      <h2>DOCUMENTS</h2>
      <button onClick={createNewDocument}>
        <IconPlus />
        <p>New Document</p>
      </button>
      <div className="document-listing">{renderDocuments()}</div>
    </div>
  );
};

export default DocumentsContainer;
