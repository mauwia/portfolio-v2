import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import NewsletterForm from "@/components/newsletter-form"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedIdCard from "@/components/animated-id-card"
import AnimatedSection from "@/components/animated-section"
import ProjectCard from "@/components/project-card"

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="about" className="container mx-auto px-4 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-12">
          <AnimatedSection>
            <section className="space-y-4">
              <h1 className="text-3xl font-bold animate-text-gradient">{siteConfig.title}</h1>
              <p className="text-gray-700 dark:text-gray-300">{siteConfig.description}</p>
              <p className="text-gray-700 dark:text-gray-300">
                {siteConfig.skills.map((skill, index) => (
                  <span key={skill.name}>
                    <Link
                      href={skill.url}
                      className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                    >
                      {skill.name}
                    </Link>
                    {index < siteConfig.skills.length - 1 ? ", " : ""}
                  </span>
                ))}{" "}
                — whatever gets the job done.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <section className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                trying to develop something in cosmos ecosystem.{" "}
                {/* was a{" "} */}
                {/* <Link
                  href={siteConfig.experience[0].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.experience[0].title}
                </Link> */}
                {/* . did {siteConfig.experience[1].position} at{" "}
                <Link
                  href={siteConfig.experience[1].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.experience[1].title}
                </Link>
                . */}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                wrote docs. shot videos. shipped projects.
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <section className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                also {siteConfig.experience[2].position} at{" "}
                <Link
                  href={siteConfig.experience[2].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.experience[2].title}
                </Link>
                .
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <section className="space-y-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">SPECIALIZE IN:</p>
              {siteConfig.specialties.map((specialty, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300">
                  {specialty}
                </p>
              ))}
            </section>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <section className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                off-screen, i play{" "}
                <Link
                  href={siteConfig.hobbies[0].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.hobbies[0].text}
                </Link>
                .
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <section className="space-y-2">
              <p className="text-gray-500 dark:text-gray-400 text-sm">SONG RECOM:</p>
              <p className="text-gray-700 dark:text-gray-300">
                🎧{" "}
                <Link
                  href={siteConfig.musicRecommendations[0].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.musicRecommendations[0].title}
                </Link>{" "}
                by {siteConfig.musicRecommendations[0].artist} &nbsp;&nbsp; 🎧{" "}
                <Link
                  href={siteConfig.musicRecommendations[1].url}
                  className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {siteConfig.musicRecommendations[1].title}
                </Link>{" "}
                by {siteConfig.musicRecommendations[1].artist}
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={700}>
            <section className="flex gap-4">
              {siteConfig.socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm flex items-center gap-1 transition-colors duration-300 group"
                >
                  {link.name}{" "}
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </section>
          </AnimatedSection>
        </div>

        <div className="flex justify-center md:justify-end">
          <AnimatedIdCard />
        </div>
      </section>

      <section
        id="projects"
        className="container mx-auto px-4 py-12 md:py-24 border-t border-gray-100 dark:border-gray-800"
      >
        <AnimatedSection>
          <h2 className="text-2xl font-bold mb-8 animate-text-gradient">projects</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 gap-6">
          {siteConfig.projects.map((project, index) => (
            <AnimatedSection key={project.name} delay={index * 100}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section
        id="work"
        className="container mx-auto px-4 py-12 md:py-24 border-t border-gray-100 dark:border-gray-800"
      >
        <AnimatedSection>
          <h2 className="text-2xl font-bold mb-8 animate-text-gradient">work</h2>
        </AnimatedSection>
        <div className="space-y-8">
          {siteConfig.work.map((job, index) => (
            <AnimatedSection key={job.company} delay={index * 100}>
              <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-4 py-2 group hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-300">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={job.url} className="font-medium hover:underline flex items-center gap-1 group">
                      {job.company}{" "}
                      <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{job.duration}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{job.position}</p>
                  {/* <p className="text-gray-600 dark:text-gray-400 text-sm">{job.description}</p> */}
                  
                    {job.description.map((line, index) => (
                      <p className="text-gray-700 dark:text-gray-300" key={index}>
                      <span >
                        - {line}
                      </span>
                  </p>

                    ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* <section
        id="newsletter"
        className="container mx-auto px-4 py-12 md:py-24 border-t border-gray-100 dark:border-gray-800"
      >
        <AnimatedSection>
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 animate-text-gradient">{siteConfig.newsletter.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{siteConfig.newsletter.description}</p>
            <NewsletterForm buttonText={siteConfig.newsletter.buttonText} />
          </div>
        </AnimatedSection>
      </section> */}

      <ScrollToTop />
    </div>
  )
}
