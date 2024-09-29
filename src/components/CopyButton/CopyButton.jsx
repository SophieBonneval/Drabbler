import { MdOutlineContentCopy } from 'react-icons/md';
import classes from './CopyButton.module.scss';

function CopyButton() {
  return (
    <button className={classes['CopyButton__container']}>
      <MdOutlineContentCopy size={24} />
    </button>
  );
}

export default CopyButton;
