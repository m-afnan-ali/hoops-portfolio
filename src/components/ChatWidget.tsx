import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickReplies = [
  { label: 'Tournament Coverage', icon: '\u{1F3C6}' },
  { label: 'Player Portraits', icon: '\u{1F4F7}' },
  { label: 'League Season', icon: '\u{1F3C0}' },
  { label: 'Something Else', icon: '\u{2728}' },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; from: 'bot' | 'user' }[]>([
    { text: "Hey! I'm Uzair. What can I shoot for you?", from: 'bot' },
  ])
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const handleQuickReply = (label: string) => {
    setMessages((prev) => [
      ...prev,
      { text: label, from: 'user' },
      { text: "Nice! Head over to my booking page and I'll get back to you with details.", from: 'bot' },
    ])
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { text: input, from: 'user' },
      { text: "Thanks for reaching out! Book a session and I'll be in touch.", from: 'bot' },
    ])
    setInput('')
  }

  const goToBooking = () => {
    setIsOpen(false)
    navigate('/contact')
  }

  const showQuickReplies = messages.length === 1

  return (
    <div className="fixed bottom-6 right-6 z-[8000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="chat-widget absolute bottom-16 right-0 w-[340px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
            style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #111 100%)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-neon flex items-center justify-center font-marker text-sm text-coal">
                  UM
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1a1a1a]" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-sm text-white font-bold">Uzair Mehmood</p>
                <p className="font-mono text-[10px] text-emerald-400">Online &middot; replies instantly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 max-h-[280px] overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl font-mono text-xs leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-neon text-coal rounded-br-sm'
                        : 'bg-white/5 text-white/80 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.text.includes('booking page') && (
                      <button
                        onClick={goToBooking}
                        className="block mt-2 text-neon underline underline-offset-2 hover:text-white transition-colors"
                      >
                        Go to booking &rarr;
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Quick replies */}
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="space-y-2 pt-2"
                >
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => handleQuickReply(qr.label)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-white/10 hover:border-neon/40 hover:bg-neon/5 transition-all font-mono text-xs text-white/60 hover:text-white flex items-center gap-3"
                    >
                      <span className="text-base">{qr.icon}</span>
                      {qr.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 font-mono text-xs text-white placeholder:text-white/20 outline-none focus:border-neon/40 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="w-9 h-9 rounded-full bg-neon flex items-center justify-center hover:bg-white transition-colors shrink-0"
                >
                  <Send size={14} className="text-coal" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-neon shadow-lg shadow-neon/30 flex items-center justify-center hover:shadow-neon/50 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-coal" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} className="text-coal" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
