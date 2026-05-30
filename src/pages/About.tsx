import { useOutletContext } from 'react-router-dom'
import { text } from '../i18n'

type AboutSection =
  | 'bio'
  | 'interests'
  | 'education-high-school'
  | 'education-university'
  | 'contacts-email'
  | 'contacts-phone'

type AboutContext = {
  aboutSection: AboutSection
  content: typeof text.en
}

type SectionContent = {
  title: string
  body: string
  snippets: string[]
}

function CodePanel({ title, body }: { title: string; body: string }) {
  const lines = body.split('\n')
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-500/15 bg-slate-950/25">
      <div className="flex items-center justify-between border-b border-slate-500/15 bg-slate-950/35 px-4 py-2">
        <div className="text-xs tracking-widest text-slate-300/70">{title}</div>
        <div className="text-xs text-slate-300/50">personal-info</div>
      </div>
      <div className="grid grid-cols-[44px_1fr] font-mono text-[13px] leading-6">
        <div className="border-r border-slate-500/10 bg-slate-950/25 px-3 py-4 text-right text-slate-400/50">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="m-0 whitespace-pre-wrap px-4 py-4 text-slate-200/80">
          {body}
        </pre>
      </div>
    </div>
  )
}

function SnippetCard({ snippet }: { snippet: string }) {
  return (
    <div className="rounded-2xl border border-slate-500/15 bg-slate-950/25 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full border border-slate-500/15 bg-slate-950/35" />
          <div>
            <div className="text-sm text-sky-200">@tuvkhuu21-cell</div>
          </div>
        </div>
      </div>

      <pre className="mt-4 overflow-auto rounded-xl border border-slate-500/10 bg-slate-950/30 p-4 font-mono text-[12px] leading-5 text-slate-200/75">
        {snippet}
      </pre>
    </div>
  )
}

export default function About() {
  const ctx = useOutletContext()
  const siteContent = (ctx as AboutContext | undefined)?.content ?? text.en
  const section = (ctx as AboutContext | undefined)?.aboutSection ?? 'bio'

  const contentBySection: Record<AboutSection, SectionContent> = {
    bio: {
      title: 'bio',
      body: siteContent.about.bio,
      snippets: [
        `function initializeModelChunk(chunk) {\n  const value = parseModel(chunk._response, chunk._value)\n  return value\n}`, 
        `export function parseModelTuple(response, value) {\n  return [response, value]\n}`,
        
      ],
    },
    interests: {
      title: 'interests',
      body: siteContent.about.interests,
      snippets: [
        `const interests = ['UI', 'UX', 'Animations', 'Performance']\nexport default interests`,
        `export function focusOn(user) {\n  return user.goals.filter(Boolean)\n}`,
      ],
    },
    'education-high-school': {
      title: 'education / high-school',
      body: siteContent.about.highSchool,
      snippets: [
        `export const timeline = [{ year: 2018, graduated: 'High school' }]`,
      ],
    },
    'education-university': {
      title: 'education / university',
      body: siteContent.about.university,
      snippets: [
        `export const education = [\n  { school: 'Chuhal Amjilt Indra Cyber Institute', status: 'Graduated' },\n  { school: 'MUST - SICT', status: 'Currently studying' },\n]`,
      ],
    },
    'contacts-email': {
      title: 'contacts / email',
      body: siteContent.about.email,
      snippets: [
        `const email = 'tuvkhuu21@gmail.com'\nexport default email`,
      ],
    },
    'contacts-phone': {
      title: 'contacts / phone',
      body: siteContent.about.phone,
      snippets: [
        `const phone = '+976 99971015'\nexport default phone`,
      ],
    },
  }

  const sectionContent = contentBySection[section] ?? contentBySection.bio

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <CodePanel title={sectionContent.title} body={sectionContent.body} />

      <div className="overflow-hidden rounded-2xl border border-slate-500/15 bg-slate-950/20">
        <div className="border-b border-slate-500/15 bg-slate-950/35 px-4 py-2">
          <div className="text-xs tracking-widest text-slate-300/70">
            {siteContent.about.codeShowcase}
          </div>
        </div>

        <div className="space-y-4 p-4">
          {sectionContent.snippets.map((s, idx) => (
            <SnippetCard key={idx} snippet={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
