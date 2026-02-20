import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const type = searchParams.get('type') ?? 'site';
  const slug = searchParams.get('slug') ?? '';

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse('Invalid preview token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  let redirectPath = '/';

  if (type === 'project' && slug) {
    redirectPath = `/projects/${slug}`;
  }

  return NextResponse.redirect(new URL(redirectPath, request.url));
}

