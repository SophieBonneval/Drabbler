import { forwardRef, useEffect, useRef, useState } from "react";
import Quill from "quill";
import PropTypes from "prop-types";
import "quill/dist/quill.snow.css";

const QuillEditor = forwardRef(({ defaultValue, wordCount }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("article")
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
      placeholder: "Write something...",
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    function handleInputValue() {
      if (ref.current) {
        const inputValue = ref.current.getText().trim();
        const wordCountValue =
          inputValue !== "" ? inputValue.split(/\s+/).length : 0;

        // We're not CALLING the fn but setting it with the value of wordCountValue
        if (wordCount) {
          wordCount(wordCountValue);
        }
      }
    }

    quill.on("text-change", handleInputValue);

    // this return is used to *clear* the instance whenever the useEffect
    // refreshes (so when it renders again, eg. at line 45 it does so when
    // ref refreshes)
    return () => {
      ref.current = null;
      // restarting the event listener:
      quill.off("text-change", handleInputValue);
      container.innerHTML = "";
    };
  }, [ref]);

  return <section ref={containerRef}></section>;
});

QuillEditor.displayName = "Editor";

export default QuillEditor;

QuillEditor.propTypes = {
  defaultValue: PropTypes.object,
  wordCount: PropTypes.func,
};
