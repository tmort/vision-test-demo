// src/app/eye-test/color-blind/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IshiharaPlate from '@/components/IshiharaPlate';
import { testStore } from '@/lib/testStore';

const testNumbers = ['12', '8', '29'];

export default function ColorBlindTest() {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState<{ number: string; answer: string }[]>([]);
    const router = useRouter();
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished) {
            router.push('/eye-test/results');
        }
    }, [finished]);

    const handleNext = () => {
        const current = testNumbers[step];
        const newResponses = [...responses, { number: current, answer: input }];
        setResponses(newResponses);
        setInput('');

        if (step + 1 < testNumbers.length) {
            setStep(step + 1);
        } else {
            testStore.setColorBlind(newResponses);
            setFinished(true);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl mb-4">What number do you see?</h2>
            <IshiharaPlate number={testNumbers[step]} />
            <input
                className="mt-4 border border-gray-300 rounded px-4 py-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter the number"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleNext();
                    }
                }}
            />
            <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Next
            </button>
        </div>
    );
}