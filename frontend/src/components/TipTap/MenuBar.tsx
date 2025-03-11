import { Editor } from '@tiptap/react';
import { Button } from '../ui/button';
import { Bold, BoldIcon, Code, Italic } from 'lucide-react';

type Props = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-row bg-gray-700 p-1">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="flex gap-2 border border-gray-400 bg-gray-800 p-2 text-white shadow-md">
        <Bold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="flex gap-2 border border-gray-400 bg-gray-800 p-2 text-white shadow-md">
        <Italic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className="flex gap-2 border border-gray-400 bg-gray-800 p-2 text-white shadow-md">
        <Code />
      </Button>
    </div>
  );
};
