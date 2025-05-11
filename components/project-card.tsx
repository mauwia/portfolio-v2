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
      className="relative p-6 rounded-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-lg"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          {/* <span className="text-xl font-bold">{project.icon}</span>
           */}
          {project.icon.length === 1 ? (
            <span className="text-xl font-bold">{project.icon}</span>
          ) : (
            <img
              src={project.icon}
              alt={project.name}
              className="w-10 h-10 rounded-full"
              style={{
                // backgroundColor: project.color,
                borderRadius: "50%",
                padding: "2px",
              }}
            />
          )}
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex justify-between items-start">
            <Link
              href={project.url}
              className="font-medium text-lg hover:underline flex items-center gap-1 group"
            >
              {project.name}{" "}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {project.featured && (
              <Badge variant="outline" className="bg-black/5 dark:bg-white/10">
                Featured
              </Badge>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            {project.description}
          </p>

          {project.longDescription?.length &&
            project.longDescription.map((line, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                - {line}
              </p>
            ))}

          {project.technologies && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-2 text-sm text-gray-500 dark:text-gray-400">
            {project.status && <span>{project.status}</span>}
            {project.timeline && <span>{project.timeline}</span>}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 -z-10 rounded-lg opacity-30 blur-xl"
          style={{
            background: `radial-gradient(circle at ${rotation.y * -10 + 50}% ${
              rotation.x * -10 + 50
            }%, rgba(255,255,255,0.8) 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
