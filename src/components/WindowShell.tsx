import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import LiquidEther from '../LiquidEther'
import FacebookIcon from '../assets/facebook-fill-svgrepo-com.svg'
import InstagramIcon from '../assets/new-instagram-logo-glyph.svg'
import GithubIcon from '../assets/github-icon.svg'
import { type Language, languages, text } from '../i18n'

type AboutSection =
  | 'bio'
  | 'interests'
  | 'education-high-school'
  | 'education-university'
  | 'contacts-email'
  | 'contacts-phone'

type AboutOpenState = {
  personalInfo: boolean
  education: boolean
  contacts: boolean
}

type Tab = {
  to: string
  label: string
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const saved = localStorage.getItem('language')
  return saved === 'mn' || saved === 'en' ? saved : 'en'
}

function TabLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        [
          'px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition',
          'border-b-2 border-r border-[color:var(--border)] last:border-r-0',
          isActive
            ? 'text-[color:var(--text)] border-amber-300'
            : 'text-[color:var(--text-muted)] border-transparent hover:text-[color:var(--text)]',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

function FolderGlyph({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 6.5C3.5 5.39543 4.39543 4.5 5.5 4.5H10.1C10.6304 4.5 11.1391 4.71071 11.5142 5.08579L12.2 5.77157C12.5751 6.14664 13.0838 6.35736 13.6142 6.35736H18.5C19.6046 6.35736 20.5 7.25279 20.5 8.35736V17.5C20.5 18.6046 19.6046 19.5 18.5 19.5H5.5C4.39543 19.5 3.5 18.6046 3.5 17.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 8.5H20.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function WindowShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isProjects = location.pathname.startsWith('/projects')
  const isAbout = location.pathname.startsWith('/about')
  const isContact = location.pathname.startsWith('/contact')

  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const content = text[language]
  const tabs: Tab[] = useMemo(
    () => [
      { to: '/', label: content.tabs.hello },
      { to: '/about', label: content.tabs.about },
      { to: '/projects', label: content.tabs.projects },
      { to: '/contact', label: content.tabs.contact },
    ],
    [content],
  )

  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [aboutSection, setAboutSection] = useState<AboutSection>('bio')
  const [aboutOpen, setAboutOpen] = useState<AboutOpenState>({
    personalInfo: true,
    education: true,
    contacts: true,
  })
  const techOptions = useMemo(
    () => [
      'TypeScript',
      'Next.js',
      'React',
      'Prisma',
      'Supabase',
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'Java',
    ],
    [],
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const outletContext = useMemo(() => {
    if (isProjects) {
      return {
        language,
        content,
        selectedTech,
        setSelectedTech,
      }
    }
    if (isAbout) {
      return {
        language,
        content,
        aboutSection,
        setAboutSection,
      }
    }
    return {
      language,
      content,
    }
  }, [isAbout, isProjects, selectedTech, aboutSection, language, content])

  return (
    <div className="min-h-full bg-[var(--app-bg)] font-sans text-[color:var(--text)]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <>
          <div
            className={
              theme === 'light'
                ? ['absolute inset-0', 'opacity-95'].join(' ')
                : ['absolute inset-0', 'opacity-80'].join(' ')
            }
          >
            <LiquidEther
              colors={
                theme === 'light'
                  ? ['#0EA5E9', '#6366F1', '#10B981']
                  : ['#5227FF', '#FF9FFC', '#B19EEF']
              }
              mouseForce={20}
              cursorSize={100}
              resolution={0.5}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.2}
              compositeOperation={theme === 'light' ? 'multiply' : 'lighter'}
              blobAlpha={theme === 'light' ? 0.78 : 0.8}
              color0={theme === 'light' ? '#0EA5E9' : '#201645'}
              color1={theme === 'light' ? '#10B981' : '#0e5328'}
              color2={theme === 'light' ? '#6366F1' : '#0f3580'}
            />
          </div>

          <div
            className={
              theme === 'light'
                ? 'absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-cyan-500/22 blur-3xl'
                : 'absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl'
            }
          />
          <div
            className={
              theme === 'light'
                ? 'absolute right-[-140px] top-[-80px] h-[520px] w-[520px] rounded-full bg-indigo-500/22 blur-3xl'
                : 'absolute right-[-140px] top-[-80px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl'
            }
          />
          <div
            className={
              theme === 'light'
                ? 'absolute bottom-[-180px] left-1/3 h-[520px] w-[520px] rounded-full bg-emerald-500/18 blur-3xl'
                : 'absolute bottom-[-180px] left-1/3 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl'
            }
          />
          <div
            className={
              theme === 'light'
                ? 'absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.14),transparent_45%)]'
                : 'absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.14),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.10),transparent_45%)]'
            }
          />
        </>
      </div>

      <div className="relative z-10 min-h-full w-full">
        <div className="min-h-full w-full border border-[color:var(--border)] bg-[var(--glass)] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <header className="flex items-stretch justify-between border-b border-[color:var(--border)] bg-[var(--glass-strong)]">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex min-w-0 items-center border-r border-[color:var(--border)] px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)] sm:px-5"
            >
              TUVSHINTUR TURKHUU
            </Link>

            <nav className="hidden min-w-0 flex-1 items-stretch sm:flex">
              <div className="flex min-w-0 flex-1 items-stretch">
                {tabs
                  .filter((t) => t.to !== '/contact')
                  .map((t) => (
                    <TabLink key={t.to} to={t.to}>
                      {t.label}
                    </TabLink>
                  ))}
              </div>

              <div className="ml-auto flex items-stretch border-l border-[color:var(--border)]">
                <TabLink to="/contact">{content.tabs.contact}</TabLink>
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setLanguage((value) => (value === 'en' ? 'mn' : 'en'))}
              className="flex items-center gap-2 border-l border-[color:var(--border)] px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)] sm:px-4"
              aria-label="Toggle language"
            >
              <span className="text-sm leading-none">{languages[language].flag}</span>
              <span>{languages[language].label}</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
              className="flex items-center gap-2 border-l border-[color:var(--border)] px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
              aria-label="Toggle theme"
            >
              <span className="hidden sm:inline">{theme === 'light' ? 'dark' : 'light'}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90"
              >
                {theme === 'light' ? (
                  <path
                    d="M12 18a6 6 0 1 1 4.242-10.243A7 7 0 1 0 12 19a7.003 7.003 0 0 0 4.95-2.05A5.98 5.98 0 0 1 12 18Z"
                    fill="currentColor"
                  />
                ) : (
                  <path
                    d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6Zm0-16v3m0 14v3m10-10h-3M5 12H2m16.95 6.95-2.12-2.12M7.17 7.17 5.05 5.05m13.9 0-2.12 2.12M7.17 16.83l-2.12 2.12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative flex items-center px-4 font-mono text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)] sm:hidden"
              aria-label="Open menu"
            >
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--text-muted)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--text-muted)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--text-muted)]" />
              </span>
            </button>
          </header>

          {isMobileMenuOpen && (
            <div className="border-b border-[color:var(--border)] bg-[var(--glass-strong)] sm:hidden">
              <div className="grid grid-cols-2">
                {tabs.map((t) => (
                  <NavLink
                    key={t.to}
                    to={t.to}
                    end={t.to === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] border-r border-[color:var(--border)]',
                        isActive
                          ? 'text-[color:var(--text)] bg-[var(--glass-strong)]'
                          : 'text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]',
                      ].join(' ')
                    }
                  >
                    {t.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}

          <div
            className={[
              'grid min-h-[calc(100vh-104px)] grid-cols-1 gap-0',
              isHome ? '' : 'lg:grid-cols-[260px_1fr]',
            ].join(' ')}
          >
            {!isHome && (
              <aside className="border-b border-[color:var(--border)] bg-[var(--glass)] p-4 lg:border-b-0 lg:border-r">
                {isProjects ? (
                  <>
                    <div className="text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]">
                      {content.sidebar.projects}
                    </div>

                    <div className="mt-4 space-y-2">
                      {techOptions.map((t) => {
                        const checked = selectedTech.includes(t)
                        return (
                          <label
                            key={t}
                            className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-2 text-sm text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                setSelectedTech((prev) => {
                                  if (e.target.checked) return [...prev, t]
                                  return prev.filter((x) => x !== t)
                                })
                              }}
                              className="proj-checkbox"
                            />
                            <span>{t}</span>
                          </label>
                        )
                      })}
                    </div>
                  </>
                ) : isAbout ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setAboutOpen((p) => ({
                          ...p,
                          personalInfo: !p.personalInfo,
                        }))
                      }
                      className="flex w-full items-center gap-2 text-left text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]"
                    >
                      <span className="text-[color:var(--text-muted)]">
                        {aboutOpen.personalInfo ? '▾' : '▸'}
                      </span>
                      <span>{content.sidebar.personalInfo}</span>
                    </button>

                    {aboutOpen.personalInfo && (
                      <div className="mt-3 space-y-1">
                        {([
                          { key: 'bio', label: content.sidebar.bio },
                          { key: 'interests', label: content.sidebar.interests },
                        ] as const).map((item) => {
                          const active = aboutSection === item.key
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setAboutSection(item.key)}
                              className={[
                                'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm',
                                active
                                  ? 'bg-[var(--glass-strong)] text-[color:var(--text)]'
                                  : 'text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]',
                              ].join(' ')}
                            >
                              <FolderGlyph className="text-pink-400/90" />
                              <span>{item.label}</span>
                            </button>
                          )
                        })}

                        <button
                          type="button"
                          onClick={() =>
                            setAboutOpen((p) => ({
                              ...p,
                              education: !p.education,
                            }))
                          }
                          className="mt-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                        >
                          <span className="text-[color:var(--text-muted)]">
                            {aboutOpen.education ? '▾' : '▸'}
                          </span>
                          <FolderGlyph className="text-emerald-400/90" />
                          <span>{content.sidebar.education}</span>
                        </button>

                        {aboutOpen.education && (
                          <div className="ml-6 space-y-1">
                            {([
                              { key: 'education-high-school', label: content.sidebar.highSchool },
                              { key: 'education-university', label: content.sidebar.university },
                            ] as const).map((item) => {
                              const active = aboutSection === item.key
                              return (
                                <button
                                  key={item.key}
                                  type="button"
                                  onClick={() => setAboutSection(item.key)}
                                  className={[
                                    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm',
                                    active
                                      ? 'bg-[var(--glass-strong)] text-[color:var(--text)]'
                                      : 'text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]',
                                  ].join(' ')}
                                >
                                  <FolderGlyph className="text-sky-400/90" />
                                  <span>{item.label}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() =>
                          setAboutOpen((p) => ({
                            ...p,
                            contacts: !p.contacts,
                          }))
                        }
                        className="flex w-full items-center gap-2 text-left text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]"
                      >
                        <span className="text-[color:var(--text-muted)]">
                          {aboutOpen.contacts ? '▾' : '▸'}
                        </span>
                        <span>{content.sidebar.contacts}</span>
                      </button>

                      {aboutOpen.contacts && (
                        <div className="mt-3 space-y-1">
                          <button
                            type="button"
                            onClick={() => setAboutSection('contacts-email')}
                            className={[
                              'flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm',
                              aboutSection === 'contacts-email'
                                ? 'bg-[var(--glass-strong)] text-[color:var(--text)]'
                                : 'text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]',
                            ].join(' ')}
                          >
                            <span className="text-[color:var(--text-muted)]">@</span>
                            <span className="truncate">tuvkhuu21@gmail.com</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setAboutSection('contacts-phone')}
                            className={[
                              'flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm',
                              aboutSection === 'contacts-phone'
                                ? 'bg-[var(--glass-strong)] text-[color:var(--text)]'
                                : 'text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]',
                            ].join(' ')}
                          >
                            <span className="text-pink-400/90">☎</span>
                            <span className="truncate">+976 99971015</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : isContact ? (
                  <>
                    <div className="text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]">
                      {content.sidebar.contacts}
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="rounded-lg border border-[color:var(--border)] bg-[var(--glass-soft)] px-3 py-2 text-sm text-[color:var(--text-muted)]">
                        tuvkhuu21@gmail.com
                      </div>
                      <div className="rounded-lg border border-[color:var(--border)] bg-[var(--glass-soft)] px-3 py-2 text-sm text-[color:var(--text-muted)]">
                        +976 99971015
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]">
                        {content.sidebar.findMeAlso}
                      </div>
                      <div className="mt-3 space-y-1">
                        {[
                          {
                            label: 'Instagram',
                            href: 'https://www.instagram.com/turkhuutuvshintur?igsh=MTR3ZGFia3Z2ZXIxcA==',
                          },
                          {
                            label: 'GitHub',
                            href: 'https://github.com/tuvkhuu21-cell',
                          },
                          { label: 'Twitch', href: 'https://twitch.tv/tuvkhuu17' },
                        ].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                          >
                            <span>{item.label}</span>
                            <span className="opacity-60">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]">
                      {content.sidebar.personalInfo}
                    </div>

                    <div className="mt-3 space-y-3">
                      <div className="rounded-xl border border-[color:var(--border)] bg-[var(--glass-strong)] p-3">
                        <div className="text-sm font-semibold text-[color:var(--text)]">
                          {content.profile.name}
                        </div>
                        <div className="mt-1 text-xs text-[color:var(--text-muted)]">
                          {content.profile.role}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[color:var(--border)] bg-[var(--glass-strong)] p-3 text-xs text-[color:var(--text-muted)]">
                        <div className="flex items-center justify-between">
                          <span>{content.profile.email}</span>
                          <span className="text-[color:var(--text)]">tuvkhuu21@gmail.com</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span>{content.profile.github}</span>
                          <span className="text-[color:var(--text)]">github.com/tuvkhuu21-cell</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span>{content.profile.location}</span>
                          <span className="text-[color:var(--text)]">{content.profile.locationValue}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:hidden">
                        {tabs.map((t) => (
                          <NavLink
                            key={t.to}
                            to={t.to}
                            end={t.to === '/'}
                            className={({ isActive }) =>
                              [
                                'rounded-lg border px-3 py-2 text-center text-xs',
                                'border-[color:var(--border)]',
                                isActive
                                  ? 'bg-amber-300/10 text-[color:var(--text)]'
                                  : 'bg-[var(--glass)] text-[color:var(--text-muted)]',
                              ].join(' ')
                            }
                          >
                            {t.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </aside>
            )}

            <main
              className={[
                'p-5 font-sans text-[15px] leading-relaxed text-[color:var(--text)] sm:p-6',
                isHome ? 'mx-auto flex w-full max-w-4xl items-center justify-center' : '',
              ].join(' ')}
            >
              <div className={isHome ? 'w-full' : ''}>
                <Outlet context={outletContext} />
              </div>
            </main>
          </div>

          <div className="flex h-12 items-stretch justify-between border-t border-[color:var(--border)] bg-[var(--glass)]">
            <div className="flex min-w-0 items-stretch">
              <div className="flex items-center px-4 text-xs text-[color:var(--text-muted)]">
                {content.footer.findMe}
              </div>
              <div className="flex items-stretch border-l border-[color:var(--border)]">
                <a
                  href="https://www.facebook.com/tuvshintur.turkhuu.2025/about"
                  className="grid w-16 place-items-center border-r border-[color:var(--border)] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                  aria-label="Facebook"
                >
                  <img
                    src={FacebookIcon}
                    alt=""
                    className={[
                      'h-5 w-5 opacity-90',
                      theme === 'light' ? '' : 'brightness-0 invert',
                    ].join(' ')}
                    draggable="false"
                  />
                </a>
                <a
                  href="https://www.instagram.com/turkhuutuvshintur?igsh=MTR3ZGFia3Z2ZXIxcA=="
                  className="grid w-16 place-items-center border-r border-[color:var(--border)] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                  aria-label="Instagram"
                >
                  <img
                    src={InstagramIcon}
                    alt=""
                    className={[
                      'h-5 w-5 opacity-90',
                      theme === 'light' ? '' : 'brightness-0 invert',
                    ].join(' ')}
                    draggable="false"
                  />
                </a>
                <a
                  href="https://github.com/tuvkhuu21-cell"
                  className="grid w-16 place-items-center border-r border-[color:var(--border)] text-[color:var(--text-muted)] hover:bg-[var(--glass-soft)]"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={GithubIcon}
                    alt=""
                    className={[
                      'h-5 w-5 opacity-90',
                      theme === 'light' ? '' : 'brightness-0 invert',
                    ].join(' ')}
                    draggable="false"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
