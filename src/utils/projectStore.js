import { useState, useEffect } from "react";
import { PROJECTS as DEFAULT_PROJECTS } from "../data/portfolioData";

const STORAGE_KEY = "malik_portfolio_projects";
const UPDATE_EVENT = "malik_portfolio_projects_updated";

export function getStoredProjects() {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PROJECTS;
  } catch (e) {
    console.error("Failed to parse stored projects, falling back to defaults", e);
    return DEFAULT_PROJECTS;
  }
}

export function saveStoredProjects(projects) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(UPDATE_EVENT));
  } catch (e) {
    console.error("Failed to save projects to storage", e);
  }
}

export function addProjectToStore(projectData) {
  const current = getStoredProjects();
  const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const id = projectData.id || slug || `project-${Date.now()}`;
  const newProject = {
    ...projectData,
    id,
    slug,
    number: String(current.length + 1).padStart(2, "0"),
    year: projectData.year || String(new Date().getFullYear()),
    featured: projectData.featured ?? true,
    previewImage: projectData.previewImage || "/images/projects/hayatabad-school.jpg",
    heroImage: projectData.heroImage || projectData.previewImage || "/images/projects/hayatabad-school.jpg",
    technologies: Array.isArray(projectData.technologies)
      ? projectData.technologies
      : (projectData.technologies || "").split(",").map(s => s.trim()).filter(Boolean),
    services: Array.isArray(projectData.services)
      ? projectData.services
      : (projectData.services || "").split(",").map(s => s.trim()).filter(Boolean),
    metrics: Array.isArray(projectData.metrics) ? projectData.metrics : [],
    gallery: Array.isArray(projectData.gallery) ? projectData.gallery : [],
  };

  const updated = [newProject, ...current];
  saveStoredProjects(updated);
  return newProject;
}

export function updateProjectInStore(idOrSlug, updatedData) {
  const current = getStoredProjects();
  const index = current.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug);
  if (index === -1) return null;

  const existing = current[index];
  const merged = {
    ...existing,
    ...updatedData,
    technologies: Array.isArray(updatedData.technologies)
      ? updatedData.technologies
      : (updatedData.technologies || "").split(",").map(s => s.trim()).filter(Boolean),
    services: Array.isArray(updatedData.services)
      ? updatedData.services
      : (updatedData.services || "").split(",").map(s => s.trim()).filter(Boolean),
  };

  const updated = [...current];
  updated[index] = merged;
  saveStoredProjects(updated);
  return merged;
}

export function deleteProjectFromStore(idOrSlug) {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  saveStoredProjects(updated);
  return updated;
}

export function resetProjectsToDefault() {
  saveStoredProjects(DEFAULT_PROJECTS);
  return DEFAULT_PROJECTS;
}

export function useProjects() {
  const [projects, setProjects] = useState(getStoredProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    projects,
    addProject: addProjectToStore,
    updateProject: updateProjectInStore,
    deleteProject: deleteProjectFromStore,
    resetProjects: resetProjectsToDefault,
  };
}
