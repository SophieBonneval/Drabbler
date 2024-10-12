import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the `import.meta.url` to a path and make it cross-platform friendly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the top directory where your project lives
const topDir = path.resolve(__dirname);

// Empty the 'public/tinymce' directory and copy the 'tinymce' from 'node_modules'
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(
  path.join(topDir, 'node_modules', 'tinymce'),
  path.join(topDir, 'public', 'tinymce'),
  { overwrite: true }
);
