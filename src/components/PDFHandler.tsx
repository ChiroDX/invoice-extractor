import { FileWithPath } from "react-dropzone";

// @ts-ignore
import * as pdfjs from 'pdfjs-dist/es5/build/pdf';
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';


function readFileDataAsBase64(file: FileWithPath) {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event!.target!.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(file);
    });
}

const handlePDF = (files: FileWithPath[]) => {
    // Identify Company from name?
    // Identify Company from
    // Identify document with certain ID

    files.forEach(async (file) => {
        readFileDataAsBase64(file).then((data) => {
            // @ts-ignore
            pdfjsLib.getDocument(data).then((e) => {
                console.log(e)
            })
        })

    })


}



export default handlePDF;




