import { Link, useOutletContext } from 'react-router-dom'
import { text } from '../i18n'

type Project = {
  name: string
  description: string
  tags: string[]
  detailsUrl?: string
  githubUrl?: string
  isExternal?: boolean
}

type ProjectsContext = {
  content: typeof text.en
  selectedTech: string[]
}

const projectMeta = [
  {
    tags: ['TypeScript', 'Next.js', 'React', 'Prisma', 'Supabase'],
    detailsUrl: 'https://eclinic-diploma-antigravity.vercel.app/',
    githubUrl: 'https://github.com/tuvkhuu21-cell/Eclinic-diploma-antigravity',
    isExternal: true,
  },
  {
    tags: ['React', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/tuvkhuu21-cell',
  },
  {
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    tags: ['Python'],
  },
  {
    tags: ['React', 'CSS', 'JavaScript'],
    detailsUrl: '/projects/tactical-zone',
  },
  {
    tags: ['Java'],
  },
]

function ProjectCard({
  project,
  content,
}: {
  project: Project
  content: typeof text.en
}) {
  return (
    <div className="group rounded-2xl border border-slate-500/15 bg-slate-950/25 p-5 transition hover:bg-slate-950/35">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-100">
            {project.name}
          </div>
          <div className="mt-2 text-sm leading-relaxed text-slate-200/80">
            {project.description}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-500/15 bg-slate-950/30 px-3 py-1 text-xs text-slate-200/80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        {project.detailsUrl ? (
          project.isExternal ? (
            <a
              href={project.detailsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-500/15 bg-slate-950/30 px-3 py-2 text-xs text-slate-100 hover:bg-slate-950/45"
            >
              {content.projects.viewProject}
            </a>
          ) : (
            <Link
              to={project.detailsUrl}
              className="rounded-lg border border-slate-500/15 bg-slate-950/30 px-3 py-2 text-xs text-slate-100 hover:bg-slate-950/45"
            >
              {content.projects.viewProject}
            </Link>
          )
        ) : (
          <span
            className="rounded-lg border border-slate-500/15 bg-slate-950/20 px-3 py-2 text-xs text-slate-300/60"
            aria-disabled="true"
          >
            {content.projects.detailsSoon}
          </span>
        )}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-cyan-400/25 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-400/15"
          >
            {content.projects.github}
          </a>
        ) : (
          <span
            className="rounded-lg border border-cyan-400/15 bg-cyan-400/5 px-3 py-2 text-xs text-cyan-100/50"
            aria-disabled="true"
          >
            {content.projects.githubSoon}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const ctx = useOutletContext()
  const content = (ctx as ProjectsContext | undefined)?.content ?? text.en
  const selectedTech = ((ctx as ProjectsContext | undefined)?.selectedTech ?? []).filter(Boolean)
  const projects = content.projects.items.map((item, index) => ({
    ...item,
    ...projectMeta[index],
  }))
  const filtered =
    selectedTech.length === 0
      ? projects
      : projects.filter((p) => selectedTech.some((t) => p.tags.includes(t)))

  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-slate-300/70">
        {content.projects.title}
      </div>
      <div className="mt-2 text-sm text-slate-200/90">
        {selectedTech.length === 0
          ? content.projects.select
          : `${content.projects.filteredBy} ${selectedTech.join(', ')}`}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.name} project={p} content={content} />
        ))}
      </div>
    </div>
  )
}
