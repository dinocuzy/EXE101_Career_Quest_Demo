import React from 'react';
import { useGameStore } from './store/gameStore';
import { LandingScreen } from './screens/Landing';
import { ModeSelectScreen } from './screens/ModeSelect';
import { RolePickScreen } from './screens/RolePick';
import { ShiftIntroScreen } from './screens/ShiftIntro';
import { SoloPlayScreen } from './screens/SoloPlay';
import { GameOverScreen } from './screens/GameOver';
import { SoloResultScreen } from './screens/SoloResult';
import { AdminDemoScreen } from './screens/AdminDemo';
import { CoopLobbyScreen } from './screens/CoopLobbyScreen';
import { CoopPlayScreen } from './screens/CoopPlay';
import { CoopSummaryScreen } from './screens/CoopSummary';
import { SchoolDashboard } from './screens/SchoolDashboard';
import { ToastContainer } from './components/Toast';
import { PaywallSheet } from './components/PaywallSheet';
import { VietQRModal } from './components/VietQRModal';
import { SupportSheet } from './components/SupportSheet';
import { InvoiceModal } from './components/InvoiceModal';
import { WelcomePremiumModal } from './components/WelcomePremiumModal';
import { ViewModeSwitcher } from './components/ViewModeSwitcher';
import { WebNavbar } from './components/WebNavbar';

export default function App() {
  const { screen, landingViewMode, currentTheme } = useGameStore();

  const themeClass = `theme-${currentTheme.replace('_', '-')}`;
  const themeBg =
    currentTheme === 'ruang_edit'
      ? 'bg-[#F2EEF9]'
      : currentTheme === 'neo_quest'
      ? 'bg-[#F8FAFD]'
      : currentTheme === 'vibrant_editorial'
      ? 'bg-[#FAF8F5]'
      : currentTheme === 'cyber_arcade'
      ? 'bg-[#F5F3FF]'
      : 'bg-[#F7F7F6]';

  // Full-width desktop view for School Dashboard
  if (screen === 'school_dashboard') {
    return (
      <div className={`min-h-screen w-full ${themeClass} ${themeBg} antialiased relative`}>
        <SchoolDashboard />
        <ToastContainer />
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return <LandingScreen />;
      case 'mode_select':
        return <ModeSelectScreen />;
      case 'role_pick':
        return <RolePickScreen />;
      case 'shift_intro':
        return <ShiftIntroScreen />;
      case 'solo_play':
        return <SoloPlayScreen />;
      case 'game_over':
        return <GameOverScreen />;
      case 'solo_result':
        return <SoloResultScreen />;
      case 'admin_demo':
        return <AdminDemoScreen />;
      case 'coop_lobby':
        return <CoopLobbyScreen />;
      case 'coop_play':
        return <CoopPlayScreen />;
      case 'coop_summary':
        return <CoopSummaryScreen />;
      default:
        return <LandingScreen />;
    }
  };

  // FULL-WIDTH WEBSITE VIEW FOR ALL SCREENS
  if (landingViewMode === 'website') {
    return (
      <div className={`min-h-screen w-full ${themeClass} ${themeBg} text-[#18181B] antialiased selection:bg-[#C8F932] selection:text-[#18181B] flex flex-col relative`}>
        <ViewModeSwitcher />
        {/* Render WebNavbar with breadcrumb for all functional screens except landing */}
        {screen !== 'landing' && <WebNavbar />}
        <div className={`flex-1 w-full ${screen === 'landing' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
          {renderScreen()}
        </div>

        {/* Global Overlays & Modals */}
        <ToastContainer />
        <PaywallSheet />
        <VietQRModal />
        <SupportSheet />
        <InvoiceModal />
        <WelcomePremiumModal />
      </div>
    );
  }

  // MOBILE DEVICE SIMULATION CONTAINER (360px - 430px)
  return (
    <div className={`min-h-screen w-full ${themeClass} ${themeBg} flex items-center justify-center sm:py-6 sm:px-4 antialiased selection:bg-[#C8F932] selection:text-[#18181B] relative`}>
      <ViewModeSwitcher />
      {/* Mobile Device Simulation Container (max-width 430px) */}
      <div className={`w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] ${themeBg} text-[#18181B] sm:rounded-[42px] sm:border-[8px] sm:border-slate-800/90 sm:shadow-2xl flex flex-col relative overflow-hidden`}>
        {/* Fake Phone Top Speaker Notch */}
        <div className="hidden sm:flex items-center justify-center pt-2 pb-1 z-40 bg-transparent shrink-0">
          <div className="w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
            <div className="w-8 h-1 rounded-full bg-slate-700" />
          </div>
        </div>

        {/* Dynamic Screen Viewport */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col">
          {renderScreen()}
        </div>

        {/* Global Overlays & Modals */}
        <ToastContainer />
        <PaywallSheet />
        <VietQRModal />
        <SupportSheet />
        <InvoiceModal />
        <WelcomePremiumModal />
      </div>
    </div>
  );
}
