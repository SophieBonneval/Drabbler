import classes from './App.module.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainInput from './components/MainInput/MainInput';

function App() {
  return (
    <div className={classes['App__container']}>
      <Header />
      <main>
        <MainInput />
      </main>
      <Footer />
    </div>
  );
}

export default App;
