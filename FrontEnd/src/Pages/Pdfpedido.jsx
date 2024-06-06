import React from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
export default function Pdfpedido(){
    const location = useLocation();
    const { direccion, carrito } = location.state || {};
    console.log(location)
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page>
                    <Text>
                        ¡Hola! Este es un PDF generado con @react-pdf/renderer.
                    </Text>
                    <Text>Dirección:</Text>
                    <Text>Calle: {direccion?.calle}</Text>
                    <Text>Ciudad: {direccion?.ciudad}</Text>
                    <Text>Código Postal: {direccion?.codigoPostal}</Text>
                </Page>
            </Document>
        </PDFViewer>
    );
};