import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || 'Studente';
  const course = req.nextUrl.searchParams.get('course') || 'Corso Completato';
  const date =
    req.nextUrl.searchParams.get('date') ||
    new Date().toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return NextResponse.json({
    name,
    course,
    date,
    issuer: 'Roleplay Trainer',
  });
}
