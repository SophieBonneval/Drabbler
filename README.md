# Drabbler

This is a simple Word counter app for writing drabbles (100 words). 

## Installation

Clone the repository, cd into it and run `npm install`:

```
git clone https://github.com/SophieBonneval/Drabbler.git
cd Drabbler
npm install
```

## Build the editor

Build the app and the editor library. This should create a build of the app in the `dist` folder and build the Tiny library `tinymce` in the `public` folder.

```
npm run build
npm run postinstall
```

## Start the server

```
npm run dev
```

The server will run on `http://127.0.0.1:4200/`.