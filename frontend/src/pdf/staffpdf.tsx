import { Button } from "@/components/ui/button";

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
    reportTitle: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 0, // Removed extra space
    },
    datePeriod: {
      textAlign: "center",
      fontSize: 12,
      color: "black",
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
      textDecoration: "underline",
    },
    table: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 10,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 12,
      paddingVertical: 2,
    },
    tableCell: {
      flex: 1,
      textAlign: "left",
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
  });

  const date = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const datePeriod = "April 1, 2025 - April 30, 2025";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Letterhead */}
        <View style={styles.header}>
          <Image style={styles.logo} src={Logo} />
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

        {/* Report Title */}
        <Text style={styles.reportTitle}>Staff Management Report</Text>
        {/* Date Period */}
        <Text style={styles.datePeriod}>Date Period: {datePeriod}</Text>

        {/* Content */}
        <View>
          {/* Attendance Section */}
          <Text style={styles.sectionTitle}>Attendance of Staff</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Present:</Text>
              <Text style={styles.tableCell}>25</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Absent:</Text>
              <Text style={styles.tableCell}>3</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Late:</Text>
              <Text style={styles.tableCell}>2</Text>
            </View>
          </View>

          {/* Payroll Section */}
          <Text style={styles.sectionTitle}>Payroll of Staff</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total Basic Salary Paid:</Text>
              <Text style={styles.tableCell}>LKR 500,000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total Allowances Paid:</Text>
              <Text style={styles.tableCell}>LKR 50,000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>EPF Contributions:</Text>
              <Text style={styles.tableCell}>LKR 60,000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>ETF Contributions:</Text>
              <Text style={styles.tableCell}>LKR 30,000</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Net Salary Paid:</Text>
              <Text style={styles.tableCell}>LKR 460,000</Text>
            </View>
          </View>

          {/* New Joiners Section */}
          <Text style={styles.sectionTitle}>New Joiners (This Month)</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>New Joiners:</Text>
              <Text style={styles.tableCell}>5</Text>
            </View>
          </View>

          {/* Leaves Section */}
          <Text style={styles.sectionTitle}>Leaves of Staff</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Sick Leaves:</Text>
              <Text style={styles.tableCell}>10</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Casual Leaves:</Text>
              <Text style={styles.tableCell}>8</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Annual Leaves:</Text>
              <Text style={styles.tableCell}>15</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Unpaid Leaves:</Text>
              <Text style={styles.tableCell}>2</Text>
            </View>
          </View>
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