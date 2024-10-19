import { useState } from 'react';
import classes from './App.module.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainInput from './components/MainInput/MainInput';
import WordCounter from './components/WordCounter/WordCounter';

function App() {
  const [inputText, setInputText] = useState('');

  function handleInputText(text) {
    setInputText(text);
  }

  return (
    <div className={classes['App__container']}>
      <Header />
      <main>
        <WordCounter inputText={inputText} />
        <MainInput inputText={handleInputText} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
