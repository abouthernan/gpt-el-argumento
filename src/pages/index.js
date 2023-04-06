import { useRef } from 'react'
import Head from 'next/head'
import { Avatar } from '@/components/Avatar'
import { ChatGPTLogo, SendIcon } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import { useMessageStore } from '@/store/messages'

export function Layout({ children }) {
  return (
    <>
      <Head>
        <title>CHAT - El Argumento</title>
        <link rel='icon' href='https://elargumento.com/wp-content/uploads/2022/08/cropped-favicon-1-el-argumento-32x32.png' sizes='32x32' />
      </Head>
      <div className='w-full relative bg-gptgray h-screen p-4'>
        {children}
      </div>
    </>
  )
}

export function UserAvatar() {
  return (
    <img src='https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png' />
  )
}

export function Message({ ia, message }) {
  const avatar = ia ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = ia ? <TypingEffect text={message} /> : message
  return (
    <div
      className={`${ia ? 'bg-gptlightgray' : 'bg-gptgray'} text-gray-100`}
    >
      <article
        className='flex gap-4 p-6 m-auto max-w-3xl'
      >
        <Avatar>
          {avatar}
        </Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col item-start gap-4 whitespace-pre-wrap'>
          <div className='markdown prose w-full break-words dark:prose-invert light'>
            <p>{textElement}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

export function Chat() {
  const messages = useMessageStore(state => state.messages)
  return (
    <div className='flex flex-col w-full flex-1'>
      <main>
        {messages.map((entry) => (
          <Message key={entry.id} {...entry} />
        ))}
      </main>
      <ChatForm />
    </div>
  )
}

export function ChatForm() {
  const sendPrompt = useMessageStore(state => state.sendPrompt)
  const textAreaRef = useRef()

  const handleSubmit = (event) => {
    event?.preventDefault()
    const { value } = textAreaRef.current
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
  }

  const handleChange = () => {
    const el = textAreaRef.current

    const scrollHeight = el.scrollHeight
    el.style.height = scrollHeight + 'px'
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }
  return (
    <section className='absolute bottom-0 w-full left-0 right-0'>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className='flex flex-row max-w-3xl pt-6 m-auto mb-6'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray'>
          <textarea
            onChange={handleChange}
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button className='absolute p-1 rounded-md bottom-2.5 right-2.5'>
            <SendIcon />
          </button>
        </div>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Layout>
        <Chat />
      </Layout>
    </>
  )
}
