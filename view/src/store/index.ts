import { nanoid } from 'nanoid';
import { createStore, mapValuesKey } from 'zustand-x';

import { isBrowser } from '@/constants';

import { demoCode } from '../demo';

const generateFile = (data?: Partial<IFile>) => ({
  id: nanoid(),
  name: `new-${Date.now()}`,
  code: '',
  ...data,
});

const generateCodeSet = (data?: Partial<ICodeSet>) => {
  return {
    id: nanoid(),
    name: `new-${Date.now()}`,
    tags: [],
    files: [generateFile()],
    ...data,
  };
};

/* TODO:for test */
const testCodeSets = Array.from({ length: 200 }, (_, index) => {
  return generateCodeSet({
    name: `test_set_${index}`,
    tags: ['test', 'for', 'fun'],
    files: Array.from({ length: 3 }, (_, idx) =>
      generateFile({
        name: `App_${idx}.tsx`,
        code: demoCode,
      })
    ),
  });
});

const snippetStore = createStore('code')(
  {
    codeSetIndex: 0,
    fileIndex: 0,
    codeSets: testCodeSets,
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
    /* code set -- start */
    changeSelectedCodeSet: (index: number) => {
      if (get.codeSetIndex() === index) {
        return;
      }
      set.state(draft => {
        draft.codeSetIndex = index;
        draft.fileIndex = 0;
      });
    },
    modifyCurrentSet(newData: Partial<ICodeSet>) {
      set.state(draft => {
        const currentSet = draft.codeSets[draft.codeSetIndex];
        draft.codeSets[draft.codeSetIndex] = { ...currentSet, ...newData };
      });
    },
    addCodeSet() {
      set.state(draft => {
        draft.codeSets.push(generateCodeSet());
        draft.codeSetIndex = draft.codeSets.length - 1;
        draft.fileIndex = 0;
      });
    },
    removeCodeSetById(id: string) {
      set.state(draft => {
        const isRemovingCurrentSet =
          draft.codeSetIndex === draft.codeSets.findIndex(s => s.id === id);
        draft.codeSets = draft.codeSets.filter(s => s.id !== id);
        if (isRemovingCurrentSet) {
          draft.fileIndex = 0;
          const remainCount = draft.codeSets.length;
          if (remainCount <= draft.codeSetIndex) {
            draft.codeSetIndex = remainCount - 1;
          }
        } else {
          /* not removing current code set, so we need to update set index */
          const currentSetId = get.currentSet().id;
          /* codeSets has been updated, find the new index */
          const newIndex = draft.codeSets.findIndex(f => f.id === currentSetId);
          draft.codeSetIndex = newIndex;
        }
      });
    },
    /* code set -- end */
    /* file -- start */
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
        const isRemoveCurrentFile =
          draft.fileIndex === currentSet.files.findIndex(f => f.id === id);
        /* remove action */
        currentSet.files = currentSet.files.filter(f => f.id !== id);
        if (isRemoveCurrentFile) {
          /* removing current file, if fileIndex is greater than left count, we need to update fileIndex to (leftCount - 1) */
          const leftCount = currentSet.files.length;
          if (leftCount <= draft.fileIndex) {
            draft.fileIndex = leftCount - 1;
          }
        } else {
          /* not removing current file, so we need to update fileIndex */
          const currentFileId = get.currentFileId();
          /* currentSet.files has been updated, find the new index */
          const newIndex = currentSet.files.findIndex(
            f => f.id === currentFileId
          );
          draft.fileIndex = newIndex;
        }
      });
    },
    /* file -- end */
  }))
  .extendActions((set, get) => ({
    // based on **changeSelectedCodeSet**
    changeCodeSetById: (codeSetId: string) => {
      if (get.currentSet().id === codeSetId) {
        return;
      }
      const targetIndex = get.codeSets().findIndex(s => s.id === codeSetId);
      set.changeSelectedCodeSet(targetIndex);
    },
  }));

export const rootStore = {
  snippet: snippetStore,
};

export const useStore = () => mapValuesKey('use', rootStore);
// Global getter selectors
export const store = mapValuesKey('get', rootStore);
// Global actions
export const actions = mapValuesKey('set', rootStore);
