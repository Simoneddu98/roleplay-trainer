'use client';

import Navbar from '@/components/layout/Navbar';
import EfisioAssistant from '@/components/EfisioAssistant';
import GlossaryBrowser from '@/components/GlossaryBrowser';
import { useAppStore } from '@/store/useStore';

export default function GlossaryPage() {
  const { state } = useAppStore();

  return (
    <div className="min-h-screen bg-[#06060a]">
      <Navbar totalXp={state.userProgress.totalXp} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <GlossaryBrowser />
      </main>
      <EfisioAssistant />
    </div>
  );
}
