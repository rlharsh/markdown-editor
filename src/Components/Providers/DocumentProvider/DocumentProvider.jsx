import React, { createContext, useContext, useEffect, useState } from "react";

export const DocumentContext = createContext(null);

import {
  db,
  auth,
  updateDocument,
  createDocument,
  deleteDocument,
} from "../../../assets/js/firebase.js";
import { query, where, onSnapshot, collection } from "firebase/firestore";

const DocumentProvider = ({ children }) => {
  /* State Variables */
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveModalShowing, setSaveModalShowing] = useState(false);
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const [pendingDocument, setPendingDocument] = useState(null);
  const [totalWords, setTotalWords] = useState(0);

  /* Refs */
  const docsRef = collection(db, "documents");

  /* Query for searching the Firebase. */
  const q = query(docsRef, where("uid", "==", auth.currentUser.uid));

  /* Update the documents if a new document is received. */
  onSnapshot(q, (querySnapshot) => {
    const newDocuments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (JSON.stringify(newDocuments) !== JSON.stringify(documents)) {
      setDocuments(newDocuments);
    }
  });

  // Show the delete modal.
  const deleteCurrentDocument = () => setDeleteModalShowing(true);

  /* User has confirmed deletion, proceed. */
  const confirmDelete = () => {
    deleteDocument(currentDocument); // Delete document.
    setDeleteModalShowing(false); // Hide the delete modal.
    setCurrentDocument(documents[0]); // Set the current document to the first document.
  };

  /* Show the save modal if there is a document. Otherwise set pending. */
  const showSaveModal = (document) => {
    if (document) {
      setPendingDocument(document);
    }
    setSaveModalShowing(true);
  };

  /* Load a document. */
  const loadDocument = () => {
    setUnsavedChanges(false); // Clear unsaved changes flag.
    setSaveModalShowing(false); // Hide the save modal.
    setCurrentDocument(pendingDocument); // Set the current document.
  };

  /* Save the current document on Firebase. */
  const saveDocument = () => {
    if (currentDocument) {
      updateDocument({
        ...currentDocument,
        body: document.getElementById("editor").value,
      });
      setUnsavedChanges(false); // Clear the unsaved changes flag.
      setSaveModalShowing(false); // Hide the save modal.
      loadDocument(); // Load document.
    }
  };

  /* Update the title on Firebase. */
  const updateTitle = (newTitle) => {
    if (currentDocument) {
      updateDocument({
        ...currentDocument,
        title: newTitle,
      });
    }
  };

  /* Save the current document on Firebase. */
  const saveDocumentFile = () => {
    updateDocument({
      ...currentDocument,
      body: document.getElementById("editor").value,
    });
    setUnsavedChanges(false);
  };

  /* Create a new document. */
  const createNewDocument = async () => {
    const doc = await createDocument(
      "Untitled.md",
      "# My awesome **Content**!"
    );
    if (doc) {
      setCurrentDocument(doc);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        setCurrentDocument,
        setUnsavedChanges,
        unsavedChanges,
        showSaveModal,
        saveDocumentFile,
        createNewDocument,
        deleteCurrentDocument,
        updateTitle,
        setTotalWords,
        totalWords,
      }}
    >
      {deleteModalShowing && (
        <div className="modal">
          <div className="modal-inner">
            <h1>Delete this document?</h1>
            <p>
              Are you sure you want to delete the '{currentDocument?.title}'
              document and its contents? This action cannot be reversed.
            </p>
            <button onClick={confirmDelete}>Confirm & Delete</button>
            <button onClick={() => setDeleteModalShowing(false)}>Cancel</button>
          </div>
        </div>
      )}
      {saveModalShowing && (
        <div className="modal">
          <div className="modal-inner">
            <h1>Save this document?</h1>
            <p>
              Document '{currentDocument?.title}' has changed recently. Would
              you like to save the changes made tot his document?
            </p>
            <button onClick={saveDocument}>Save Document</button>
            <button onClick={loadDocument}>Don't Save</button>
          </div>
        </div>
      )}
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
