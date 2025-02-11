import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import classes from "./MainInput.module.scss";
import PropTypes from "prop-types";
import CopyButton from "../CopyButton/CopyButton";

function MainInput({ inputText }) {
  const initialValue = "";
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(initialValue);

  const handleEditorChange = (newValue, editor) => {
    setEditorValue(newValue);
    // Whenever you change the text, you want the inputText prop to be updated
    if (inputText) {
      inputText(editor.getContent({ format: "text" }));
    }
  };

  function handleSelectAndCopy() {
    if (editorRef.current) {
      // Before selecting, put the focus on the text
      editorRef.current.focus();
      // Select the text
      editorRef.current.selection.select(editorRef.current.getBody(), true);
      // Copy the selected text
      editorRef.current.execCommand("copy");
      // Unselect the text
      editorRef.current.selection.collapse();
    }
  }

  const handleInit = (evt, editor) => {
    editorRef.current = editor;
    editor.on(
      "paste",
      function (e) {
        // Prevent the default paste behavior
        e.preventDefault();

        // Get the clipboard data as html
        let content = (e.clipboardData || window.clipboardData).getData(
          "text/html"
        );

        // Create a variable to store the cleaned content
        let cleanedContent = null;

        // If there is a content with markdown
        if (content) {
          // Create a temporary div to parse the HTML
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = content;

          // Get all elements in an array
          let allElements = [...tempDiv.getElementsByTagName("*")];

          // Remove all strong tags
          allElements
            .filter((el) => el.tagName === "STRONG")
            .forEach((strongEl) => {
              const parent = strongEl.parentNode;
              const textContent = document.createTextNode(strongEl.textContent);
              parent.replaceChild(textContent, strongEl);
            });

          // Define allowed styles
          const allowedStyles = ["fontWeight", "fontStyle", "textDecoration"];

          // Process each element
          allElements.forEach((element) => {
            // Preserve allowed styles
            const styles = element.style;
            const preservedProperties = {};
            allowedStyles.forEach((style) => {
              preservedProperties[style] = styles[style];
            });

            // Remove all style attributes
            element.removeAttribute("style");

            // Re-apply allowed styles
            allowedStyles.forEach((style) => {
              if (preservedProperties[style]) {
                element.style[style] = preservedProperties[style];
              }
            });
          });

          cleanedContent = tempDiv.innerHTML;
          // If there's no HTML content
        } else {
          // Get the plain text content
          content = (e.clipboardData || window.clipboardData).getData(
            "text/plain"
          );
          // Split the text by line breaks and wrap each line in paragraph tags
          const paragraphs = content
            .split("\n")
            .map((line) => `<p>${line}</p>`);

          // Join the paragraphs with newlines for better readability
          cleanedContent = paragraphs.join("\n");
        }

        // Get the current selection
        const selection = editor.selection.getContent();

        // If there's a selection, replace it with the cleaned content
        if (selection) {
          editor.selection.setContent(cleanedContent || content);
        } else {
          // Otherwise insert at cursor
          editor.insertContent(cleanedContent || content);
        }
        return false;
      },
      true
    );
  };

  return (
    <section className={classes["MainInput__container"]}>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="your-license-key"
        onInit={handleInit}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          wordCount: false,
          elementpath: false,
          branding: false,
          toolbar: "undo redo |" + "bold italic underline",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          auto_focus: true,
        }}
        onEditorChange={(newValue, editor) => {
          handleEditorChange(newValue, editor);
        }}
        value={editorValue}
      />
      <CopyButton handleSelectAndCopy={handleSelectAndCopy} />
    </section>
  );
}

export default MainInput;

MainInput.propTypes = {
  inputText: PropTypes.func,
};
