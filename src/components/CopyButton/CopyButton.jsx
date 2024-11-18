import { MdOutlineContentCopy } from 'react-icons/md';
import classes from './CopyButton.module.scss';

function CopyButton({ handleSelectAndCopy }) {
  return (
    <button
      className={classes['CopyButton__container']}
      onClick={handleSelectAndCopy}
    >
      <MdOutlineContentCopy size={24} />
    </button>
  );
}

export default CopyButton;
