// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-6">Online Vision Test</h1>
      <p className="mb-4 text-lg">Take a quick visual acuity check from your browser.</p>
      <Link
        href="/eye-test"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Start Test
      </Link>
    </main>
  );
}