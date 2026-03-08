import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useApp } from '@/context/AppContext';
import { spacing } from '@/constants/theme';

export default function RemindersScreen() {
  const { colors } = useTheme();
  const { documents } = useApp();

  const withDue = documents.filter((d) => d.dueDate);
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    docNo: { fontSize: 13, fontWeight: '600', color: colors.primary },
    dueLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    empty: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.xl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
    },
    emptyText: { fontSize: 15, color: colors.textSecondary },
    emptySub: { fontSize: 13, color: colors.textSecondary, marginTop: 8 },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>การแจ้งเตือน</Text>
      <Text style={styles.subtitle}>เอกสารที่ครบกำหนดชำระหรือส่งมอบ</Text>

      {withDue.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="notifications-off-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.emptyText}>ยังไม่มีเอกสารที่กำหนดวันครบกำหนด</Text>
          <Text style={styles.emptySub}>เมื่อออกใบแจ้งหนี้และกรอกวันครบกำหนด จะแสดงที่นี่</Text>
        </View>
      ) : (
        withDue.map((doc) => (
          <Link key={doc.id} href={`/document/view/${doc.id}`} asChild>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.docNo}>{doc.no}</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                  ฿{doc.amount.toLocaleString('th-TH')}
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: colors.text, marginTop: 4 }}>{doc.title}</Text>
              <Text style={styles.dueLabel}>ครบกำหนด: {doc.dueDate}</Text>
            </View>
          </Link>
        ))
      )}
    </ScrollView>
  );
}
