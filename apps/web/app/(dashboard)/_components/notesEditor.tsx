import { useState, useEffect } from 'react';
import {
  BtnBold,
  BtnItalic,
 
  Editor,
  EditorProvider,
  Toolbar,
} from 'react-simple-wysiwyg';
import { trpc } from '../../_trpc/client';
import { useSession } from 'next-auth/react'


export const NotesEditor = () => {
  const { data } = useSession()

  const userId = data?.user?.id
  const [value, setValue] = useState('simple text');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const addNoteMutation = trpc.addNote.useMutation();
  const updateNoteMutation = trpc.updateNote.useMutation();
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null); 
  function onChange(e:any) {
    setValue(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      saveContent(e.target.value);
    }, 1000); 

    setTypingTimeout(timeoutId);
  }

  async function saveContent(content: string) {
    try {
      if (currentNoteId) {
        await updateNoteMutation.mutateAsync({ id: currentNoteId, content });
        console.log("Note updated:", content);
      } else {
        const newNoteId = await addNoteMutation.mutateAsync({ userId: userId as string, content });
        setCurrentNoteId(newNoteId?.id as string)
        console.log("New note created:", newNoteId);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  }

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <EditorProvider>
           <Editor value={value} onChange={onChange}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
        
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};
