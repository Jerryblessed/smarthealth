import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Bot, User, Volume2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  hasAudio?: boolean
}

export function Chat() {
  const { profile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. How can I help you today? I can provide medical advice, answer health questions, and help you with wellness planning.",
      sender: 'ai',
      timestamp: new Date(),
      hasAudio: profile?.subscription_tier === 'tier2'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Call Azure OpenAI GPT-4o
    const aiContent = await generateAIResponse(inputMessage)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiContent,
      sender: 'ai',
      timestamp: new Date(),
      hasAudio: profile?.subscription_tier === 'tier2'
    }

    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  const generateAIResponse = async (userInput: string): Promise<string> => {
    try {
      const res = await fetch(
        `${process.env.AZURE_OPENAI_API_BASE}/openai/deployments/${process.env.AZURE_OPENAI_MODEL}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPENAI_API_KEY!
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: "You are a friendly AI health assistant for Nigerians." },
              { role: 'user', content: userInput }
            ],
            temperature: 0.7
          })
        }
      )
      const data = await res.json()
      return data.choices?.[0]?.message?.content ?? "Sorry, I'm having trouble responding right now."
    } catch (err) {
      console.error('Azure OpenAI error:', err)
      return "Sorry, something went wrong."
    }
  }

  const playAudio = async (messageId: string) => {
    if (profile?.subscription_tier !== 'tier2') return

    const message = messages.find(m => m.id === messageId)
    if (!message) return

    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY!
          },
          body: JSON.stringify({
            text: message.content,
            voice_settings: { stability: 0.5, similarity_boost: 0.5 }
          })
        }
      )
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      new Audio(url).play()
    } catch (err) {
      console.error('ElevenLabs TTS error:', err)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement actual recording logic as needed
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Health Assistant</h1>
                <p className="text-emerald-100">
                  {profile?.subscription_tier === 'tier2'
                    ? 'Pro+ with voice responses'
                    : 'Text-based consultation'}
                </p>
              </div>
            </div>
            {profile?.subscription_tier === 'tier2' && (
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">Voice Enabled</span>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    message.sender === 'user' ? 'ml-3' : 'mr-3'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {message.hasAudio && message.sender === 'ai' && (
                    <button
                      onClick={() => playAudio(message.id)}
                      className="mt-2 flex items-center text-xs text-gray-600 hover:text-gray-800"
                    >
                      <Volume2 className="h-3 w-3 mr-1" />
                      Play Audio
                    </button>
                  )}

                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}/>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your health concerns..."
                className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />

              <button
                onClick={toggleRecording}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isRecording ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500 text-center">
            {profile?.subscription_tier === 'tier2'
              ? 'Pro+ member: Voice responses enabled'
              : 'Upgrade to Pro+ for voice responses'}
          </div>
        </div>
      </div>
    </div>
  )
}
