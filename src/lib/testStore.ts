'use client';

let visualAcuity: { letter: string; answer: 'yes' | 'no' }[] = [];
let colorBlind: { number: string; answer: string }[] = [];

export const testStore = {
  setVisualAcuity(data: typeof visualAcuity) {
    visualAcuity = data;
  },
  setColorBlind(data: typeof colorBlind) {
    colorBlind = data;
  },
  clear() {
    visualAcuity = [];
    colorBlind = [];
  },
  getResults() {
    return { visualAcuity, colorBlind };
  },
};