import { createStore } from 'zustand-x'

import { code } from '../demo'

export const repoStore = createStore('code')({
  name: 'zustandX',
  codeSets: Array.from({ length: 10 }, (_, index) => {
    return {
      name: `test_set_${index}`,
      content: Array.from({ length: 5 }, (_, idx) => ({
        name: `App_${idx}.tsx`,
        code,
      })),
    }
  }),
})
