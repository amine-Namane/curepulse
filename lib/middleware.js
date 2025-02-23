import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { user } } = await supabase.auth.getUser();

  // Redirect unauthenticated users from protected routes
  if (req.nextUrl.pathname.startsWith('/DoctorHome') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}