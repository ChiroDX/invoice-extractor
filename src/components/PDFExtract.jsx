import React, { useEffect, useState, useRef, useCallback } from "react";
// @ts-ignore
// import * as pdfjs from "pdfjs-dist/build/pdf";
import { pdfjs } from "react-pdf";

const PDFExtract = ({ url }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const loadingTask = pdfjs.getDocument(url);
  return loadingTask.promise
    .then((loadedPdf) => {
      return loadedPdf.getPage(1);
    })
    .then((page) => {
      return page.getTextContent({ normalizeWhitespace: true });
    });
};

export default PDFExtract;
