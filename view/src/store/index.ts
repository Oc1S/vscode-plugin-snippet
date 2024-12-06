import { nanoid } from 'nanoid';
import { createStore } from 'zustand-x';

import { isBrowser } from '@/constants';

import { demoCode } from '../demo';

export const codeStore = createStore('code')(
  {
    codeSetIndex: 0,
    // currentFileId:'',
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
      };
    }),
  },
  {
    persist: {
      enabled: false && isBrowser,
    },
  }
)
  .extendSelectors((_, get) => ({
    currentSet: () => get.codeSets()[get.codeSetIndex()],
    // fileIndex: () =>
    //   get
    //     .codeSets()
    //     [get.codeSetIndex()].files.findIndex(f => f.id === get.currentFileId()),
    currentFileId: () =>
      get.codeSets()[get.codeSetIndex()].files[get.fileIndex()].id,
    currentFile: () =>
      get.codeSets()[get.codeSetIndex()].files[get.fileIndex()],
  }))
  .extendActions((set, get) => ({
    changeCodeSet: (index: number) => {
      if (get.codeSetIndex() === index) {
        return;
      }
      set.state(draft => {
        draft.codeSetIndex = index;
        draft.fileIndex = 0;
      });
    },
    addFile() {
      set.state(draft => {
        draft.codeSets[draft.codeSetIndex].files.push({
          id: `file-${Date.now()}`,
          name: `new-file-${Date.now()}.tsx`,
          code: '',
        });
        draft.fileIndex = draft.codeSets[draft.codeSetIndex].files.length - 1;
      });
    },
    removeFileById(id: string) {
      set.state(draft => {
        const currentSet = draft.codeSets[draft.codeSetIndex];
        const isCurrentFile =
          draft.fileIndex === currentSet.files.findIndex(f => f.id === id);
        currentSet.files = currentSet.files.filter(f => f.id !== id);

        if (isCurrentFile) {
          draft.fileIndex--;
        } else {
          const currentFileId = store.currentFileId();
          const newIndex = currentSet.files.findIndex(
            f => f.id === currentFileId
          );
          draft.fileIndex = newIndex;
        }
      });
    },
  }));

export const useStore = codeStore.use;
// Global getter selectors
export const store = codeStore.get;
// Global actions
export const actions = codeStore.set;
