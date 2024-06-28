// lib/resume.js
import { z } from 'zod'

export const resumeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  dateOfBirth: z.string().optional(),
  address: z.string(),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      qualification: z.string(),
      fieldOfStudy: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
    })
  ),
  skills: z.array(z.string()),
  contacts: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
    })
  ),
})