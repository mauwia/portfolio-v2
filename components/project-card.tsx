"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    longDescription?: string[];
    technologies?: string[];
    status?: string;
    timeline?: string;
    url: string;
    icon: string;
    color?: string;
    featured?: boolean;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Reduce the rotation effect for a more subtle tilt
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 group overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Hover Gradient inside card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${rotation.y * -20 + 50}% ${rotation.x * -20 + 50}%, rgba(255,114,37,0.1) 0%, transparent 40%)`
        }}
      />

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        <div
          className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-500 overflow-hidden bg-white/5 border border-white/10 ${
            isHovered ? "scale-105 border-primary/50 shadow-[0_0_15px_rgba(255,114,37,0.3)]" : ""
          }`}
        >
          {project.icon.length === 1 ? (
            <span className="text-3xl font-black text-white">{project.icon}</span>
          ) : (
            <img
              src={project.icon}
              alt={project.name}
              className={`w-full h-full object-cover ${project.name.toLowerCase() === "tars" ? "object-contain p-2 dark:invert" : ""}`}
            />
          )}
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-start">
            <Link
              href={project.url}
              className="font-bold text-2xl text-white hover:text-primary transition-colors flex items-center gap-2 group/link"
            >
              {project.name}
              <ArrowUpRight className="w-5 h-5 opacity-50 group-hover/link:opacity-100 transition-all group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </Link>

            {project.featured && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Featured
              </Badge>
            )}
          </div>

          <p className="text-gray-400 font-light leading-relaxed">
            {project.description}
          </p>

          {project.longDescription?.length && (
            <div className="space-y-2 pt-2">
              {project.longDescription.map((line, index) => (
                <p
                  key={index}
                  className="text-gray-500 text-sm flex items-start gap-2"
                >
                  <span className="text-primary/50 mt-0.5">▹</span> {line}
                </p>
              ))}
            </div>
          )}

          {project.technologies && (
            <div className="flex flex-wrap gap-2 pt-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-white/5 text-gray-300 border-none hover:bg-white/10 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 text-xs font-mono text-gray-600 tracking-widest uppercase">
            {project.status && <span>{project.status}</span>}
            {project.timeline && <span>{project.timeline}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
