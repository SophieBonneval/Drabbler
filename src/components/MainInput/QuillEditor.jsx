import { forwardRef, useEffect, useRef } from 'react';
import Quill from 'quill';
import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';

const QuillEditor = forwardRef(({ defaultValue }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('article')
    );
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      placeholder: 'Write something...',
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    return () => {
      ref.current = null;
      container.innerHTML = '';
    };
  }, [ref]);

  return <section ref={containerRef}></section>;
});

QuillEditor.displayName = 'Editor';

export default QuillEditor;

QuillEditor.propTypes = {
  defaultValue: PropTypes.object,
};
