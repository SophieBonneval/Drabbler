import { useEffect, useState } from 'react';
import classes from './WordCounter.module.scss';
import PropTypes from 'prop-types';

function WordCounter({ inputText, isDrabble }) {
  const [wordCount, setWordCount] = useState(0);

  // the useEffect will refresh whenever the value of the dependencies (second argum.) changes
  useEffect(() => {
    const inputTextCleaned = inputText.trim();
    const newWordCountValue = inputTextCleaned
      ? inputTextCleaned
          .split(/\s+/)
          .filter((word) => !word.match(/^[\p{P}]+$/u)).length
      : 0;

    // This way we don't go back and forth between the useEffect and out, but keep it all inside the useEffect:
    setWordCount(newWordCountValue);

    // Handles the delayed class:
    if (newWordCountValue === 100) {
      setTimeout(() => {
        isDrabble(true);
      }, '1500');
    } else {
      setTimeout(() => {
        isDrabble(false);
      }, '1500');
    }
  }, [inputText]);

  return (
    <div className={classes['WordCounter__container']}>{wordCount} Words</div>
  );
}

export default WordCounter;

WordCounter.propTypes = {
  inputText: PropTypes.string,
  isDrabble: PropTypes.func,
};
