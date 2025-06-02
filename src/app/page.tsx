
import { redirect } from 'next/navigation';

export default function HomePage() {
  // For now, redirect to login. Later, this could be a landing page.
  // Or, check auth state and redirect to /dashboard if logged in.
  redirect('/login');
  return null; // Or a loading spinner
}
