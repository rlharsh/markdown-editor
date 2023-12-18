import React, { useState, useContext, useEffect } from "react";

import "./editor.css";
import Markdown from "react-markdown";
import "katex/dist/katex.min.css";

/* Editor imports. */
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";

/* Icon imports. */
import IconShowing from "remixicon-react/EyeLineIcon";
import IconNotShowing from "remixicon-react/EyeOffLineIcon";

/* Document Provider import. */
import { DocumentContext } from "../Components/Providers/DocumentProvider/DocumentProvider";

const Editor = () => {
  const [value, setValue] = useState("# Hi, *Pluto*!"); // Default container message.
  const [previewShowing, setPreviewShowing] = useState(false); // Default value for the preview.

  /* Toggle the preview pane. */
  const togglePreview = () => setPreviewShowing(!previewShowing);

  /* Import variables & functions from the Document Context. */
  const { setTotalWords, currentDocument, setUnsavedChanges } =
    useContext(DocumentContext);

  /* Ran everytime the currentDocument changes. */
  useEffect(() => {
    if (currentDocument) {
      setValue(currentDocument.body); // Set the text editor to document text.
    }
  }, [currentDocument]);

  /* Function is ran everytime the text updates. */
  const updateText = (value) => {
    if (currentDocument) {
      setValue(value);
      setUnsavedChanges(true);
      const regEx = /\s+/gi;
      setTotalWords(
        document
          .getElementById("editor")
          .value.trim()
          .replace(regEx, " ")
          .split(" ").length
      );
    }
  };

  return (
    <div className="editor-window">
      <div className="top-panel">
        <div className="top-panel__left">
          <p>{previewShowing ? "PREVIEW" : "MARKDOWN"}</p>
          <button onClick={togglePreview}>
            {previewShowing ? <IconNotShowing /> : <IconShowing />}
          </button>
        </div>
        <div className={`top-panel__right ${previewShowing ? "hidden" : null}`}>
          <p>PREVIEW</p>
          <button onClick={togglePreview}>
            {previewShowing ? <IconNotShowing /> : <IconShowing />}
          </button>
        </div>
      </div>
      <div className="content-panel">
        <div
          className={`content-panel__left ${previewShowing ? "hidden" : null}`}
        >
          <textarea
            id="editor"
            className="editor"
            value={value || ""}
            onChange={(e) => {
              updateText(e.target.value);
              setUnsavedChanges(true);
            }}
          />
        </div>
        <div
          className={`content-panel__right ${
            previewShowing ? "visible" : null
          }`}
        >
          <Markdown
            className="markdown-content"
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeKatex]}
          >
            {value}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Editor;
