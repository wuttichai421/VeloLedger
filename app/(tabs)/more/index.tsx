import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

/** เมนู "เพิ่มเติม" ของ Navbar – แสดงเฉพาะรายการลิงก์ ไม่ใช่หน้าแยก */
const allMenuItems = [
  { href: '/scan-expense', icon: 'camera', label: 'สแกนบันทึกค่าใช้จ่าย' },
  { href: '/documents', icon: 'document-text', label: 'เอกสาร' },
  { href: '/connect', icon: 'people', label: 'เชื่อมต่อนักบัญชี' },
  { href: '/more/report', icon: 'bar-chart', label: 'รายงานธุรกิจ' },
  { href: '/more/pricing', icon: 'pricetag', label: 'แพ็กเกจและราคา' },
  { href: '/more/settings', icon: 'settings', label: 'ตั้งค่า' },
  { href: '/more/help', icon: 'help-circle', label: 'ช่วยเหลือ' },
  { href: '/more/reminders', icon: 'notifications', label: 'การแจ้งเตือนเอกสาร' },
  { href: '/more/articles', icon: 'newspaper', label: 'บทความบัญชี ภาษี' },
  { href: '/more/videos', icon: 'play-circle', label: 'วิดีโอสอนใช้งาน' },
];

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    inner: { padding: spacing.md },
    title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.md, paddingHorizontal: 4 },
    menu: { backgroundColor: colors.card, borderRadius: 12, overflow: 'hidden' },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuIcon: { marginRight: spacing.md },
    menuLabel: { flex: 1, fontSize: 16, color: colors.text },
  });
}

export default function MoreNavbarMenu() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>เพิ่มเติม</Text>
        <View style={styles.menu}>
          {allMenuItems.map((item, i) => (
            <Link key={i} href={item.href as any} asChild>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon as any} size={22} color={colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}
