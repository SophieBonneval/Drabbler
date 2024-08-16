import { useState } from "react";
import classes from "./App.module.scss";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainInput from "./components/MainInput/MainInput";
import WordCounter from "./components/WordCounter/WordCounter";

function App() {
  const [wordCountValue, setWordCountValue] = useState(0);

  function handlerWordCount(value) {
    setWordCountValue(value);
  }

  return (
    <div className={classes["container"]}>
      <Header />
      <main>
        <WordCounter wordCountValue={wordCountValue} />
        <MainInput wordCount={handlerWordCount} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
