"use client"

import { useState } from "react"
import type { ComponentProps } from "react"
import { ChevronDown } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import ProjectCard from "@/components/project-card"

type Project = ComponentProps<typeof ProjectCard>["project"]

interface ProjectListProps {
  projects: Project[]
  /** How many projects show before "see more" is clicked. */
  initialCount: number
}

export default function ProjectList({ projects, initialCount }: ProjectListProps) {
  const [expanded, setExpanded] = useState(false)
  const hiddenCount = Math.max(0, projects.length - initialCount)
  const visible = expanded ? projects : projects.slice(0, initialCount)

  return (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {visible.map((project, index) => (
          // Newly revealed cards fade in one after another, like the first batch.
          <AnimatedSection key={project.name} delay={(index < initialCount ? index : index - initialCount) * 100}>
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            className="group flex items-center gap-1.5 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-black dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white"
          >
            {expanded ? "see less" : `see more (${hiddenCount})`}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  )
}
