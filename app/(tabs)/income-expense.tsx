import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

type TabType = 'all' | 'income' | 'expense';

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    tabs: { flexDirection: 'row', marginBottom: spacing.md, backgroundColor: colors.card, borderRadius: 12, padding: 4 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
    tabActive: { backgroundColor: colors.primary },
    tabText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
    tabTextActive: { color: '#fff' },
    totals: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
    totalItem: { flex: 1, backgroundColor: colors.card, borderRadius: 12, padding: spacing.md },
    totalLabel: { fontSize: 12, color: colors.textSecondary },
    totalValue: { fontSize: 18, fontWeight: '700', marginTop: 4 },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      gap: 8,
    },
    searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: colors.text },
    entry: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    entryIcon: { marginRight: spacing.md },
    entryContent: { flex: 1 },
    entryLabel: { fontSize: 15, fontWeight: '500', color: colors.text },
    entryDate: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    entryAmount: { fontSize: 16, fontWeight: '700' },
  });
}

export default function IncomeExpenseScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { transactions } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((e) => {
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'income' && e.type === 'income') ||
      (activeTab === 'expense' && e.type === 'expense');
    const matchSearch = !search || e.label.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalIncome = transactions.filter((e) => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalExpense = transactions.filter((e) => e.type === 'expense').reduce((s, e) => s + e.amount, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.tabs}>
        {(['all', 'income', 'expense'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'all' ? 'ทั้งหมด' : tab === 'income' ? 'รายรับ' : 'รายจ่าย'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.totals}>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>รวมรายรับ</Text>
          <Text style={[styles.totalValue, { color: colors.success }]}>
            ฿{totalIncome.toLocaleString('th-TH')}
          </Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>รวมรายจ่าย</Text>
          <Text style={[styles.totalValue, { color: colors.danger }]}>
            ฿{totalExpense.toLocaleString('th-TH')}
          </Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหารายการ..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filtered.map((item) => (
        <View key={item.id} style={styles.entry}>
          <View style={styles.entryIcon}>
            <Ionicons
              name={item.type === 'income' ? 'arrow-down-circle' : 'arrow-up-circle'}
              size={24}
              color={item.type === 'income' ? colors.success : colors.danger}
            />
          </View>
          <View style={styles.entryContent}>
            <Text style={styles.entryLabel}>{item.label}</Text>
            <Text style={styles.entryDate}>{item.date}</Text>
          </View>
          <Text
            style={[
              styles.entryAmount,
              { color: item.type === 'income' ? colors.success : colors.danger },
            ]}
          >
            {item.type === 'income' ? '+' : '-'}฿{item.amount.toLocaleString('th-TH')}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
