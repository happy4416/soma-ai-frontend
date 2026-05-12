'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('qwen2.5:3b');
  const [health, setHealth] = useState<any>({});

  useEffect(() => {
    checkHealth();
    fetchModels();
  }, []);

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      setHealth(response.data);
    } catch {
      setHealth({ status: 'error' });
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/models`);
      const modelNames = response.data.models?.map((m: any) => m.name) || [];
      setModels(modelNames);
      if (modelNames.length > 0) {
        setSelectedModel(modelNames[0]);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        model: selectedModel
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        sources: response.data.sources
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `오류: ${error.response?.data?.detail || '응답을 가져올 수 없습니다'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '30px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            🎓 경북소프트웨어마이스터고
          </h1>
          <p style={{ 
            fontSize: '1.2rem',
            color: '#666',
            margin: '0'
          }}>
            AI 도우미 - 궁금한 것을 물어보세요!
          </p>
        </div>
      
        <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🟢</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#888' }}>시스템 상태</div>
                  <div style={{ fontWeight: 'bold', color: health.status === 'healthy' ? '#10b981' : '#ef4444' }}>
                    {health.status === 'healthy' ? '정상' : '오류'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#888' }}>AI 모델</div>
                  <div style={{ fontWeight: 'bold', color: '#667eea' }}>
                    {health.ollama === 'running' ? '실행중' : '대기중'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>📚</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#888' }}>학습 문서</div>
                  <div style={{ fontWeight: 'bold', color: '#764ba2' }}>
                    {health.documents || 0}개
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
                모델 선택:
              </label>
              <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{ 
                  padding: '8px 12px', 
                  borderRadius: '8px', 
                  border: '2px solid #667eea',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px', 
        padding: '25px', 
        minHeight: '500px',
        maxHeight: '600px',
        overflowY: 'auto',
        marginBottom: '20px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', marginTop: '80px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💬</div>
            <h2 style={{ color: '#667eea', marginBottom: '30px' }}>경북소프트웨어마이스터고에 대해 물어보세요!</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
              marginTop: '40px',
              textAlign: 'left'
            }}>
              {[
                { icon: '📍', text: '학교 위치가 어디인가요?' },
                { icon: '🎓', text: '어떤 학과가 있나요?' },
                { icon: '📝', text: '입학하려면 어떻게 해야 하나요?' },
                { icon: '🏠', text: '기숙사가 있나요?' },
                { icon: '💼', text: '병역특례가 가능한가요?' },
                { icon: '💰', text: '장학금 제도가 있나요?' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setInput(item.text)}
                  style={{ 
                    padding: '15px',
                    background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '24px', marginRight: '10px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            style={{ 
              marginBottom: '20px',
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '75%',
              padding: '15px 20px',
              borderRadius: msg.role === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
              background: msg.role === 'user' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#f3f4f6',
              color: msg.role === 'user' ? 'white' : '#1f2937',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                opacity: 0.9
              }}>
                <span style={{ fontSize: '18px' }}>
                  {msg.role === 'user' ? '👤' : '🤖'}
                </span>
                {msg.role === 'user' ? '나' : 'GBSW AI'}
              </div>
              <p style={{ 
                margin: '0', 
                whiteSpace: 'pre-wrap', 
                lineHeight: '1.6',
                fontSize: '15px'
              }}>
                {msg.content}
              </p>
              {msg.sources && msg.sources.length > 0 && (
                <div style={{ 
                  marginTop: '12px', 
                  paddingTop: '12px', 
                  borderTop: msg.role === 'user' ? '1px solid rgba(255,255,255,0.3)' : '1px solid #e5e7eb',
                  fontSize: '12px',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>📚</span>
                  <span>출처: {msg.sources.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px'
          }}>
            <div style={{ 
              display: 'inline-block',
              padding: '15px 30px',
              background: '#f3f4f6',
              borderRadius: '20px',
              color: '#667eea',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '20px', marginRight: '10px' }}>💭</span>
              AI가 생각하는 중...
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
          placeholder="궁금한 것을 물어보세요..."
          disabled={loading}
          style={{ 
            flex: 1, 
            padding: '16px 20px', 
            fontSize: '16px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ 
            padding: '16px 32px', 
            fontSize: '16px',
            borderRadius: '12px',
            border: 'none',
            background: loading || !input.trim() 
              ? '#d1d5db' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            if (!loading && input.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = loading || !input.trim() ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)';
          }}
        >
          {loading ? '전송중...' : '전송 ✈️'}
        </button>
      </div>
    </div>
  </div>
  );
}
