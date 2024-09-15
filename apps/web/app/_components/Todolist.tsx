"use client"
import { useState } from "react";
import {trpc} from "../_trpc/client"

export default function TodoList(){
    const getTodos =trpc.getTodos.useQuery() 
     const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
          getTodos.refetch();
        },
      });
    const [content, setContent] = useState("");

    return (
        <div>
            <div>
                {JSON.stringify(getTodos.data)}
            </div>
            <div className="flex gap-3 items-center">
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2"
        />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content);
              setContent("");
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Todo
        </button>
      </div>
        </div>
    )
}