type AnyFunction = (...args: any[]) => any;
type Fn = () => void;

interface Window {
  __inject_path: string;
  isVSCodeWebview: boolean;
}

type Tag = string;

type IFile = {
  id: string;
  name: string;
  code: string;
};

type ICodeSet = {
  id: string;
  name: string;
  tags: string[];
  files: IFile[];
};
