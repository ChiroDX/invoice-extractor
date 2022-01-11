
import React, { useCallback, useMemo } from 'react';
import { useDropzone, FileWithPath, FileError } from 'react-dropzone'
import { Container, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import handlePDF from './PDFHandler';
import { convertToObject } from 'typescript';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


const FileDropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        handlePDF(acceptedFiles)

    }, [])
    const { acceptedFiles, fileRejections,
        getRootProps, getInputProps,
        isDragActive, isDragAccept, isDragReject } = useDropzone({
            onDrop,
            accept: "application/pdf"
        })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }: { file: FileWithPath, errors: FileError[] }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
        <Container maxWidth="sm">
            <div className="container">
                {/* @ts-ignore */}
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop pdf file in here</p>
                    <SaveAltIcon style={{ fontSize: "2.5em" }} />
                </div>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </Container>
    )
}

export default FileDropzone;