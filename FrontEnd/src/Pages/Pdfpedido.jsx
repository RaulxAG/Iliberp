import React from 'react';
import { PDFViewer, Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// Estilos para el documento PDF
const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    title: {
        fontSize: 40,
        marginBottom: 10,
        textAlign: 'center',
    },
    section: {
        marginBottom: 10,
        border: '1px solid #ee3040',
        padding: 6,
        borderRadius: 5,
        margin: 5,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 5,
        textAlign: 'center',
        borderBottom: '1px solid #e65522',
    },
    item: {
        margin: 5,
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'flex-end', 
        marginBottom: 10,
    },
    logo: {
        width: 80, 
        height: 80,
    },
});

export default function Pdfpedido() {
    const { t } = useTranslation();
    const location = useLocation();
    const { direccion, carrito } = location.state || {};

    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page}>
                    <View style={styles.imageContainer}>
                        <Image src="/assets/img/logo.png" style={styles.logo} />
                    </View>

                    <Text style={styles.title}>{t('pedido')}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('datosEnvio')}</Text>
                        <Text style={styles.item}>{t('calle')}: {direccion?.calle}</Text>
                        <Text style={styles.item}>{t('provincia')}: {direccion?.provincia}</Text>
                        <Text style={styles.item}>{t('localidad')}: {direccion?.localidad}</Text>
                        <Text style={styles.item}>{t('codigoPostal')}: {direccion?.codigoPostal}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('productos')}</Text>
                        {carrito.map((producto, index) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.item}>{producto.nombre}</Text>
                                <Text style={styles.item}>{t('cantidad')}: {producto.cantidad}</Text>
                                <Text style={styles.item}>{t('precio')}: {producto.precio} euros</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};
