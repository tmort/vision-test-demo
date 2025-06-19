// src/app/eye-test/color-blind/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import IshiharaPlate from '@/components/IshiharaPlate';
import { testStore } from '@/lib/testStore';

// Generate 5 unique random numbers between 1 and 99 as strings
function getRandomNumbers(count: number) {
    const numbers = new Set<string>();
    while (numbers.size < count) {
        const num = Math.floor(Math.random() * 99) + 1;
        numbers.add(num.toString());
    }
    return Array.from(numbers);
}
const testNumbers = getRandomNumbers(5);

export default function ColorBlindTest() {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState<{ number: string; answer: string }[]>([]);
    const router = useRouter();
    const [finished, setFinished] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (finished) {
            router.push('/eye-test/results');
        }
    }, [finished, router]);

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
            {/* Progress Bar */}
            <div className="w-full max-w-xs mb-4">
                <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{step + 1} / {testNumbers.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${((step + 1) / testNumbers.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            <h2 className="text-xl mb-4">What number do you see?</h2>
            <p>Enter the number you see and click next (or press enter):</p>
            <IshiharaPlate number={testNumbers[step]} />
            <input
                ref={inputRef}
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