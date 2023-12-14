import React, { createContext, useContext, useEffect, useState } from "react";

export const DocumentContext = createContext(null);

import { db, auth, updateDocument, createDocument, deleteDocument } from "../../../assets/js/firebase.js";
import { query, where, onSnapshot, collection } from "firebase/firestore";

const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveModalShowing, setSaveModalShowing] = useState(false);
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const docsRef = collection(db, "documents");
  const [pendingDocument, setPendingDocument] = useState(null);
  const q = query(docsRef, where("uid", "==", auth.currentUser.uid));
  const [totalWords, setTotalWords] = useState(0);

  onSnapshot(q, (querySnapshot) => {
    const newDocuments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (JSON.stringify(newDocuments) !== JSON.stringify(documents)) {
      setDocuments(newDocuments);
    }
  });

  const deleteCurrentDocument = () => {
    setDeleteModalShowing(true);
  };

  const confirmDelete = () => {
    deleteDocument(currentDocument);
    setDeleteModalShowing(false);
    setCurrentDocument(documents[0]);
  };

  const showSaveModal = (document) => {
    if (document) {
      setPendingDocument(document);
    }
    setSaveModalShowing(true);
  };

  const loadDocument = () => {
    setUnsavedChanges(false);
    setSaveModalShowing(false);
    setCurrentDocument(pendingDocument);
  };

  const saveDocument = () => {
    if (currentDocument) {
      updateDocument({
        ...currentDocument,
        body: document.getElementById("editor").value,
      });
      setUnsavedChanges(false);
      setSaveModalShowing(false);
      loadDocument();
    }
  };

  const updateTitle = (newTitle) => {
    if (currentDocument) {
      updateDocument({
        ...currentDocument,
        title: newTitle,
      });
    }
  };

  const saveDocumentFile = () => {
    updateDocument({
      ...currentDocument,
      body: document.getElementById("editor").value,
    });
    setUnsavedChanges(false);
  };

  const createNewDocument = async () => {
    const doc = await createDocument("Untitled.md", "# My awesome **Content**!");
    if (doc) {
      setCurrentDocument(doc);
    }
  };

  return (
    <DocumentContext.Provider value={{ documents, currentDocument, setCurrentDocument, setUnsavedChanges, unsavedChanges, showSaveModal, saveDocumentFile, createNewDocument, deleteCurrentDocument, updateTitle, setTotalWords, totalWords }}>
      {deleteModalShowing && (
        <div className="modal">
          <div className="modal-inner">
            <h1>Delete this document?</h1>
            <p>Are you sure you want to delete the '{currentDocument?.title}' document and its contents? This action cannot be reversed.</p>
            <button onClick={confirmDelete}>Confirm & Delete</button>
            <button onClick={() => setDeleteModalShowing(false)}>Cancel</button>
          </div>
        </div>
      )}
      {saveModalShowing && (
        <div className="modal">
          <div className="modal-inner">
            <h1>Save this document?</h1>
            <p>Document '{currentDocument?.title}' has changed recently. Would you like to save the changes made tot his document?</p>
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
