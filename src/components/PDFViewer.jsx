import React, { useEffect, useState, useRef, useCallback } from 'react';
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";



export default function PdfViewer({ url }) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const canvasRef = useRef();

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const extractText = loadedPdf => {
    console.log(loadedPdf.numPages)
    loadedPdf.getPage(currentPage)
      .then(page => {
        return page.getTextContent();
      })
      .then(tokenizedText => {
        console.log(tokenizedText)
        const pageText = tokenizedText.items.map(token => token.str).join("");
        console.log(pageText)
        return pageText
      })
  }

  const renderPage = useCallback((pageNum, pdf = pdfRef) => {
    pdf && pdf.getPage(pageNum).then(function (page) {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      page.render(renderContext);
    });
  }, [pdfRef]);

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(loadedPdf => {
      //console.log(loadedPdf)
      // setPdfRef(loadedPdf);
      extractText(loadedPdf)

    }, function (reason) {
      console.error(reason);
    });
  }, [url]);

  const nextPage = () => pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return <canvas ref={canvasRef}></canvas>;
}