'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { ChatMessage, ChatState } from '@/types/chat';

export default function ChatWidget() {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    isConnected: false,
    messages: [],
    currentSession: null,
    isTyping: false
  });
  
  const [newMessage, setNewMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  // 폴링 방식으로 메시지 가져오기
  const fetchMessages = async () => {
    if (!userId || !sessionId) return;
    
    try {
      const response = await fetch(`/api/chat?userId=${userId}&sessionId=${sessionId}`);
      const data = await response.json();
      
      if (data.success && data.data.messages) {
        const newMessages = data.data.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp)
        }));
        
        setChatState(prev => ({
          ...prev,
          messages: newMessages,
          isConnected: true
        }));
      }
    } catch (error) {
      console.error('메시지 가져오기 실패:', error);
      setChatState(prev => ({ ...prev, isConnected: false }));
    }
  };

  // 채팅 연결 (세션 생성 및 폴링 시작)
  const connectChat = async () => {
    setIsConnecting(true);
    
    try {
      // 새 세션 생성
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'create_session'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserId(data.data.userId);
        setSessionId(data.data.sessionId);
        
        // 환영 메시지 추가
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: '안녕하세요! QuickSlot 상담팀입니다. 무엇을 도와드릴까요?',
          sender: 'admin',
          timestamp: new Date()
        };
        
        setChatState(prev => ({
          ...prev,
          messages: [welcomeMessage],
          isConnected: true,
          currentSession: data.data.sessionId
        }));
        
        setIsConnecting(false);
        
        // 3초마다 메시지 확인
        const interval = setInterval(fetchMessages, 3000);
        
        // 컴포넌트 언마운트 시 인터벌 정리
        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error('세션 생성 실패:', error);
      setIsConnecting(false);
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId || !sessionId) {
      return;
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    // 로컬에 메시지 추가
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));

    // 서버로 메시지 전송
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'message',
          userId,
          sessionId,
          text: newMessage.trim(),
          sender: 'user'
        })
      });

      if (!response.ok) {
        console.error('메시지 전송 실패');
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }

    setNewMessage('');
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 채팅 열기/닫기
  const toggleChat = () => {
    if (!chatState.isOpen) {
      connectChat();
    }
    setChatState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!chatState.isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-xl w-80 h-96 border border-gray-200 flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-xl">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <h3 className="font-semibold">실시간 상담</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="hover:bg-blue-700 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatState.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isConnecting && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">연결 중...</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
disabled={false}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            
            {/* 연결 상태 */}
            <div className="mt-2 text-xs text-gray-500 text-center">
              {chatState.isConnected ? (
                <span className="text-green-600">● 온라인</span>
              ) : (
                <span className="text-red-600">● 오프라인</span>
              )}
            </div>
          </div>

          {/* 대체 연락 방법 */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-center space-x-4 text-xs">
              <a
                href="https://pf.kakao.com/_quickslot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle size={12} className="mr-1" />
                카카오톡
              </a>
              <a
                href="mailto:contact@quickslot.co.kr"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail size={12} className="mr-1" />
                이메일
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
