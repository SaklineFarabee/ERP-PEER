import { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import axios from 'axios'

function AIHelper() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: 'Hello! I\'m your AI business assistant. I can help you with insights about your business, answer questions, and provide recommendations. What would you like to know?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    }
    setMessages([...messages, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      const response = await axios.post('/api/ai/ask', { question: inputValue })
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: response.data.answer
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (err) {
      console.error('Error getting AI response:', err)
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: 'I apologize, but I encountered an error processing your request. Please try again later or check your connection.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Business Assistant</h1>
        <p className="text-slate-600 mt-2">Get insights and answers about your business powered by Gemini AI</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-96 md:h-[500px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`.trim()}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your business..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Try asking:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• "What are my top performing products?"</li>
            <li>• "How much revenue did I make this month?"</li>
            <li>• "What's the status of my pending orders?"</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">🎯 AI Capabilities:</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Business insights and analytics</li>
            <li>• Revenue and sales analysis</li>
            <li>• Customer and inventory recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AIHelper
