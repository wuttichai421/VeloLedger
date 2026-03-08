import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '@/constants/theme';

const SIDEBAR_WIDTH = 260;

const menuSections = [
  {
    title: 'เมนูหลัก',
    items: [
      { href: '/', icon: 'pie-chart', label: 'ภาพรวม' },
      { href: '/income-expense', icon: 'wallet', label: 'รายรับ-รายจ่าย' },
      { href: '/documents', icon: 'document-text', label: 'เอกสาร' },
      { href: '/connect', icon: 'people', label: 'เชื่อมต่อนักบัญชี' },
    ],
  },
  {
    title: 'รายงานและตั้งค่า',
    items: [
      { href: '/report', icon: 'bar-chart', label: 'รายงานธุรกิจ' },
      { href: '/settings', icon: 'settings', label: 'ตั้งค่า' },
      { href: '/help', icon: 'help-circle', label: 'ช่วยเหลือ' },
      { href: '/reminders', icon: 'notifications', label: 'การแจ้งเตือนเอกสาร' },
      { href: '/pricing', icon: 'pricetag', label: 'แพ็กเกจและราคา' },
    ],
  },
  {
    title: 'เรียนรู้',
    items: [
      { href: '/articles', icon: 'newspaper', label: 'บทความบัญชี ภาษี' },
      { href: '/videos', icon: 'play-circle', label: 'วิดีโอสอนใช้งาน' },
    ],
  },
];

const extraItems = [
  { href: '/scan-expense', icon: 'camera', label: 'สแกนบันทึกค่าใช้จ่าย' },
];

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    sidebar: {
      width: SIDEBAR_WIDTH,
      minWidth: SIDEBAR_WIDTH,
      backgroundColor: colors.card,
      borderRightWidth: 1,
      borderRightColor: colors.border,
      flex: 0,
      alignSelf: 'stretch',
    },
    scroll: { flex: 1 },
    inner: { paddingVertical: spacing.lg, paddingHorizontal: spacing.md },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.sm,
    },
    logo: { fontSize: 20, fontWeight: '700', color: colors.primary },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.md,
      borderRadius: 10,
      marginBottom: 2,
    },
    menuItemActive: { backgroundColor: colors.primary + '22' },
    menuIcon: { marginRight: spacing.md },
    menuLabel: { fontSize: 15, color: colors.text, flex: 1 },
    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xl,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: spacing.sm,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    avatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
    profileText: { flex: 1 },
    profileName: { fontSize: 14, fontWeight: '600', color: colors.text },
    profileEmail: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  });
}

export function NavbarSidebar({ onClose }: { onClose?: () => void }) {
  const isDrawer = typeof onClose === 'function';
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const pathname = usePathname();
  const router = useRouter();

  const handlePress = (href: string) => {
    onClose?.();
    router.push(href as any);
  };

  const isActive = (href: string) => {
    const p = pathname.replace(/^\//, '') || '';
    const h = href.replace(/^\//, '') || '';
    if (h === '') return p === '' || p === '(tabs)' || p.startsWith('(tabs)');
    return p === h || p.startsWith(h + '/');
  };

  const sidebarStyle = [
      styles.sidebar,
      Platform.OS === 'web' && { minHeight: '100vh' as any },
    ];
  return (
    <View style={sidebarStyle}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>VeloLedger</Text>
          {isDrawer && (
            <TouchableOpacity
              onPress={onClose}
              style={{ padding: spacing.sm }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {menuSections.map((section, si) => (
          <View key={si}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.menuItem, isActive(item.href) && styles.menuItemActive]}
                activeOpacity={0.7}
                onPress={() => handlePress(item.href)}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={isActive(item.href) ? colors.primary : colors.textSecondary}
                  />
                </View>
                <Text style={[styles.menuLabel, isActive(item.href) && { color: colors.primary, fontWeight: '600' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>ดำเนินการ</Text>
        {extraItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.menuItem, isActive(item.href) && styles.menuItemActive]}
            activeOpacity={0.7}
            onPress={() => handlePress(item.href)}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name={item.icon as any}
                size={22}
                color={isActive(item.href) ? colors.primary : colors.textSecondary}
              />
            </View>
            <Text style={[styles.menuLabel, isActive(item.href) && { color: colors.primary, fontWeight: '600' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={() => handlePress('/settings')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>JOOP</Text>
            <Text style={styles.profileEmail}>contact@sample.co.th</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
