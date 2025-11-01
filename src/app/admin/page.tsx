'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, MessageCircle, FileText, Users, Settings,
  CheckCircle, Clock, TrendingUp, User, Loader2, Send, AlertTriangle,
  LogIn, LogOut, Eye, EyeOff, Filter, Search, Plus, Edit, Trash2,
  BarChart3, PieChart, Activity, Calendar, Mail, Phone, Star,
  ArrowUpRight, ArrowDownRight, RefreshCw, Save, X
} from 'lucide-react';
import Link from 'next/link';

// 타입 정의
interface AdminUser {
  username: string;
  role: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  subject: string;
  message: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  notes?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'banned';
  createdAt: Date;
  lastLoginAt?: Date;
  totalInquiries: number;
  totalChats: number;
}

interface DashboardStats {
  overview: {
    totalUsers: number;
    totalInquiries: number;
    totalChats: number;
    activeUsers: number;
  };
  inquiries: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  chats: {
    total: number;
    active: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    averageResponseTime: number;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    banned: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
  };
}

const AdminPage: React.FC = () => {
  // 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // 페이지 상태
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 데이터 상태
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  // 폼 상태
  const [newAdminMessage, setNewAdminMessage] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    status: '',
    priority: '',
    assignedTo: '',
    notes: ''
  });

  // 인증 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (token) {
          const response = await fetch('/api/admin/auth', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin_token');
          }
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 로그인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.data.token);
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // 데이터 로드
  const loadData = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      // 채팅 메시지 로드
      const chatResponse = await fetch('/api/chat?admin=true');
      const chatData = await chatResponse.json();
      if (chatData.success) {
        setChatMessages(chatData.data.messages || []);
      }

      // 문의 목록 로드
      const inquiryResponse = await fetch('/api/admin/inquiries');
      const inquiryData = await inquiryResponse.json();
      if (inquiryData.success) {
        setInquiries(inquiryData.data.inquiries || []);
      }

      // 사용자 목록 로드
      const userResponse = await fetch('/api/admin/users');
      const userData = await userResponse.json();
      if (userData.success) {
        setUsers(userData.data.users || []);
      }

      // 통계 로드
      const statsResponse = await fetch('/api/admin/stats');
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  // 인증 후 데이터 로드
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      const interval = setInterval(loadData, 30000); // 30초마다 새로고침
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // 관리자 메시지 전송
  const sendAdminMessage = async () => {
    if (!newAdminMessage.trim()) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'message',
          text: newAdminMessage.trim(),
          sender: 'admin'
        })
      });

      if (response.ok) {
        setNewAdminMessage('');
        loadData();
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  // 문의 상태 업데이트
  const updateInquiry = async (inquiryId: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries?id=${inquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm)
      });

      if (response.ok) {
        setSelectedInquiry(null);
        setInquiryForm({ status: '', priority: '', assignedTo: '', notes: '' });
        loadData();
      }
    } catch (error) {
      console.error('문의 업데이트 실패:', error);
    }
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700">관리자 페이지 로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">QuickSlot Admin</h1>
            <p className="text-gray-600">관리자 로그인</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사용자명</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-600"
                placeholder="관리자 사용자명"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-600"
                  placeholder="비밀번호"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">테스트 계정:</p>
            <p className="text-sm text-blue-700">사용자명: admin</p>
            <p className="text-sm text-blue-700">비밀번호: quickslot2025</p>
          </div>
        </div>
      </div>
    );
  }

  // 메인 관리자 페이지
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-blue-800 text-white p-6 flex flex-col shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-bold">QuickSlot Admin</div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            title="로그아웃"
          >
            <LogOut size={20} />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
            { id: 'chat', label: '채팅 관리', icon: MessageCircle },
            { id: 'inquiries', label: '문의 관리', icon: FileText },
            { id: 'users', label: '사용자 관리', icon: Users },
            { id: 'settings', label: '설정', icon: Settings }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-700'
                }`}
              >
                <IconComponent className="mr-3" size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          <Link href="/" className="flex items-center w-full p-3 rounded-lg text-blue-200 hover:bg-blue-700 transition-colors">
            <ArrowUpRight className="mr-3" size={20} />
            웹사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            {activeTab === 'dashboard' && '대시보드'}
            {activeTab === 'chat' && '채팅 관리'}
            {activeTab === 'inquiries' && '문의 관리'}
            {activeTab === 'users' && '사용자 관리'}
            {activeTab === 'settings' && '설정'}
          </h1>
          <button
            onClick={loadData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={20} className="mr-2" />
            새로고침
          </button>
        </div>

        {/* 대시보드 */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            {/* 개요 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <Users className="text-blue-600 mr-4" size={32} />
                  <div>
                    <p className="text-gray-500 text-sm">총 사용자</p>
                    <p className="text-2xl font-bold">{stats.overview.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <FileText className="text-green-600 mr-4" size={32} />
                  <div>
                    <p className="text-gray-500 text-sm">총 문의</p>
                    <p className="text-2xl font-bold">{stats.overview.totalInquiries.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <MessageCircle className="text-purple-600 mr-4" size={32} />
                  <div>
                    <p className="text-gray-500 text-sm">총 채팅</p>
                    <p className="text-2xl font-bold">{stats.overview.totalChats.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <Activity className="text-orange-600 mr-4" size={32} />
                  <div>
                    <p className="text-gray-500 text-sm">활성 사용자</p>
                    <p className="text-2xl font-bold">{stats.overview.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 문의 통계 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">문의 현황</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.inquiries.pending}</div>
                  <div className="text-sm text-gray-500">대기 중</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.inquiries.inProgress}</div>
                  <div className="text-sm text-gray-500">진행 중</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.inquiries.completed}</div>
                  <div className="text-sm text-gray-500">완료</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.inquiries.cancelled}</div>
                  <div className="text-sm text-gray-500">취소</div>
                </div>
              </div>
            </div>

            {/* 채팅 통계 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">채팅 현황</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.chats.active}</div>
                  <div className="text-sm text-gray-500">활성 채팅</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.chats.today}</div>
                  <div className="text-sm text-gray-500">오늘 채팅</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.chats.averageResponseTime}분</div>
                  <div className="text-sm text-gray-500">평균 응답시간</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 채팅 관리 */}
        {activeTab === 'chat' && (
          <div className="bg-white p-6 rounded-xl shadow-md h-[70vh] flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">실시간 채팅</h2>
            <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <MessageCircle size={48} className="mx-auto mb-4" />
                  <p>아직 채팅 메시지가 없습니다.</p>
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className={`flex mb-3 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                        msg.sender === 'admin'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="block text-xs mt-1 opacity-80">
                        {msg.sender === 'admin' ? '관리자' : '고객'} - {new Date(msg.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newAdminMessage}
                onChange={(e) => setNewAdminMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAdminMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-600"
              />
              <button
                onClick={sendAdminMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Send size={20} className="mr-2" /> 전송
              </button>
            </div>
          </div>
        )}

        {/* 문의 관리 */}
        {activeTab === 'inquiries' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">문의 목록</h2>
            {inquiries.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <FileText size={48} className="mx-auto mb-4" />
                <p>아직 접수된 문의가 없습니다.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">서비스</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">우선순위</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">접수일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inquiry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{inquiry.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            inquiry.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            inquiry.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {inquiry.status === 'pending' ? '대기 중' :
                             inquiry.status === 'in_progress' ? '진행 중' :
                             inquiry.status === 'completed' ? '완료' : '취소'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            inquiry.priority === 'high' ? 'bg-red-100 text-red-800' :
                            inquiry.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.priority === 'high' ? '높음' :
                             inquiry.priority === 'medium' ? '보통' : '낮음'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="text-blue-600 hover:text-blue-900 mr-2"
                          >
                            보기
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">상태 변경</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 사용자 관리 */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">사용자 관리</h2>
            {users.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <Users size={48} className="mx-auto mb-4" />
                <p>사용자 데이터를 불러오는 중...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">문의수</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">채팅수</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' ? '관리자' :
                             user.role === 'moderator' ? '모더레이터' : '사용자'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? '활성' :
                             user.status === 'inactive' ? '비활성' : '차단'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.totalInquiries}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.totalChats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 설정 */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">시스템 설정</h2>
            <div className="text-center text-gray-500 py-10">
              <Settings size={48} className="mx-auto mb-4" />
              <p>시스템 설정 기능은 준비 중입니다.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;