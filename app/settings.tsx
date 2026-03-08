import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/constants/theme';

const items = [
  { icon: 'person', label: 'ข้อมูลธุรกิจ', desc: 'ชื่อร้าน ที่อยู่ เลขประจำตัวผู้เสียภาษี' },
  { icon: 'notifications', label: 'การแจ้งเตือน', desc: 'แจ้งเตือนเมื่อมีเอกสารครบกำหนด' },
  { icon: 'language', label: 'ภาษา', desc: 'ไทย' },
];

export default function SettingsScreen() {
  const { colors, isDark, scheme, setScheme } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    card: { backgroundColor: colors.card, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowIcon: { marginRight: spacing.md },
    rowContent: { flex: 1 },
    rowLabel: { fontSize: 16, fontWeight: '500', color: colors.text },
    rowDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
    footer: { alignItems: 'center', marginTop: spacing.xl },
    footerText: { fontSize: 13, color: colors.textSecondary },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ตั้งค่า</Text>
      <Text style={styles.subtitle}>การตั้งค่าต่างๆ ของแอป</Text>

      <View style={styles.card}>
        {items.map((item, i) => (
          <TouchableOpacity key={i} style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name={item.icon as any} size={22} color={colors.primary} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <Ionicons name="moon" size={22} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowLabel}>โหมดมืด</Text>
            <Text style={styles.rowDesc}>
              {scheme === 'system' ? 'ตามระบบ' : scheme === 'dark' ? 'เปิด' : 'ปิด'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={(v) => setScheme(v ? 'dark' : 'light')}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>โหมดมืดช่วยลดแสงเมื่อใช้ในที่มืด</Text>
      </View>
    </ScrollView>
  );
}
