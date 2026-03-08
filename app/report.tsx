import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

const DOC_LABELS: Record<string, string> = {
  quote: 'ใบเสนอราคา',
  invoice: 'ใบแจ้งหนี้',
  receipt: 'ใบเสร็จรับเงิน',
  tax_invoice: 'ใบกำกับภาษี',
  delivery_order: 'ใบวางบิล',
};

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.md },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.sm, marginTop: spacing.sm },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.md },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
    rowTotal: { marginTop: spacing.sm, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
    rowLabel: { fontSize: 15, color: colors.textSecondary },
    rowValue: { fontSize: 16, fontWeight: '600', color: colors.text },
    footer: { alignItems: 'center', marginTop: spacing.xl, paddingVertical: spacing.lg },
    footerText: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.sm },
    footerSub: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  });
}

export default function ReportScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { transactions, documents } = useApp();
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const docByType = (type: string) => ({
    count: documents.filter((d) => d.type === type).length,
    total: documents.filter((d) => d.type === type).reduce((s, d) => s + d.amount, 0),
  });
  const salesFromDocs =
    docByType('invoice').total + docByType('receipt').total + docByType('tax_invoice').total;
  const vatEstimate = Math.round(salesFromDocs * 0.07);
  const mockMonthly = [
    { month: 'มี.ค. 2568', income: 125000, expense: 48500 },
    { month: 'ก.พ. 2568', income: 98000, expense: 52000 },
    { month: 'ม.ค. 2568', income: 110000, expense: 61000 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>รายงานธุรกิจ</Text>
      <Text style={styles.subtitle}>สรุปจากข้อมูลในแอป</Text>

      <Text style={styles.sectionTitle}>แดชบอร์ดการเงิน</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>ยอดคงเหลือเดือนนี้</Text>
          <Text style={[styles.rowValue, { color: colors.primary, fontSize: 18 }]}>
            ฿{balance.toLocaleString('th-TH')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>รวมรายรับ</Text>
          <Text style={[styles.rowValue, { color: colors.success }]}>
            ฿{income.toLocaleString('th-TH')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>รวมรายจ่าย</Text>
          <Text style={[styles.rowValue, { color: colors.danger }]}>
            ฿{expense.toLocaleString('th-TH')}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>สรุปยอดรายเดือน</Text>
        {mockMonthly.map((m, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rowLabel}>{m.month}</Text>
            <Text style={styles.rowValue}>
              รับ ฿{m.income.toLocaleString('th-TH')} • จ่าย ฿{m.expense.toLocaleString('th-TH')}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>รายงานสรุปยอดขายและภาษี</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>ยอดขายจากเอกสาร</Text>
          <Text style={styles.rowValue}>฿{salesFromDocs.toLocaleString('th-TH')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>ภาษีมูลค่าเพิ่ม (ประมาณ 7%)</Text>
          <Text style={styles.rowValue}>฿{vatEstimate.toLocaleString('th-TH')}</Text>
        </View>
        <View style={[styles.row, styles.rowTotal]}>
          <Text style={styles.rowLabel}>รวมยอดขาย + ภาษี</Text>
          <Text style={[styles.rowValue, { color: colors.primary }]}>
            ฿{(salesFromDocs + vatEstimate).toLocaleString('th-TH')}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ประมาณการภาษีและเงินสดล่วงหน้า</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>ประมาณการเงินคงเหลือเดือนถัดไป</Text>
          <Text style={[styles.rowValue, { color: colors.primary }]}>
            ฿{Math.round(balance * 1.05).toLocaleString('th-TH')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>ประมาณการภาษี ( VAT ) รอบถัดไป</Text>
          <Text style={styles.rowValue}>฿{Math.round(vatEstimate * 1.1).toLocaleString('th-TH')}</Text>
        </View>
        <Text style={[styles.rowLabel, { marginTop: spacing.sm, fontSize: 13 }]}>
          * คำนวณจากยอดปัจจุบันและแนวโน้มโดยประมาณ
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>สรุปเอกสาร</Text>
        {(['quote', 'invoice', 'receipt', 'tax_invoice', 'delivery_order'] as const).map((type) => {
          const { count, total } = docByType(type);
          return (
            <View key={type} style={styles.row}>
              <Text style={styles.rowLabel}>{DOC_LABELS[type]} (จำนวน/ยอด)</Text>
              <Text style={styles.rowValue}>
                {count} รายการ • ฿{total.toLocaleString('th-TH')}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Ionicons name="bar-chart" size={40} color={colors.textSecondary} />
        <Text style={styles.footerText}>รายงานนี้ใช้ข้อมูลในแอปเท่านั้น</Text>
        <Text style={styles.footerSub}>เมื่อเชื่อม Backend จะดึงรายงานจริงได้</Text>
      </View>
    </ScrollView>
  );
}
