import { NextRequest, NextResponse } from 'next/server';

// 개선된 메시지 저장소 - 사용자별 세션 관리
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  userId?: string; // 사용자 식별자
  sessionId?: string; // 세션 식별자
}

interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  isActive: boolean;
  createdAt: Date;
  lastMessageAt: Date;
}

// 메모리 기반 저장소 (실제 운영에서는 데이터베이스 사용)
const chatSessions = new Map<string, ChatSession>();
const globalMessages: ChatMessage[] = []; // 전체 메시지 (관리자용)

// 사용자 ID 생성 함수
const generateUserId = () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');
    const isAdmin = searchParams.get('admin') === 'true';

    if (isAdmin) {
      // 관리자: 모든 세션의 메시지 반환
      const allSessions = Array.from(chatSessions.values());
      const allMessages = allSessions.flatMap(session => session.messages);
      
      return NextResponse.json({
        success: true,
        data: {
          messages: allMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
          sessions: allSessions.map(session => ({
            id: session.id,
            userId: session.userId,
            messageCount: session.messages.length,
            isActive: session.isActive,
            lastMessageAt: session.lastMessageAt
          }))
        }
      });
    }

    if (!userId || !sessionId) {
      return NextResponse.json({
        success: false,
        message: '사용자 ID와 세션 ID가 필요합니다'
      }, { status: 400 });
    }

    // 사용자: 해당 세션의 메시지만 반환
    const session = chatSessions.get(sessionId);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: '세션을 찾을 수 없습니다'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        messages: session.messages,
        session: {
          id: session.id,
          userId: session.userId,
          isActive: session.isActive
        }
      }
    });

  } catch (error) {
    console.error('메시지 조회 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (body.type === 'message') {
      const { userId, sessionId, text, sender } = body;
      
      // 세션 확인 또는 생성
      let session = chatSessions.get(sessionId);
      if (!session) {
        // 새 세션 생성
        const newSessionId = sessionId || generateSessionId();
        const newUserId = userId || generateUserId();
        
        session = {
          id: newSessionId,
          userId: newUserId,
          messages: [],
          isActive: true,
          createdAt: new Date(),
          lastMessageAt: new Date()
        };
        
        chatSessions.set(newSessionId, session);
      }

      // 메시지 생성
      const message: ChatMessage = {
        id: body.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: text.trim(),
        sender: sender || 'user',
        timestamp: new Date(),
        userId: session.userId,
        sessionId: session.id
      };

      // 세션에 메시지 추가
      session.messages.push(message);
      session.lastMessageAt = new Date();
      
      // 전체 메시지에도 추가 (관리자용)
      globalMessages.push(message);
      
      // 메시지가 너무 많아지면 오래된 것 제거 (메모리 관리)
      if (session.messages.length > 100) {
        session.messages = session.messages.slice(-50); // 최근 50개만 유지
      }
      
      if (globalMessages.length > 1000) {
        globalMessages.splice(0, 500); // 최근 500개만 유지
      }

      console.log('새 메시지:', {
        sessionId: session.id,
        userId: session.userId,
        message: message.text,
        sender: message.sender
      });

      return NextResponse.json({
        success: true,
        message: '메시지가 저장되었습니다',
        data: {
          message,
          session: {
            id: session.id,
            userId: session.userId,
            isActive: session.isActive
          }
        }
      });
    }

    if (body.type === 'create_session') {
      // 새 채팅 세션 생성
      const sessionId = generateSessionId();
      const userId = generateUserId();
      
      const session: ChatSession = {
        id: sessionId,
        userId,
        messages: [],
        isActive: true,
        createdAt: new Date(),
        lastMessageAt: new Date()
      };
      
      chatSessions.set(sessionId, session);
      
      return NextResponse.json({
        success: true,
        message: '새 세션이 생성되었습니다',
        data: {
          sessionId,
          userId
        }
      });
    }
    
    return NextResponse.json({
      success: false,
      message: '잘못된 요청입니다'
    }, { status: 400 });
    
  } catch (error) {
    console.error('메시지 처리 오류:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, { status: 500 });
  }
}
