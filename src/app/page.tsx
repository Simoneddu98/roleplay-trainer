import { createClient } from '@/lib/supabase/server';
import LandingView from '@/components/home/LandingView';
import DashboardView from '@/components/home/DashboardView';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <LandingView />;
  }

  return <DashboardView userEmail={user.email ?? ''} />;
}
