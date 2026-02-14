import { NextRequest, NextResponse } from 'next/server';
import { findTerm, glossary } from '@/data/glossary';

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get('term');

  if (!term) {
    return NextResponse.json(glossary);
  }

  const entry = findTerm(term);

  if (!entry) {
    return NextResponse.json(
      { error: 'Termine non trovato' },
      { status: 404 }
    );
  }

  return NextResponse.json(entry);
}
