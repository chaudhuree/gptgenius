"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { generateChatResponse } from "../utils/actions";
import { useMutation } from "@tanstack/react-query";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { mutate, isPending, data } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),

    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
    onError: (error) => {
      toast.error("Something went wrong...");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };
  
/**
 * here messages will be an array of objects with the following structure:
 * [
 * { role: 'user', content: 'do you know about bangladeh?' },
 * { role: 'assistant', content: 'yes, I know about bangladesh,Bangladesh is a country in South Asia' },
 * { role: 'user', content: 'what is the capital of bangladesh?' },
 * { role: 'assistant', content: 'The capital of Bangladesh is Dhaka.' }, 
 * ]
 * 
 */
  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit">
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
