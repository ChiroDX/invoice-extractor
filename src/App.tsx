import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileDropzone from './components/Dropzone';
import PdfViewer from './components/PDFViewer';

function App() {

  return (
    <div>
      {/* <PdfViewer url={"example.pdf"} /> */}
      <FileDropzone />
    </div>

  );
}

export default App;
