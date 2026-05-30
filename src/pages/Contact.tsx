import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { text } from '../i18n'

type SubmitStatus = 'idle' | 'success' | 'error'

function CodePreview({ code, title }: { code: string; title: string }) {
  const lines = code.split('\n')
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-500/15 bg-slate-950/20">
      <div className="border-b border-slate-500/15 bg-slate-950/35 px-4 py-2">
        <div className="text-xs tracking-widest text-slate-300/70">{title}</div>
      </div>
      <div className="grid grid-cols-[44px_1fr] font-mono text-[12px] leading-6">
        <div className="border-r border-slate-500/10 bg-slate-950/25 px-3 py-4 text-right text-slate-400/50">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre
          className="m-0 overflow-auto whitespace-pre bg-slate-950/25 px-4 py-4 text-slate-200/75"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(148,163,184,0.35) rgba(2,6,23,0.15)' }}
        >
          {code}
        </pre>
      </div>
    </div>
  )
}

export default function Contact() {
  const ctx = useOutletContext() as { content?: typeof text.en } | undefined
  const content = ctx?.content ?? text.en

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState('')

  const formspreeEndpoint = 'https://formspree.io/f/xpqjpjoo'

  const code = useMemo(() => {
    const safeName = name || ''
    const safeEmail = email || ''
    const safeMessage = message || ''

    return [
      "const button = document.querySelector('#sendBtn');",
      '',
      'const message = {',
      `  name: "${safeName.replaceAll('"', '\\"')}",`,
      `  email: "${safeEmail.replaceAll('"', '\\"')}",`,
      `  message: "${safeMessage.replaceAll('"', '\\"')}"`,
      '};',
      '',
      "button.addEventListener('click', () => {",
      `  const endpoint = "${formspreeEndpoint}";`,
      '  fetch(endpoint, {',
      "    method: 'POST',",
      "    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },",
      '    body: JSON.stringify(message)',
      '  });',
      '});',
    ].join('\n')
  }, [name, email, message, formspreeEndpoint])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-500/15 bg-slate-950/20 p-5">
        <div className="text-xs uppercase tracking-widest text-slate-300/70">
          {content.contact.title}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()

            setError('')
            setStatus('idle')

            if (!email || !message) {
              setError(content.contact.required)
              setStatus('error')
              return
            }

            setIsSending(true)
            try {
              const res = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name,
                  email,
                  message,
                }),
              })

              if (!res.ok) {
                const data = await res.json().catch(() => null)
                const msg =
                  data?.errors?.[0]?.message ||
                  data?.error ||
                  content.contact.failed
                setError(msg)
                setStatus('error')
                return
              }

              setStatus('success')
              setName('')
              setEmail('')
              setMessage('')
            } finally {
              setIsSending(false)
            }
          }}
        >
          <div>
            <label className="block text-xs text-slate-300/70">{content.contact.name}</label>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-500/15 bg-slate-950/25 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/40"
              placeholder={content.contact.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-300/70">{content.contact.email}</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-500/15 bg-slate-950/25 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/40"
              placeholder={content.contact.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-300/70">{content.contact.message}</label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="mt-1 w-full resize-none rounded-lg border border-slate-500/15 bg-slate-950/25 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400/40"
              placeholder={content.contact.messagePlaceholder}
            />
          </div>

          <button
            id="sendBtn"
            type="submit"
            disabled={isSending}
            className={[
              'rounded-lg border border-slate-500/20 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 hover:bg-slate-950/45',
              isSending ? 'opacity-60 cursor-not-allowed' : '',
            ].join(' ')}
          >
            {isSending ? content.contact.sending : content.contact.submit}
          </button>

          {status === 'success' && (
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
              {content.contact.success}
            </div>
          )}

          {status === 'error' && !!error && (
            <div className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
              {error}
            </div>
          )}
        </form>
      </div>

      <CodePreview code={code} title={content.contact.title} />
    </div>
  )
}
