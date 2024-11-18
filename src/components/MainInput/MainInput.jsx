import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import classes from './MainInput.module.scss';
import PropTypes from 'prop-types';
import CopyButton from '../CopyButton/CopyButton';

function MainInput({ inputText }) {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState('');

  const handleEditorChange = (newValue, editor) => {
    setEditorValue(newValue);

    // Whenever you change the text, you want the inputText prop to be updated:
    // But first, you need to check its existence, because they're not mandatory
    if (inputText) {
      inputText(editor.getContent({ format: 'text' }));
    }
  };

  function handleSelectAndCopy() {
    // Before selecting, put the focus on the text
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.selection.select(editorRef.current.getBody(), true);
      document.execCommand('copy');
    }
  }

  return (
    <section className={classes['MainInput__container']}>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='your-license-key'
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
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
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
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
  wordCount: PropTypes.func,
};
