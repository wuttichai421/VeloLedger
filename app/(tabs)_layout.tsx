import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

/** Navbar = แถบแท็บล่าง (ภาพรวม | รายรับ-รายจ่าย | เอกสาร | เชื่อมต่อ | เพิ่มเติม) กำหนดใน Tabs ด้านล่าง */
export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'bottom',
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          minHeight: 56,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ภาพรวม',
          headerTitle: 'ภาพรวม',
          headerShown: false,
          tabBarLabel: 'ภาพรวม',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="income-expense"
        options={{
          title: 'รายรับ-รายจ่าย',
          headerTitle: 'รายรับ-รายจ่าย',
          headerShown: false,
          tabBarLabel: 'รายรับ-รายจ่าย',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: 'เอกสาร',
          headerTitle: 'เอกสาร',
          headerShown: false,
          tabBarLabel: 'เอกสาร',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: 'เชื่อมต่อ',
          headerTitle: 'เชื่อมต่อ',
          headerShown: false,
          tabBarLabel: 'เชื่อมต่อ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'เพิ่มเติม',
          // หน้า /more = เมนูของ Navbar (รายการลิงก์เท่านั้น ไม่ใช่หน้าเต็ม)
          headerTitle: 'เพิ่มเติม',
          headerShown: false,
          tabBarLabel: 'เพิ่มเติม',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
