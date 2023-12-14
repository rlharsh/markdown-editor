import React, { useState, useContext, useEffect } from "react";

import "./editor.css";
import Markdown from "react-markdown";
import "katex/dist/katex.min.css";

import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";

import IconShowing from "remixicon-react/EyeLineIcon";
import IconNotShowing from "remixicon-react/EyeOffLineIcon";
import { DocumentContext } from "../Components/Providers/DocumentProvider/DocumentProvider";

const Editor = () => {
  const [value, setValue] = useState("# Hi, *Pluto*!");
  const [previewShowing, setPreviewShowing] = useState(false);

  const togglePreview = () => setPreviewShowing(!previewShowing);
  const { setTotalWords, currentDocument, setUnsavedChanges, unsavedChanges, setUpdatedBody } = useContext(DocumentContext);

  useEffect(() => {
    if (currentDocument) {
      setValue(currentDocument.body);
    }
  }, [currentDocument]);

  const updateText = (value) => {
    if (currentDocument) {
      setValue(value);
      setUnsavedChanges(true);
      const regEx = /\s+/gi;
      setTotalWords(document.getElementById("editor").value.trim().replace(regEx, " ").split(" ").length);
    }
  };

  return (
    <div className="editor-window">
      <div className="top-panel">
        <div className="top-panel__left">
          <p>{previewShowing ? "PREVIEW" : "MARKDOWN"}</p>
          <button onClick={togglePreview}>{previewShowing ? <IconNotShowing /> : <IconShowing />}</button>
        </div>
        <div className={`top-panel__right ${previewShowing ? "hidden" : null}`}>
          <p>PREVIEW</p>
          <button onClick={togglePreview}>{previewShowing ? <IconNotShowing /> : <IconShowing />}</button>
        </div>
      </div>
      <div className="content-panel">
        <div className={`content-panel__left ${previewShowing ? "hidden" : null}`}>
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
        <div className={`content-panel__right ${previewShowing ? "visible" : null}`}>
          <Markdown className="markdown-content" remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeKatex]}>
            {value}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Editor;
