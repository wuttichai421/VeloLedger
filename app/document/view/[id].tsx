import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useApp, type DocumentType } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/constants/theme';

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
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
    notFound: { fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
    form: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
    },
    header: { alignItems: 'center', marginBottom: spacing.lg, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
    brand: { fontSize: 20, fontWeight: '700', color: colors.primary },
    docTypeTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 4 },
    companyBlock: { marginBottom: spacing.lg },
    companyName: { fontSize: 15, fontWeight: '600', color: colors.text },
    companyDetail: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
    row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
    half: { flex: 1 },
    block: { marginBottom: spacing.md },
    label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
    value: { fontSize: 15, color: colors.text },
    tableWrap: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, marginBottom: spacing.md, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: colors.background, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
    th: { fontSize: 12, fontWeight: '600', color: colors.text },
    thNo: { width: 48 },
    thDesc: { flex: 1 },
    thAmount: { width: 100, textAlign: 'right' },
    tableRow: { flexDirection: 'row', paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
    td: { fontSize: 14, color: colors.text },
    tdNo: { width: 48 },
    tdDesc: { flex: 1 },
    tdAmount: { width: 100, textAlign: 'right' },
    totalRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: spacing.lg, gap: spacing.md },
    totalLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
    totalValue: { fontSize: 18, fontWeight: '700', color: colors.primary },
    terms: { marginBottom: spacing.lg, padding: spacing.md, backgroundColor: colors.background, borderRadius: 8 },
    termsTitle: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 4 },
    termsText: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    signRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: spacing.xl },
    signBlock: { alignItems: 'center', minWidth: 140 },
    signLine: { width: 120, height: 1, backgroundColor: colors.border, marginBottom: 4 },
    signLabel: { fontSize: 11, color: colors.textSecondary },
  });
}

export default function DocumentViewScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { documents } = useApp();
  const doc = documents.find((d) => d.id === id || d.no === id);

  if (!doc) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>ไม่พบเอกสาร</Text>
      </View>
    );
  }

  const typeLabel = DOC_TYPE_LABELS[doc.type];
  const isQuote = doc.type === 'quote';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        {/* หัวเอกสาร */}
        <View style={styles.header}>
          <Text style={styles.brand}>VeloLedger</Text>
          <Text style={styles.docTypeTitle}>{typeLabel}</Text>
        </View>

        {/* ข้อมูลบริษัท */}
        <View style={styles.companyBlock}>
          <Text style={styles.companyName}>JOOP</Text>
          <Text style={styles.companyDetail}>เลขที่ 88/99 หมู่ 2 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110</Text>
          <Text style={styles.companyDetail}>โทร. 02-123-4567</Text>
          <Text style={styles.companyDetail}>เลขประจำตัวผู้เสียภาษี: 0-1234-56789-01-2</Text>
        </View>

        {/* เลขที่ + วันที่ */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>เลขที่เอกสาร</Text>
            <Text style={styles.value}>{doc.no}</Text>
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>วันที่</Text>
            <Text style={styles.value}>{doc.date}</Text>
          </View>
        </View>

        {/* ลูกค้า / ผู้รับ */}
        <View style={styles.block}>
          <Text style={styles.label}>ลูกค้า / ผู้รับ</Text>
          <Text style={styles.value}>{doc.customer || doc.title.replace(`${typeLabel} - `, '')}</Text>
        </View>

        {/* ตารางรายการ - แบบฟอร์มใบเสนอราคา */}
        <View style={styles.tableWrap}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.thNo]}>ลำดับ</Text>
            <Text style={[styles.th, styles.thDesc]}>รายการ</Text>
            <Text style={[styles.th, styles.thAmount]}>จำนวนเงิน (บาท)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.td, styles.tdNo]}>1</Text>
            <Text style={[styles.td, styles.tdDesc]}>{doc.items || doc.title || '-'}</Text>
            <Text style={[styles.td, styles.tdAmount]}>{doc.amount.toLocaleString('th-TH')}</Text>
          </View>
        </View>

        {/* รวมเงิน */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>รวมทั้งสิ้น (บาท)</Text>
          <Text style={styles.totalValue}>฿{doc.amount.toLocaleString('th-TH')}</Text>
        </View>

        {/* หมายเหตุ / เงื่อนไข (ใบเสนอราคา) */}
        {isQuote && (
          <View style={styles.terms}>
            <Text style={styles.termsTitle}>เงื่อนไขและข้อตกลง</Text>
            <Text style={styles.termsText}>• ราคานี้รวมภาษีมูลค่าเพิ่มแล้ว (ถ้ามี)</Text>
            <Text style={styles.termsText}>• อายุการเสนอราคา 30 วัน</Text>
            <Text style={styles.termsText}>• ชำระเงินภายใน 7 วันหลังรับใบแจ้งหนี้</Text>
          </View>
        )}

        {/* ลายเซ็น */}
        <View style={styles.signRow}>
          <View style={styles.signBlock}>
            <View style={styles.signLine} />
            <Text style={styles.signLabel}>ผู้มีอำนาจลงนาม</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
