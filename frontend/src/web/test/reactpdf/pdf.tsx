

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

const Pdf = () => {
  return (
    <>
      <div>pdf</div>
      <PDFDownloadLink document={<PdfTemplate />} fileName="report.pdf">
        {({ loading }) => (loading ? "Loading..." : "Download PDF")}
      </PDFDownloadLink>
      {/* <PDFViewer width="100%" height="600">
        {PdfTemplate()}
      </PDFViewer> */}


<br />
      {PdfTemplate()}
    </>
  );
};

export default Pdf;

// Sample Invoice Data
const invoiceData = {
  id: "INV-2023-0011",
  date: "April 20, 2025",
  dueDate: "May 20, 2025",
  company: {
    name: "Your Company Name",
    address: "123 Business Street",
    city: "San Francisco, CA 94103",
    email: "contact@yourcompany.com",
    phone: "(123) 456-7890",
  },
  customer: {
    name: "Client Name",
    address: "456 Client Avenue",
    city: "New York, NY 10001",
    email: "client@example.com",
  },
  items: [
    { description: "Website Design", quantity: 1, rate: 1200, amount: 1200 },
    { description: "Hosting (1 year)", quantity: 1, rate: 300, amount: 300 },
    { description: "Domain Name (1 year)", quantity: 1, rate: 20, amount: 20 },
    { description: "SSL Certificate", quantity: 1, rate: 75, amount: 75 },
  ],
  subtotal: 1595,
  tax: 159.5,
  total: 1754.5,
};

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "column",
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3B82F6",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginTop: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 30,
  },
  tableRowHeader: {
    backgroundColor: "#F9FAFB",
  },
  tableCol: {
    width: "25%",
    paddingLeft: 8,
  },
  tableColHeader: {
    width: "25%",
    fontWeight: "bold",
    paddingLeft: 8,
  },
  tableColAmount: {
    width: "25%",
    textAlign: "right",
    paddingRight: 8,
  },
  tableColHeaderAmount: {
    width: "25%",
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 8,
  },
  totals: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginBottom: 5,
  },
  totalsLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  totalsValue: {
    fontSize: 12,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    borderTopStyle: "solid",
    paddingTop: 10,
  },
});

// PDF Template
const PdfTemplate = () => (


<Document>
    <Page size={"A4"}>
        <View>
            <Text style={{}}>
                Invoice ID: {invoiceData.id}{"\n"}
                Date: {invoiceData.date}{"\n"}
                Due Date: {invoiceData.dueDate}{"\n"}
            </Text>
        </View>
    </Page>
</Document>


//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Text style={styles.title}>INVOICE</Text>
//           <Text style={styles.label}>FROM</Text>
//           <Text style={styles.value}>{invoiceData.company.name}</Text>
//           <Text style={styles.value}>{invoiceData.company.address}</Text>
//           <Text style={styles.value}>{invoiceData.company.city}</Text>
//           <Text style={styles.value}>{invoiceData.company.email}</Text>
//           <Text style={styles.value}>{invoiceData.company.phone}</Text>
//         </View>
//         <View style={styles.headerRight}>
//           <Text style={styles.label}>INVOICE #</Text>
//           <Text style={styles.value}>{invoiceData.id}</Text>
//           <Text style={styles.label}>DATE</Text>
//           <Text style={styles.value}>{invoiceData.date}</Text>
//           <Text style={styles.label}>DUE DATE</Text>
//           <Text style={styles.value}>{invoiceData.dueDate}</Text>
//         </View>
//       </View>

//       {/* Customer Info */}
//       <View style={styles.section}>
//         <Text style={styles.label}>BILL TO</Text>
//         <Text style={styles.value}>{invoiceData.customer.name}</Text>
//         <Text style={styles.value}>{invoiceData.customer.address}</Text>
//         <Text style={styles.value}>{invoiceData.customer.city}</Text>
//         <Text style={styles.value}>{invoiceData.customer.email}</Text>
//       </View>

//       {/* Table */}
//       <View style={styles.table}>
//         <View style={[styles.tableRow, styles.tableRowHeader]}>
//           <Text style={styles.tableColHeader}>Description</Text>
//           <Text style={styles.tableColHeader}>Quantity</Text>
//           <Text style={styles.tableColHeader}>Rate</Text>
//           <Text style={styles.tableColHeaderAmount}>Amount</Text>
//         </View>

//         {invoiceData.items.map((item, index) => (
//           <View key={index} style={styles.tableRow}>
//             <Text style={styles.tableCol}>{item.description}</Text>
//             <Text style={styles.tableCol}>{item.quantity}</Text>
//             <Text style={styles.tableCol}>${item.rate.toFixed(2)}</Text>
//             <Text style={styles.tableColAmount}>${item.amount.toFixed(2)}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Totals */}
//       <View style={styles.totals}>
//         <View>
//           <View style={styles.totalsRow}>
//             <Text style={styles.totalsLabel}>Subtotal</Text>
//             <Text style={styles.totalsValue}>
//               ${invoiceData.subtotal.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.totalsRow}>
//             <Text style={styles.totalsLabel}>Tax (10%)</Text>
//             <Text style={styles.totalsValue}>
//               ${invoiceData.tax.toFixed(2)}
//             </Text>
//           </View>
//           <View style={styles.totalsRow}>
//             <Text style={styles.totalsLabel}>Total</Text>
//             <Text style={styles.totalAmount}>
//               ${invoiceData.total.toFixed(2)}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text>Thank you for your business!</Text>
//         <Text>
//           Payment is due within 30 days. Please make checks payable to{" "}
//           {invoiceData.company.name}.
//         </Text>
//       </View>
//     </Page>
//   </Document>

);
