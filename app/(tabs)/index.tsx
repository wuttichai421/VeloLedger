import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { transactions } = useApp();
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const summary = { income, expense, balance: income - expense };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>สวัสดีครับ</Text>
        <Text style={styles.subGreeting}>ภาพรวมธุรกิจแบบเรียลไทม์</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>ยอดคงเหลือเดือนนี้</Text>
        <Text style={styles.balanceValue}>
          ฿{summary.balance.toLocaleString('th-TH')}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { borderLeftColor: colors.success }]}>
          <Ionicons name="arrow-down-circle" size={24} color={colors.success} />
          <Text style={styles.summaryLabel}>รายรับ</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            ฿{summary.income.toLocaleString('th-TH')}
          </Text>
        </View>
        <View style={[styles.summaryCard, { borderLeftColor: colors.danger }]}>
          <Ionicons name="arrow-up-circle" size={24} color={colors.danger} />
          <Text style={styles.summaryLabel}>รายจ่าย</Text>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            ฿{summary.expense.toLocaleString('th-TH')}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ดำเนินการด่วน</Text>
        <Link href="/scan-expense" asChild>
          <TouchableOpacity style={styles.quickAction}>
            <View style={styles.quickActionIcon}>
              <Ionicons name="camera" size={28} color={colors.primary} />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>สแกนบันทึกค่าใช้จ่าย</Text>
              <Text style={styles.quickActionSub}>ถ่ายใบเสร็จ บันทึกทันที</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Link>
        <Link href="/accountant" asChild>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="people" size={28} color={colors.primary} />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>เชื่อมต่อนักบัญชี</Text>
              <Text style={styles.quickActionSub}>แชร์ข้อมูลกับนักบัญชี</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>รายการล่าสุด</Text>
        {transactions.slice(0, 5).map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionLabel}>{item.label}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                { color: item.type === 'income' ? colors.success : colors.danger },
              ]}
            >
              {item.type === 'income' ? '+' : '-'}฿{item.amount.toLocaleString('th-TH')}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    header: { marginBottom: spacing.lg },
    greeting: { fontSize: 22, fontWeight: '700', color: colors.text },
    subGreeting: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    balanceCard: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    balanceLabel: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
    balanceValue: { fontSize: 28, fontWeight: '800', color: '#fff', marginTop: 4 },
    summaryRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
    summaryCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      borderLeftWidth: 4,
    },
    summaryLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    summaryValue: { fontSize: 16, fontWeight: '700', marginTop: 2 },
    section: { marginBottom: spacing.lg },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.sm,
    },
    quickAction: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    quickActionText: { flex: 1 },
    quickActionTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
    quickActionSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: spacing.md,
      borderRadius: 12,
      marginBottom: spacing.sm,
    },
    transactionLabel: { fontSize: 15, fontWeight: '500', color: colors.text },
    transactionDate: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    transactionAmount: { fontSize: 16, fontWeight: '700' },
  });
}
