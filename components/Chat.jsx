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
    //  save api response to state
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
    //  save user query to state
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
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role == "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4 ">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending && <span className="loading"></span>}
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
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "please wait" : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
