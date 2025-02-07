import { useEffect, useState } from "react";
import classes from "./WordCounter.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

function WordCounter({ inputText }) {
  const [wordCount, setWordCount] = useState(0);

  // the useEffect will refresh whenever the value of the dependencies (second argum.) changes
  useEffect(() => {
    const inputTextCleaned = inputText.trim();

    if (inputTextCleaned) {
      const wordCountValue = inputTextCleaned
        .split(/\s+/)
        .filter((word) => !word.match(/^[\p{P}]+$/u)).length;
      setWordCount(wordCountValue);
    } else {
      setWordCount(0);
    }
  }, [inputText]);

  return (
    <div
      className={classNames(classes["WordCounter__container"], {
        [classes["WordCounter__green"]]: wordCount === 100,
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
