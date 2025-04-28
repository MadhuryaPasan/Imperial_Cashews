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
      {/* <div>pdf</div> */}
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

      {/* <br /> */}
      {/* Live Preview of the PDF */}
      {/* <PDFViewer style={{ width: "100%", height: "500px" }}>
        <PdfTemplate />
      </PDFViewer> */}
    </>
  );
};

export default Pdf;

// this is the pdf template

import Logo from "@/assets/logo.png";
import { Buffer } from "buffer";
import { Finance_ProfitLoss_ReturnAll } from "@/utils/API/finance/Finance_ProfitLoss_API";
import { Finance_PettyCash_ReturnAll } from "@/utils/API/finance/Finance_PettyCash_API";
import { Finance_BankBook_ReturnAll } from "@/utils/API/finance/Finance_BankBook_API";

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
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 10,
    },
    summaryText: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  const profitLossData = Finance_ProfitLoss_ReturnAll();
  const pettyCashData = Finance_PettyCash_ReturnAll();
  const bankBookData = Finance_BankBook_ReturnAll();

  const profitLossSummary = profitLossData.reduce(
    (acc, item) => {
      acc.totalRevenue += item.amount_revenue || 0;
      acc.totalExpense += item.amount_expense || 0;
      return acc;
    },
    { totalRevenue: 0, totalExpense: 0 }
  );

  const pettyCashSummary = pettyCashData.reduce(
    (acc, item) => {
      acc.totalReplenishment += item.replenishment_amount || 0;
      acc.totalExpense += item.expense_amount || 0;
      return acc;
    },
    { totalReplenishment: 0, totalExpense: 0 }
  );

  const bankBookSummary = bankBookData.reduce(
    (acc, item) => {
      acc.totalDeposits += item.Deposits || 0;
      acc.totalWithdrawals += item.Withdrawals || 0;
      return acc;
    },
    { totalDeposits: 0, totalWithdrawals: 0 }
  );

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
          <Text style={styles.sectionTitle}>Profit and Loss Summary</Text>
          <Text style={styles.summaryText}>
            Total Revenue: {profitLossSummary.totalRevenue}
          </Text>
          <Text style={styles.summaryText}>
            Total Expense: {profitLossSummary.totalExpense}
          </Text>

          <Text style={styles.sectionTitle}>Petty Cash Summary</Text>
          <Text style={styles.summaryText}>
            Total Replenishment: {pettyCashSummary.totalReplenishment}
          </Text>
          <Text style={styles.summaryText}>
            Total Expense: {pettyCashSummary.totalExpense}
          </Text>

          <Text style={styles.sectionTitle}>Bank Book Summary</Text>
          <Text style={styles.summaryText}>
            Total Deposits: {bankBookSummary.totalDeposits}
          </Text>
          <Text style={styles.summaryText}>
            Total Withdrawals: {bankBookSummary.totalWithdrawals}
          </Text>
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
