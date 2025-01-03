import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import classes from './MainInput.module.scss';
import PropTypes from 'prop-types';
import CopyButton from '../CopyButton/CopyButton';

function MainInput({ inputText }) {
  const initialValue = 'This is the initial content of the editor.';
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(initialValue);

  const handleEditorChange = (newValue, editor) => {
    setEditorValue(newValue);
    // Whenever you change the text, you want the inputText prop to be updated
    if (inputText) {
      inputText(editor.getContent({ format: 'text' }));
    }
  };

  function handleSelectAndCopy() {
    if (editorRef.current) {
      // Before selecting, put the focus on the text
      editorRef.current.focus();

      // Select the text
      editorRef.current.selection.select(editorRef.current.getBody(), true);

      // Copy the selected text
      editorRef.current.execCommand('copy');

      // Unselect the text
      editorRef.current.selection.collapse();
    }
  }

  return (
    <section className={classes['MainInput__container']}>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='your-license-key'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          wordCount: false,
          elementpath: false,
          branding: false,
          toolbar: 'undo redo |' + 'bold italic underline',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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
