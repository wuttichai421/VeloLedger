import { useEffect, useState } from 'react';
import { Platform, View, useWindowDimensions, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { NavbarSidebar } from '@/components/NavbarSidebar';

const MOBILE_BREAKPOINT = 768;

const styles = StyleSheet.create({
  hamburger: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawerPane: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    maxWidth: '85%',
  },
});

/** ซ่อนหัวเรื่องที่แสดง route path เช่น (tabs)/index บนเว็บ */
function HideRouteHeadingOnWeb() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const hide = () => {
      document.querySelectorAll('[role="heading"]').forEach((el) => {
        const text = (el.textContent || '').trim();
        if (/^\(tabs\)\//.test(text)) (el as HTMLElement).style.setProperty('display', 'none');
      });
    };
    hide();
    const observer = new MutationObserver(hide);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}

function StackWithTheme() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = width < MOBILE_BREAKPOINT;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={{ flex: 1, flexDirection: 'row', minHeight: '100%' }}>
        {!isMobile && <NavbarSidebar />}
        {isMobile && (
          <>
            <TouchableOpacity
              style={[styles.hamburger, { backgroundColor: colors.primary }]}
              onPress={() => setDrawerOpen(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
            <Modal
              visible={drawerOpen}
              transparent
              animationType="slide"
              onRequestClose={() => setDrawerOpen(false)}
            >
              <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={() => setDrawerOpen(false)}
              />
              <View style={styles.drawerPane}>
                <NavbarSidebar onClose={() => setDrawerOpen(false)} />
              </View>
            </Modal>
          </>
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600', fontSize: 18 },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="scan-expense"
          options={{ title: 'สแกนค่าใช้จ่าย', presentation: 'modal' }}
        />
        <Stack.Screen
          name="document/[type]"
          options={({ route }) => {
            const t = (route.params as { type?: string })?.type;
            const titles: Record<string, string> = {
              quote: 'ใบเสนอราคา',
              invoice: 'ใบแจ้งหนี้',
              receipt: 'ใบเสร็จรับเงิน',
              tax_invoice: 'ใบกำกับภาษี',
              delivery_order: 'ใบวางบิล',
            };
            return { title: titles[t || ''] || 'เอกสาร' };
          }}
        />
        <Stack.Screen
          name="document/view/[id]"
          options={{ title: 'แบบฟอร์มเอกสาร' }}
        />
        <Stack.Screen
          name="accountant"
          options={{ title: 'เชื่อมต่อนักบัญชี' }}
        />
        <Stack.Screen name="report" options={{ title: 'รายงานธุรกิจ' }} />
        <Stack.Screen name="reminders" options={{ title: 'การแจ้งเตือน' }} />
        <Stack.Screen name="pricing" options={{ title: 'แพ็กเกจและราคา' }} />
        <Stack.Screen name="articles" options={{ title: 'บทความบัญชี' }} />
        <Stack.Screen name="videos" options={{ title: 'วิดีโอสอนใช้งาน' }} />
        <Stack.Screen name="settings" options={{ title: 'ตั้งค่า' }} />
        <Stack.Screen name="help" options={{ title: 'ช่วยเหลือ' }} />
      </Stack>
        </View>
      </View>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <HideRouteHeadingOnWeb />
          <StackWithTheme />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
