'use client';

import { testStore } from '@/lib/testStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const { visualAcuity, colorBlind } = testStore.getResults();

  // Read results from base64 in URL if present
  useEffect(() => {
    let shouldRedirect = false;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('results');
      if (encoded) {
        try {
          const decoded = JSON.parse(atob(encoded));
          if (!(decoded.visualAcuity && decoded.colorBlind)) {
            shouldRedirect = true;
          }
        } catch {
          shouldRedirect = true;
        }
      } else if (!visualAcuity.length && !colorBlind.length) {
        shouldRedirect = true;
      }
      if (shouldRedirect) {
        router.replace('/eye-test');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleStartOver = () => {
    testStore.clear();
    router.push('/eye-test');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Test Results</h1>

      <h2 className="text-lg font-semibold mb-2">Visual Acuity</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">Letter</th>
            <th className="border px-2 py-1">Answer</th>
          </tr>
        </thead>
        <tbody>
          {visualAcuity.map((r, i) => (
            <tr key={i}>
              <td className="border px-2 py-1 text-center">{r.letter}</td>
              <td className={`border px-2 py-1 text-center${r.answer === 'no' ? ' bg-red-900 text-white font-bold' : ''}`}>{r.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-2">Color Blindness</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Plate Number</th>
            <th className="border px-2 py-1">Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {colorBlind.map((r, i) => (
            <tr key={i}>
              <td className="border px-2 py-1 text-center">{r.number}</td>
              <td className={`border px-2 py-1 text-center${r.answer.trim() !== r.number ? ' bg-red-900 text-white font-bold' : ''}`}>{r.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleStartOver}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Over
      </button>
    </div>
  );
}