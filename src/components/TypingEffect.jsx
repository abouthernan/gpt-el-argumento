import { useState, useEffect } from 'react'

export function useTypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!text?.length) return

    const randomTime = Math.floor(Math.random() * 30) + 15

    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        setShowCursor(false)
        return
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0) {
        setDisplayText(text)
        setCurrentIndex(text.length)
        return
      }

      setDisplayText(text.slice(0, nextIndex))
      setCurrentIndex(currentIndex + 1)
    }, randomTime)

    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return { displayText, showCursor }
}

export function TypingEffect({ text }) {
  const { displayText, showCursor } = useTypingEffect({ text })
  return (
    <span className={`${showCursor ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''}`}>{displayText}</span>
  )
}
