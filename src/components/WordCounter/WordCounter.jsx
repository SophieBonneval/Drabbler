import { useEffect, useState } from 'react';
import classes from './WordCounter.module.scss';

function WordCounter({ inputText }) {
  const [wordCount, setWordCount] = useState(0);

  // the useEffect will refresh whenever the value of the dependencies (second argum.) changes
  useEffect(() => {
    if (inputText) {
      setWordCount(inputText.trim().split(/\s+/).length);
    }
  }, [inputText]);

  return (
    <div className={classes['WordCounter__container']}>{wordCount} Words</div>
  );
}

export default WordCounter;
