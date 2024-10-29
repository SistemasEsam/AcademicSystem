import React from "react";
import { PDFDownloadLink, Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    margin: 10,
    paddingTop: 15,
    paddingBottom:40,
    paddingHorizontal: 20
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  leftColumn: {
    width: "35%",
    backgroundColor: "#1d2a44",
    color: "white",
    padding: 20,
    borderRight: "2px solid black",
  },
  profileImage: {
    borderRadius: "50%",
    width: 110,
    height: 110,
    marginBottom: 20,
    border: "5px solid #fdd835",
  },
  leftColumnHeading: {
    fontSize: 14,
    marginBottom: 10,
  },
  leftColumnText: {
    marginVertical: 5,
    fontSize: 11,
  },
  rightColumn: {
    width: "65%",
    padding: 30,
  },
  rightColumnHeading: {
    fontSize: 16,
    color: "#1d2a44",
    marginBottom: 15,
    borderBottom: "1px solid #1d2a44",
    paddingBottom: 5,
  },
  rightColumnText: {
    marginVertical: 8,
    fontSize: 12,
  },
  listItem: {
    marginBottom: 10,
    padding: 5,
    borderBottom: "1px solid #ddd",
  },
  
});

const PDFContent = ({ postulante }) => (
  <Document>
    <Page size="LEGAL" style={styles.page} wrap>
      <View style={styles.container}>
      
        <View style={styles.leftColumn}>
          <Image src="/images/Amed.jpg" style={styles.profileImage} />
          <Text style={styles.leftColumnHeading}>{postulante.nombre}</Text>
          <Text style={{ fontSize: 9 }}>{postulante.email}</Text>
          <Text style={styles.leftColumnText}>{postulante.documento}</Text>
          <Text style={styles.leftColumnText}>{postulante.telefono}</Text>
        </View>

     
        <View style={styles.rightColumn}>
          <Text style={styles.rightColumnHeading}>Estudios Pregrado</Text>
          {postulante.pregrado?.map((pregrado, index) => (
            <View key={index} style={styles.listItem} wrap={false}>
              <Text style={styles.rightColumnText}>Carrera: {pregrado.carrera}</Text>
              <Text style={styles.rightColumnText}>Universidad: {pregrado.universidad}</Text>
              <Text style={styles.rightColumnText}>País: {pregrado.pais}</Text>
              <Text style={styles.rightColumnText}>Año: {pregrado.anio}</Text>
              <Text style={styles.rightColumnText}>Modalidad: {pregrado.modalidad}</Text>
            </View>
          ))}

          <Text style={styles.rightColumnHeading}>Estudios Postgrado</Text>
          {postulante.postgrado?.map((postgrado, index) => (
            <View key={index} style={styles.listItem} wrap={false}>
              <Text style={styles.rightColumnText}>Nombre: {postgrado.nombre}</Text>
              <Text style={styles.rightColumnText}>Universidad: {postgrado.universidad}</Text>
              <Text style={styles.rightColumnText}>País: {postgrado.pais}</Text>
              <Text style={styles.rightColumnText}>Año: {postgrado.anio}</Text>
              <Text style={styles.rightColumnText}>Modalidad: {postgrado.modalidad}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export const PostulantePDF = ({ postulante }) => (
  <div>
    <PDFDownloadLink
      document={<PDFContent postulante={postulante} />}
      fileName={`${postulante.nombre}_CV.pdf`}
    >
      {({ loading }) => (
        <button className="download-btn">
          {loading ? "Generando PDF..." : "Descargar PDF"}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);
