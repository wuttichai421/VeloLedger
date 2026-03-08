import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp, type Document } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

const docTypes = [
  { type: 'quote', title: 'ใบเสนอราคา', icon: 'document-text', desc: 'สร้างใบเสนอราคาส่งลูกค้า' },
  { type: 'invoice', title: 'ใบแจ้งหนี้', icon: 'receipt', desc: 'ออกใบแจ้งหนี้' },
  { type: 'receipt', title: 'ใบเสร็จรับเงิน', icon: 'cash', desc: 'ออกใบเสร็จเมื่อรับชำระเงิน' },
  { type: 'tax_invoice', title: 'ใบกำกับภาษี', icon: 'calculator', desc: 'ออกใบกำกับภาษี/ใบกำกับอย่างย่อ' },
  { type: 'delivery_order', title: 'ใบวางบิล', icon: 'clipboard', desc: 'ออกใบวางบิลส่งของ/ส่งมอบสินค้า' },
];

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
    cardsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.lg },
    card: {
      width: '47%',
      minWidth: 140,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    cardTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
    cardDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    cardArrow: { marginTop: spacing.sm, alignSelf: 'flex-start' },
    docRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    docInfo: { flex: 1, marginRight: spacing.sm },
    docNo: { fontSize: 12, color: colors.primary, fontWeight: '600' },
    docTitle: { fontSize: 15, fontWeight: '500', color: colors.text, marginTop: 2 },
    docDate: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    docAmount: { fontSize: 16, fontWeight: '700', color: colors.text },
  });
}

export default function DocumentsScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { documents } = useApp();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>ออกเอกสารภาษี</Text>
      <View style={styles.cardsWrap}>
        {docTypes.map((doc) => (
          <Link key={doc.type} href={`/document/${doc.type}`} asChild>
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name={doc.icon as any} size={32} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{doc.title}</Text>
              <Text style={styles.cardDesc}>{doc.desc}</Text>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <Text style={styles.sectionTitle}>เอกสารล่าสุด</Text>
      {documents.map((doc: Document) => (
        <Link key={doc.id} href={`/document/view/${doc.id}`} asChild>
          <TouchableOpacity style={styles.docRow}>
            <View style={styles.docInfo}>
              <Text style={styles.docNo}>{doc.no}</Text>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docDate}>{doc.date}</Text>
            </View>
            <Text style={styles.docAmount}>฿{doc.amount.toLocaleString('th-TH')}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}
