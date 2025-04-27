import { Button } from "@/components/ui/button";
import { Finance_BalanceSheet_auto } from "@/utils/API/finance/Finance_BalanceSheet_API";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const Pdf = () => {
  return (
    <>
      <div>pdf</div>
      {/* ------------------------------------- */}
      {/* copy this btn */}
      <Button asChild>
        <PDFDownloadLink
          document={<PdfTemplate />}
          fileName="report.pdf"
          className=" cursor-pointer"
        >
          {({ loading }) => (loading ? "Loading..." : "Download PDF")}
        </PDFDownloadLink>
      </Button>
      {/* ------------------------------------------ */}

      <br />
      {/* Live Preview of the PDF */}
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        <PdfTemplate />
      </PDFViewer>
    </>
  );
};

export default Pdf;

// this is the pdf template

import Logo from "@/assets/logo.png";
import { Buffer } from "buffer";

window.Buffer = Buffer;
const PdfTemplate = () => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #000",
      paddingBottom: 1,
      marginBottom: 1,
    },
    logo: {
      width: 45,
      height: 70,
    },
    companyDetails: {
      textAlign: "right",
      flex: 1,
      marginLeft: 20,
    },
    companyName: {
      fontSize: 14,
      fontWeight: "bold",
      paddingBottom: 5,
    },
    contactDetails: {
      fontSize: 10,
      color: "gray",
      paddingBottom: 2,
    },
    footer: {
      marginTop: 1,
      borderTop: "1px solid #000",
      paddingTop: 1,
      textAlign: "center",
    },
    signature: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    signatureLine: {
      // width: "40%",
      // borderBottom: "1px solid #000",
      marginTop: 0,
    },
    signatureText: {
      fontSize: 10,
      textAlign: "center",
      marginTop: 1,
    },
    date: {
      fontSize: 10,
      textAlign: "right",
      marginTop: 1,
    },
    dateTop: {
      fontSize: 10,
      textAlign: "right",
      marginTop: 1,
    },

    contentBasic: {
      fontSize: 12,
      marginTop: 20,
      textAlign: "left",
      paddingBottom: 10,
    },
  });

  const date = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Letterhead */}
        <View style={styles.header}>
          {/* Logo */}
          <Image style={styles.logo} src={Logo} />
          {/* Company Details */}
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>Imperial Cashews</Text>
            <Text style={styles.contactDetails}>
              Eluwapola, Wewagama, Kuliyapitiya
            </Text>
            <Text style={styles.contactDetails}>
              Email: imperialcashews@gmail.com
            </Text>
            <Text style={styles.contactDetails}>Phone: 0762470513</Text>
          </View>
        </View>

        {/* Content Placeholder */}
        <View>
          <Text style={styles.contentBasic}>Content goes here...</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signature}>
            <View>
              <Text style={styles.dateTop}> </Text>
              <Text style={styles.signatureLine}>------------------</Text>
              <Text style={styles.signatureText}>Signature</Text>
            </View>
            <View>
              <Text style={styles.dateTop}>{date}</Text>
              <Text style={styles.signatureLine}>--------------------</Text>
              <Text style={styles.date}>Report Generated Date & Time</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
