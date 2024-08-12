import { useRef } from 'react';
import classes from './MainInput.module.scss'
import Quill from 'quill';
import QuillEditor from './QuillEditor';

function MainInput() {
  const Delta = Quill.import('delta');
  const quillRef = useRef();

  return (
    <section className={classes['container']}>
      <QuillEditor ref={quillRef} defaultValue={new Delta()} />
    </section>
  );
}

export default MainInput;
