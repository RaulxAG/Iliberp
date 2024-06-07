import React from 'react';
import { PDFViewer, Document, Page, Text,StyleSheet,View,Image  } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';

const styles = StyleSheet.create({
    page: {
      padding: 20,
      backgroundImage: 'url("/assets/img/logo.png/")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    title: {
      fontSize: 40,
      marginBottom: 10,
      textAlign:'center'
    },
    section: {
      marginBottom: 10,
      border: '1px solid #ee3040',
      padding:6,
      borderRadius:5,
      margin:5,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 5,
      padding:5,
      textAlign:'center',
      borderBottom:'1px solid #e65522',
    },
    item: {
      margin: 5,
      fontSize:16,
      
    },
});

export default function Pdfpedido(){
    const location = useLocation();
    const { direccion, carrito } = location.state || {};
    console.log(direccion)
    console.log(carrito)
    
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
          <Document>
            <Page style={styles.page}>
              <Text style={styles.title}>Pedido</Text>
    
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datos dirección de envío</Text>
                <Text style={styles.item}>Calle: {direccion?.calle}</Text>
                <Text style={styles.item}>Ciudad: {direccion?.ciudad}</Text>
                <Text style={styles.item}>Código Postal: {direccion?.codigoPostal}</Text>
              </View>
    
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Productos</Text>
                {carrito.map((producto, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.item}>{producto.nombre}</Text>
                    <Text style={styles.item}>Cantidad: {producto.cantidad}</Text>
                    <Text style={styles.item}>Precio: {producto.precio} euros</Text>
                  </View>
                ))}
              </View>
              <Image src="/assets/img/logo.png" />
            </Page>
          </Document>
        </PDFViewer>
    );
};