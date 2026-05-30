import { Link, useOutletContext } from 'react-router-dom'
import TextType from '../components/TextType'
import { text } from '../i18n'

export default function Home() {
  const ctx = useOutletContext() as { content?: typeof text.en } | undefined
  const content = ctx?.content ?? text.en

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <div className="text-xs uppercase tracking-widest text-slate-300/70">
          {content.home.greeting}
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          {content.profile.name}
        </h1>
        <div className="mt-2 text-sm text-cyan-300/90">
          {'>'}{' '}
          <TextType
            as="span"
            text={[...content.home.roles]}
            typingSpeed={45}
            deletingSpeed={25}
            pauseDuration={1400}
            cursorBlinkDuration={0.55}
            className="text-cyan-300/90"
            cursorClassName="text-cyan-200/90"
          />
        </div>

        <div className="mt-6 space-y-2 text-sm text-slate-300/85">
          <div>{content.home.welcome}</div>
          <div>{content.home.intro}</div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-500/15 bg-slate-950/30 p-4 font-mono text-[13px] text-slate-200/90">
          <div>
            <span className="text-emerald-300">const</span>{' '}
            <span className="text-sky-200">githubLink</span>{' '}
            <span className="text-slate-300">=</span>{' '}
            <span className="text-amber-200">"https://github.com/tuvkhuu21-cell"</span>
            <span className="text-slate-300">;</span>
          </div>
          <div className="mt-2">
            <span className="text-emerald-300">console</span>
            <span className="text-slate-300">.</span>
            <span className="text-sky-200">log</span>
            <span className="text-slate-300">(</span>
            <span className="text-sky-200">githubLink</span>
            <span className="text-slate-300">)</span>
            <span className="text-slate-300">;</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="rounded-lg border border-slate-500/20 bg-slate-950/25 px-4 py-2 text-sm text-slate-100 hover:bg-slate-950/40"
            to="/contact"
          >
            {content.home.getInTouch}
          </Link>
          <Link
            className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/15"
            to="/projects"
          >
            {content.home.viewProjects}
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/15 via-indigo-400/10 to-emerald-400/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-slate-500/15 bg-slate-950/25 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-slate-300/70">
              {content.home.aboutMe}
            </div>
            <Link className="text-xs text-slate-300/70 hover:underline" to="/about">
              {content.home.viewMore}
            </Link>
          </div>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-200/90">
            <p>
              {content.home.aboutParagraph1}
            </p>
            <p>
              {content.home.aboutParagraph2}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-500/15 bg-slate-950/30 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-300/70">
                {content.home.mainStack}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {content.home.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-500/15 bg-slate-950/30 px-3 py-1 text-xs text-slate-200/85"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-500/15 bg-slate-950/30 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-300/70">
                {content.home.quickLinks}
              </div>
              <div className="mt-3 grid gap-2">
                <Link
                  to="/about"
                  className="rounded-lg border border-slate-500/15 bg-slate-950/25 px-3 py-2 text-sm text-slate-100 hover:bg-slate-950/45"
                >
                  {content.home.aboutLink}
                </Link>
                <Link
                  to="/contact"
                  className="rounded-lg border border-slate-500/15 bg-slate-950/25 px-3 py-2 text-sm text-slate-100 hover:bg-slate-950/45"
                >
                  {content.home.contactLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
