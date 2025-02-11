import { useEffect, useState } from 'react';
import classes from './WordCounter.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function WordCounter({ inputText }) {
  const [wordCount, setWordCount] = useState(0);
  const [isDrabble, setIsDrabble] = useState(false);

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
        setIsDrabble(true);
      }, '1500');
    } else {
      setTimeout(() => {
        setIsDrabble(false);
      }, '1500');
    }
  }, [inputText]);

  return (
    <div
      className={classNames(classes['WordCounter__container'], {
        [classes['WordCounter__green']]: isDrabble,
      })}
    >
      {wordCount} Words
    </div>
  );
}

export default WordCounter;

WordCounter.propTypes = {
  inputText: PropTypes.string,
};
