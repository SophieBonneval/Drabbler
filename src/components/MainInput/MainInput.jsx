import classes from './MainInput.module.scss';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import QuillEditor from './QuillEditor';
import CopyButton from '../CopyButton/CopyButton';

function MainInput({ wordCount }) {
  const Delta = Quill.import('delta');
  const quillRef = useRef();
  const [inputValue, setInputValue] = useState('');

  //useEffect for word counter?

  useEffect(() => {
    const quill = quillRef.current;

    function handleInputValue() {
      if (quill) {
        const inputValue = quill.getText().trim();
        const wordCountValue =
          inputValue !== '' ? inputValue.split(/\s+/).length : 0;

        // We're not CALLING the fn but setting it with the value of wordCountValue
        if (wordCount) {
          wordCount(wordCountValue);
        }

        setInputValue(quill.root.innerText);
      }
    }

    quill.on('text-change', handleInputValue);

    // this return is used to *clear* the instance whenever the useEffect
    // refreshes (so when it renders again, eg. at line 45 it does so when
    // ref refreshes)
    return () => {
      // restarting the event listener:
      quill.off('text-change', handleInputValue);
    };
    //we've added the wordCount dependency because we want the useEffect to
    //rerender whenever it changes, even if it probably won't happen
  }, [quillRef, wordCount]);

  return (
    <section className={classes['MainInput__container']}>
      <QuillEditor ref={quillRef} defaultValue={new Delta()} />
      <CopyButton inputValue={inputValue} />
    </section>
  );
}

export default MainInput;

QuillEditor.propTypes = {
  wordCount: PropTypes.func,
};
