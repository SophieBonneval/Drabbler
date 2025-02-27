import { useState } from 'react';
import classes from './App.module.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainInput from './components/MainInput/MainInput';
import WordCounter from './components/WordCounter/WordCounter';

function App() {
  const [inputText, setInputText] = useState('');
  const [isDrabble, setIsDrabble] = useState(false);

  function handleInputText(text) {
    setInputText(text);
  }

  function handleIsDrabble(boolean) {
    setIsDrabble(boolean);
  }

  return (
    <div className={classes['App__container']}>
      <Header />
      <main className={isDrabble ? classes['background__green'] : ''}>
        <WordCounter inputText={inputText} isDrabble={handleIsDrabble} />
        <MainInput inputText={handleInputText} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
