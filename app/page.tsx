import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import ScrollToTop from "@/components/scroll-to-top"
import AnimatedIdCard from "@/components/animated-id-card"
import AnimatedSection from "@/components/animated-section"
import ProjectCard from "@/components/project-card"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      
      <section id="about" className="container mx-auto px-4 min-h-screen flex flex-col justify-center relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <AnimatedSection>
              <div className="space-y-4">
                <h2 className="text-primary font-mono tracking-widest text-sm uppercase">Welcome to the void</h2>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                  {siteConfig.title.split(',')[0]}<span className="text-primary">,</span><br/>
                  {siteConfig.title.split(',')[1]}
                </h1>
                <p className="text-xl text-gray-400 max-w-lg mt-6 font-light leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="flex flex-wrap gap-3">
                {siteConfig.skills.map((skill) => (
                  <div key={skill.name} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-gray-300 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-pointer">
                    {skill.name}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="space-y-6 max-w-lg">
                <p className="text-gray-400 font-light border-l-2 border-primary/50 pl-4">
                  Trying to develop something in the cosmos ecosystem. Wrote docs. Shot videos. Shipped projects.
                </p>
                <div className="flex flex-col gap-2 border border-white/10 bg-black/40 p-6 rounded-2xl backdrop-blur-sm">
                   <p className="text-gray-500 text-xs font-mono tracking-widest mb-2">SPECIALTIES</p>
                   {siteConfig.specialties.map((specialty, index) => (
                     <p key={index} className="text-gray-300 flex items-start gap-2">
                       <span className="text-primary mt-1">▹</span> {specialty}
                     </p>
                   ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex gap-4 pt-4">
                {siteConfig.socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-white transition-all duration-300 group hover:border-primary/30"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <div className="flex justify-center lg:justify-end relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10 rounded-full" />
             <AnimatedIdCard />
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] -z-10 pointer-events-none rounded-full" />
        
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <AnimatedSection key={project.name} delay={index * 100}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section
        id="work"
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <AnimatedSection>
           <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
          </div>
        </AnimatedSection>
        
        <div className="space-y-12 max-w-4xl">
          {siteConfig.work.map((job, index) => (
            <AnimatedSection key={job.company} delay={index * 100}>
              <div className="relative pl-8 md:pl-0">
                {/* Timeline line for mobile */}
                <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10" />
                <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 group">
                  <div className="text-sm text-gray-500 font-mono tracking-widest uppercase pt-1 shrink-0">
                    {job.duration}
                  </div>
                  
                  <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary/30">
                    <div className="space-y-4">
                      <div>
                        <Link href={job.url} className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2 group/link w-fit">
                          {job.company}
                          <ArrowUpRight className="w-5 h-5 opacity-50 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </Link>
                        <p className="text-primary font-mono text-sm mt-1">{job.position}</p>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        {job.description.map((line, index) => (
                          <p className="text-gray-400 font-light text-sm md:text-base flex items-start gap-3" key={index}>
                            <span className="text-primary mt-1 text-xs">▹</span> 
                            <span>{line}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
