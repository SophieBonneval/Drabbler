import { useEffect, useState } from 'react';
import classNames from 'classnames';
import classes from './WordCounter.module.scss';

function WordCounter({ inputText }) {
  const [wordCount, setWordCount] = useState(0);

  // the useEffect will refresh whenever the value of the dependencies (second argum.) changes
  useEffect(() => {
    console.log('INPUTTEXT', inputText); 
    const wordCountValue = inputText.trim().split(/\s+/).length;
    setWordCount(wordCountValue);
    if (inputText) {
      const wordCountValue = inputText.trim().split(/\s+/).length;
      setWordCount(wordCountValue);
      console.log('WORDCOUNTVALUE', wordCountValue);
      console.log('WORDCOUNT', wordCount); 
    }
  }, [inputText]);

  return (
    <div className={classNames(classes['WordCounter__container'], {
      [classes['WordCounter__green']]: true
    })}>{wordCount} Words</div>
  );
}

export default WordCounter;
