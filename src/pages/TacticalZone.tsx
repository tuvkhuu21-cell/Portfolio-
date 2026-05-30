import { Link, useOutletContext } from 'react-router-dom'
import { text } from '../i18n'

const TACTICAL_ZONE_URL = ''

export default function TacticalZone() {
  const ctx = useOutletContext() as { content?: typeof text.en } | undefined
  const content = ctx?.content ?? text.en

  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-slate-300/70">
        {content.tactical.crumb}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-500/15 bg-slate-950/25">
        <div className="relative h-[240px] w-full sm:h-[320px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.24),transparent_55%),radial-gradient(circle_at_40%_95%,rgba(16,185,129,0.18),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-slate-950/60 to-slate-950/80" />
          <div className="absolute inset-0 flex items-end p-5 sm:p-7">
            <div>
              <div className="text-lg font-semibold text-slate-100 sm:text-xl">
                {content.tactical.title}
              </div>
              <div className="mt-1 text-sm text-slate-200/75">
                {content.tactical.subtitle}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="text-sm font-semibold text-slate-100">
                {content.tactical.siteInfo}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-slate-200/80">
                {content.tactical.description}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JavaScript'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-500/15 bg-slate-950/30 px-3 py-1 text-xs text-slate-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {TACTICAL_ZONE_URL ? (
                  <a
                    href={TACTICAL_ZONE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-100 hover:bg-cyan-400/15"
                  >
                    {content.tactical.liveDemo}
                  </a>
                ) : (
                  <span
                    className="rounded-lg border border-cyan-400/15 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-100/55"
                    aria-disabled="true"
                  >
                    {content.tactical.liveSoon}
                  </span>
                )}
                <Link
                  to="/projects"
                  className="rounded-lg border border-slate-500/15 bg-slate-950/30 px-4 py-2 text-xs text-slate-100 hover:bg-slate-950/45"
                >
                  {content.tactical.back}
                </Link>
              </div>

            </div>

            <div className="rounded-2xl border border-slate-500/15 bg-slate-950/20 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-300/70">
                {content.tactical.quickDetails}
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-200/80">
                <div>
                  <span className="text-slate-300/70">{content.tactical.type}</span>{' '}
                  <span>{content.tactical.website}</span>
                </div>
                <div>
                  <span className="text-slate-300/70">{content.tactical.stack}</span>{' '}
                  <span>HTML / CSS / JavaScript</span>
                </div>
                <div>
                  <span className="text-slate-300/70">{content.tactical.live}</span>{' '}
                  <span>{content.tactical.comingSoon}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
