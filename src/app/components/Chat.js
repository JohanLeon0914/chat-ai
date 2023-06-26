/* eslint-disable @next/next/no-img-element */
"use client";
import { useChat } from "ai/react";
import { useRef, useEffect } from 'react';

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div className="flex flex-col max-w-xl px-8 mx-auto">
        <h1 className="text-center mb-4">👋 ¡Hola! Chatea con mi chatbot para obtener información sobre mí.</h1>
        <div className="max-h-[500px] overflow-y-auto mb-4">
          {messages.map((message) => {
            const isSystem = message.role !== 'user';
            const containerClass = isSystem ? 'bg-blue-500' : 'bg-green-500';
            return (
              <div
                className={`flex flex-row items-start my-2 ${
                  isSystem ? 'justify-start' : 'justify-end'
                }`}
                key={message.id}
              >
                <div className={`rounded-lg p-3 ${containerClass}`}>
                  <span>
                    <p>{isSystem ? 'Johan León (bot):' : 'Tú:'}</p>
                  </span>
                  <p className={`text-white`}>{message.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
  
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="fixed left-0 right-0 flex items-center justify-center bottom-4">
            <input
              className="w-[90%] max-w-xl px-4 py-2 text-sm border border-gray-400 rounded-full shadow-2xl"
              placeholder="Chatea con Johan León (bot)"
              type="text"
              value={input}
              name="content"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
