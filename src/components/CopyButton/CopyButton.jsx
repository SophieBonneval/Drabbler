import { MdOutlineContentCopy } from 'react-icons/md';
import classes from './CopyButton.module.scss';

function CopyButton({ inputValue }) {
  function handleCopyBtn() {
    navigator.clipboard.writeText(inputValue);
  }

  return (
    <button
      onClick={handleCopyBtn}
      className={classes['CopyButton__container']}
    >
      <MdOutlineContentCopy size={24} />
    </button>
  );
}

export default CopyButton;
