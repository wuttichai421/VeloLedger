import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function MoreLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="report" options={{ title: 'รายงานธุรกิจ', headerShown: true }} />
      <Stack.Screen name="reminders" options={{ title: 'การแจ้งเตือน', headerShown: true }} />
      <Stack.Screen name="pricing" options={{ title: 'แพ็กเกจและราคา', headerShown: true }} />
      <Stack.Screen name="settings" options={{ title: 'ตั้งค่า', headerShown: true }} />
      <Stack.Screen name="help" options={{ title: 'ช่วยเหลือ', headerShown: true }} />
      <Stack.Screen name="articles" options={{ title: 'บทความบัญชี', headerShown: true }} />
      <Stack.Screen name="videos" options={{ title: 'วิดีโอสอนใช้งาน', headerShown: true }} />
    </Stack>
  );
}
