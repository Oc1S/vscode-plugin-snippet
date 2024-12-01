import { nanoid } from 'nanoid'
import { createStore } from 'zustand-x'

import { demoCode } from '../demo'

export const codeStore = createStore('code')(
  {
    codeSetIndex: 0,
    fileIndex: 0,
    codeSets: Array.from({ length: 10 }, (_, index) => {
      return {
        id: nanoid(),
        name: `test_set_${index}`,
        files: Array.from({ length: 20 }, (_, idx) => ({
          id: nanoid(),
          name: `App_${idx}.tsx`,
          code: demoCode,
        })),
      }
    }),
  },
  {
    persist: {
      enabled: false,
    },
  }
)
  .extendSelectors((_, get) => ({
    currentSet: () => get.codeSets()[get.codeSetIndex()],
    currentFile: () =>
      get.codeSets()[get.codeSetIndex()].files[get.fileIndex()],
  }))
  .extendActions((set, get) => ({
    changeCodeSet: (index: number) => {
      if (get.codeSetIndex() === index) {
        return
      }
      set.state(draft => {
        draft.codeSetIndex = index
        draft.fileIndex = 0
      })
    },
  }))

export const useStore = codeStore.use
// Global getter selectors
export const store = codeStore.get
// Global actions
export const actions = codeStore.set
