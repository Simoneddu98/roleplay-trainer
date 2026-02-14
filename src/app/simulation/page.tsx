'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SimulationRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/courses/sales/simulation');
  }, [router]);

  return null;
}
