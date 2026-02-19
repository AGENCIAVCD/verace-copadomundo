import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{
    width: string;
    height: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { width, height } = await params;
  const w = Number.parseInt(width, 10);
  const h = Number.parseInt(height, 10);

  const safeW = Number.isFinite(w) ? Math.min(Math.max(w, 100), 2400) : 400;
  const safeH = Number.isFinite(h) ? Math.min(Math.max(h, 100), 2400) : 300;

  return NextResponse.redirect(`https://picsum.photos/${safeW}/${safeH}`, 307);
}
