import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import classes from './MainInput.module.scss';
import PropTypes from 'prop-types';

function MainInput({ inputText }) {
  const initialValue = '';
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(initialValue);

  // Update the inputText prop whenever the text changes
  const handleEditorChange = (newValue, editor) => {
    setEditorValue(newValue);
    if (inputText) {
      inputText(editor.getContent({ format: 'text' }));
    }
  };

  // Cleaning pasted content
  const cleanPastedContent = (content, isHtml = false) => {
    let cleanedContent;

    // If the content is HTML
    if (isHtml || (content.includes('<') && content.includes('>'))) {
      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;

      // Get all elements in an array
      let allElements = [...tempDiv.getElementsByTagName('*')];

      // Remove all strong tags
      // allElements
      //   .filter((el) => el.tagName === 'STRONG')
      //   .forEach((strongEl) => {
      //     const parent = strongEl.parentNode;
      //     const textContent = document.createTextNode(strongEl.textContent);
      //     parent.replaceChild(textContent, strongEl);
      //   });

      // Define allowed styles
      const allowedStyles = ['fontWeight', 'fontStyle', 'textDecoration'];

      // Process each element
      allElements.forEach((element) => {
        // Preserve allowed styles
        const styles = element.style;
        const preservedProperties = {};
        allowedStyles.forEach((style) => {
          preservedProperties[style] = styles[style];
        });

        // Remove all style attributes
        element.removeAttribute('style');

        // Re-apply allowed styles
        allowedStyles.forEach((style) => {
          if (preservedProperties[style]) {
            element.style[style] = preservedProperties[style];
          }
        });
      });

      cleanedContent = tempDiv.innerHTML;
    } else {
      // Plain text - wrap in paragraphs
      const paragraphs = content.split('\n').map((line) => `<p>${line}</p>`);

      cleanedContent = paragraphs.join('\n');
    }

    return cleanedContent;
  };

  // Tiny MCE editor initialization
  const handleInit = (evt, editor) => {
    editorRef.current = editor;

    // Declaring cut custom button
    editor.ui.registry.addButton('cutAll', {
      icon: 'cut',
      tooltip: 'Cut all content',
      onAction: () => {
        if (editorRef.current) {
          // If something is selected, cut the selected content
          if (!editorRef.current.selection.isCollapsed()) {
            editorRef.current.execCommand('cut');
          } else {
            // If nothing is selected, focus on the field and select all the content
            editorRef.current.focus();
            editorRef.current.selection.select(
              editorRef.current.getBody(),
              true
            );
            // Cut the selected text
            editorRef.current.execCommand('cut');
          }
        }
      },
    });

    // Declaring copy custom button
    editor.ui.registry.addButton('copyAll', {
      icon: 'copy',
      tooltip: 'Copy all content',
      onAction: () => {
        if (editorRef.current) {
          // If something is selected, copy the selected content
          if (!editorRef.current.selection.isCollapsed()) {
            editorRef.current.execCommand('copy');
          } else {
            // If nothing is selected, focus on the field and select all the content
            editorRef.current.focus();
            editorRef.current.selection.select(
              editorRef.current.getBody(),
              true
            );
            // Copy the selected text
            editorRef.current.execCommand('copy');
            // Unselect the text
            editorRef.current.selection.collapse();
          }
        }
      },
    });

    // Declaring paste custom button
    editor.ui.registry.addButton('pasteAll', {
      icon: 'paste',
      tooltip: 'Paste',
      onAction: async () => {
        if (!editorRef.current) return;

        try {
          // Request clipboard access
          const clipboardItems = await navigator.clipboard.read();

          // Determine whether the clipboard contains HTML or plain text
          const hasHtml = clipboardItems[0].types.includes('text/html');

          const contentType = hasHtml ? 'text/html' : 'text/plain';

          // Retrieve clipboard content as text
          const content = await clipboardItems[0]
            .getType(contentType)
            .then((blob) => blob.text());

          // If something is selected, replace the selected content by pasting
          if (!editorRef.current.selection.isCollapsed()) {
            // Clean and insert the clipboard content instead of the selection
            editorRef.current.selection.setContent(
              cleanPastedContent(content, hasHtml)
            );
          } else {
            // Clean and insert the clipboard content at the cursor position
            editor.execCommand(
              'mceInsertContent',
              false,
              cleanPastedContent(content, hasHtml)
            );
          }
        } catch (err) {
          console.error('Clipboard access error:', err);
        }
      },
    });

    // Handle paste event
    editor.on(
      'paste',
      function (e) {
        e.preventDefault();

        // Get the clipboard data as html
        const htmlContent = (e.clipboardData || window.clipboardData).getData(
          'text/html'
        );

        if (htmlContent) {
          // If something is selected, replace the selected content by pasting
          if (!editorRef.current.selection.isCollapsed()) {
            // Clean and insert the clipboard content instead of the selection
            editorRef.current.selection.setContent(
              cleanPastedContent(htmlContent, true)
            );
          } else {
            // Clean and insert the clipboard content at the cursor position
            editor.execCommand(
              'mceInsertContent',
              false,
              cleanPastedContent(htmlContent, true)
            );
          }
        } else {
          // Get plain text content
          const plainContent = (
            e.clipboardData || window.clipboardData
          ).getData('text/plain');

          // If something is selected, replace the selected content by pasting
          if (!editorRef.current.selection.isCollapsed()) {
            // Clean and insert the clipboard content instead of the selection
            editorRef.current.selection.setContent(
              cleanPastedContent(plainContent)
            );
          } else {
            // Clean and insert the clipboard content at the cursor position
            editor.execCommand(
              'mceInsertContent',
              false,
              cleanPastedContent(plainContent)
            );
          }
        }

        return false;
      },
      true
    );
  };

  return (
    <section className={classes['MainInput__container']}>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="your-license-key"
        onInit={handleInit}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'autosave',
            'lists',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          autosave_interval: '5s',
          autosave_restore_when_empty: true,
          autosave_ask_before_unload: false,
          autosave_prefix: 'editorContent',
          autosave_retention: 'infinity',
          wordCount: false,
          elementpath: false,
          branding: false,
          toolbar:
            'undo redo |' +
            'bold italic underline |' +
            'cutAll copyAll pasteAll|' +
            'selectAll',
          toolbar_sticky: true,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          auto_focus: true,
        }}
        onEditorChange={(newValue, editor) => {
          handleEditorChange(newValue, editor);
        }}
        value={editorValue}
      />
    </section>
  );
}

export default MainInput;

MainInput.propTypes = {
  inputText: PropTypes.func,
};
