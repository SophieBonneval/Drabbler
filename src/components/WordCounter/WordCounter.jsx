import classes from "./WordCounter.module.scss";

function WordCounter({ wordCountValue }) {
  return <div className={classes["container"]}>{wordCountValue} Words</div>;
}

export default WordCounter;
