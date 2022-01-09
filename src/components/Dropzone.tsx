
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { Container, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


const Dropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Container maxWidth="sm">
            <div {...getRootProps()} style={{ display: "grid", alignItems: "center", backgroundColor: '#cfe8fc', height: '300px' }}>
                <input {...getInputProps({
                    //Its important to filter, because somehow .cdrt files makes the HTML5 Filepicker to crash
                    //Add more filters if any forgotten
                    accept: "image/*, .eps"
                })} />
                {
                    isDragActive ?
                        <div ><Typography variant="h1">Datei hier reinziehen ...</Typography></div>
                        :
                        <div>
                            <Typography variant="h5">
                                <div style={{ textAlign: "center" }}> Datei hier reinziehen,<br /> oder für die Dateiauswahl klicken</div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><SaveAltIcon style={{ fontSize: "2.5em" }} /></div>
                            </Typography>
                        </div>

                }
            </div>
        </Container>
    )
}

export default Dropzone;