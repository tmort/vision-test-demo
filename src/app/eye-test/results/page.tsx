'use client';

import { testStore } from '@/lib/testStore';

export default function ResultsPage() {
  const { visualAcuity, colorBlind } = testStore.getResults();

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
              <td className="border px-2 py-1 text-center">{r.answer}</td>
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
              <td className="border px-2 py-1 text-center">{r.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}