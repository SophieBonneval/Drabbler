import { useRef } from 'react';
import Quill from 'quill';
import QuillEditor from './QuillEditor';

function MainInput() {
  const Delta = Quill.import('delta');
  const quillRef = useRef();

  return (
    <section>
      <QuillEditor ref={quillRef} defaultValue={new Delta()} />
    </section>
  );
}

export default MainInput;
