import { createClient } from '@/lib/supabase/server';
import LandingView from '@/components/home/LandingView';
import DashboardView from '@/components/home/DashboardView';

export default async function HomePage() {
  let userEmail: string | null = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  } catch {
    // Supabase not configured or unreachable — treat as guest
  }

  if (!userEmail) {
    return <LandingView />;
  }

  return <DashboardView userEmail={userEmail} />;
}
