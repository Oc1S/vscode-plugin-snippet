import { nanoid } from 'nanoid';
import { createStore, mapValuesKey } from 'zustand-x';

import { isBrowser } from '@/constants';

import { demoCode } from '../demo';

const generateFile = () => ({
  id: nanoid(),
  name: `new-${Date.now()}.tsx`,
  code: '',
});

/* TODO:for test */
const testCodeSet = Array.from({ length: 100 }, (_, index) => {
  return {
    id: nanoid(),
    name: `test_set_${index}`,
    files: Array.from({ length: 1 }, (_, idx) => ({
      id: nanoid(),
      name: `App_${idx}.tsx`,
      code: demoCode,
    })),
  };
});

const snippetStore = createStore('code')(
  {
    codeSetIndex: 0,
    fileIndex: 0,
    codeSets: testCodeSet,
  },
  {
    persist: {
      enabled: false && isBrowser,
    },
  }
)
  .extendSelectors((_, get) => ({
    currentSet: () => get.codeSets()[get.codeSetIndex()],
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
        draft.codeSets[draft.codeSetIndex].files.push(generateFile());
        draft.fileIndex = draft.codeSets[draft.codeSetIndex].files.length - 1;
      });
    },
    changeFilename(
      newName: string,
      targetSetIndex: number,
      targetFileIndex: number
    ) {
      set.state(draft => {
        draft.codeSets[targetSetIndex].files[targetFileIndex].name = newName;
      });
    },
    removeFileById(id: string) {
      if (get.currentSet().files.length <= 1) {
        return;
      }
      set.state(draft => {
        const currentSet = draft.codeSets[draft.codeSetIndex];
        const isClickCurrentFile =
          draft.fileIndex === currentSet.files.findIndex(f => f.id === id);
        currentSet.files = currentSet.files.filter(f => f.id !== id);
        if (isClickCurrentFile) {
          const leftCount = currentSet.files.length;
          if (leftCount <= draft.fileIndex) {
            draft.fileIndex = leftCount - 1;
          }
        } else {
          const currentFileId = get.currentFileId();
          const newIndex = currentSet.files.findIndex(
            f => f.id === currentFileId
          );
          draft.fileIndex = newIndex;
        }
      });
    },
  }));

const drawerStore = createStore('drawer')({
  rename: false,
});

export const rootStore = {
  snippet: snippetStore,
  drawer: drawerStore,
};

export const useStore = () => mapValuesKey('use', rootStore);
// Global getter selectors
export const store = mapValuesKey('get', rootStore);
// Global actions
export const actions = mapValuesKey('set', rootStore);
