import { create } from 'zustand'

export const useHelperStore = create((set, get) => ({
  current: 0,
  answers: {
    sets: null,
  },
  answersOrder: [],
  addAnswer: (key, value) =>
    set(state => ({
      answers: (state.answers = { ...state.answers, [key]: value }),
    })),
  next: () =>
    set(state => ({
      current: state.current + 1,
    })),
  prev: () =>
    set(state => ({
      current: state.current - 1,
    })),
  done: () => {
    const answers = get().answers
    alert(JSON.stringify(answers, null, 4))
  },
}))
