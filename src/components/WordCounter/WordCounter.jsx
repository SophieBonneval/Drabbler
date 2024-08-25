import classes from './WordCounter.module.scss';

function WordCounter({ wordCountValue }) {
  return (
    <div className={classes['WordCounter__container']}>
      {wordCountValue} Words
    </div>
  );
}

export default WordCounter;
