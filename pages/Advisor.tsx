
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import * as FramerMotion from 'framer-motion';

const { motion } = FramerMotion as any;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Advisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'مرحباً.. أنا "فنجال بن دلة". كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsLoading(true);

    try {
      // Fix: Use process.env.API_KEY directly for Gemini client initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: msg,
        config: { systemInstruction: 'أنت خبير أمني ذكي اسمك "فنجال بن دلة" تعمل في منصة SiteSec.' }
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'حدث خطأ.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، لا يمكنني الرد حالياً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-grow liquid-glass flex flex-col overflow-hidden shadow-2xl">
        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 bg-black/40">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-200'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 border-t border-white/5 bg-black/60 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="اسأل فنجال بن دلة..."
            className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none"
          />
          <button onClick={handleSendMessage} className="px-8 logo-gradient-bg text-white rounded-2xl font-black">إرسال</button>
        </div>
      </div>
    </div>
  );
};

export default Advisor;
