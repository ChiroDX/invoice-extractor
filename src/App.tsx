import React from 'react';
import logo from './logo.svg';
import './App.css';
// import FileDropzone from './components/Dropzone';
import PdfViewer from './components/PDFViewer';

function App() {
  return (
    <div>
      <PdfViewer url={"Rechnung_341777-3814.pdf"} />
    </div>
    // <FileDropzone />
  );
}

export default App;
