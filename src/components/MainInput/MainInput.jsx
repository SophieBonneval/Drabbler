import classes from "./MainInput.module.scss";
import { useRef } from "react";
import Quill from "quill";
import QuillEditor from "./QuillEditor";

function MainInput({ wordCount }) {
  const Delta = Quill.import("delta");
  const quillRef = useRef();

  return (
    <section className={classes["container"]}>
      <QuillEditor
        wordCount={wordCount}
        ref={quillRef}
        defaultValue={new Delta()}
      />
    </section>
  );
}

export default MainInput;
