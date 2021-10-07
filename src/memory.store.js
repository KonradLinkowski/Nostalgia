import { writable } from 'svelte/store';

const STORAGE = 'memories';

function createStore() {
  const memories = JSON.parse(localStorage.getItem(STORAGE)) || [];
  const { subscribe, update } = writable(memories);

  return {
    subscribe,
    add: (text, date = Date.now()) => update(memories => {
      const newMemories = [...memories, { text, date }]
      localStorage.setItem(STORAGE, JSON.stringify(newMemories));
      return newMemories;
    }),
    del: (text, date) => update(memories => {
      const mems = memories.filter(mem => mem.text !== text || mem.date !==  date);
      localStorage.setItem(STORAGE, JSON.stringify(mems));
      return mems;
    }),
    reset: () => update(() => {
      const mems = [];
      localStorage.setItem(STORAGE, JSON.stringify(mems));
      return mems;
    })
  };
}

export const memories = createStore();
