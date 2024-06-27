// app/api/resume/route.js
import { resumeSchema } from '../../../lib/resume'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const body = await request.json()

  try {
    const resumeData = resumeSchema.parse(body)

    const resume = await prisma.resume.create({
      data: {
        name: resumeData.name,
        email: resumeData.email,
        workExperience: {
          create: resumeData.experience.map((exp) => ({
            company: exp.company,
            position: exp.position,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            description: exp.description,
          })),
        },
        education: {
          create: resumeData.education.map((edu) => ({
            institution: edu.institution,
            qualification: edu.qualification,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate ? new Date(edu.endDate) : null,
          })),
        },
        skills: {
          create: resumeData.skills.map((skill) => ({
            name: skill,
          })),
        },
        contacts: {
          create: resumeData.contacts.map((contact) => ({
            type: contact.type,
            value: contact.value,
          })),
        },
        projects: {
          create: resumeData.projects.map((project) => ({
            name: project.name,
            description: project.description,
            startDate: new Date(project.startDate),
            endDate: project.endDate ? new Date(project.endDate) : null,
          })),
        },
      },
    })

    return NextResponse.json({ message: 'Resume saved successfully' }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid resume data' }, { status: 400 })
    }

    console.error(error)
    return NextResponse.json({ message: 'Error saving resume' }, { status: 500 })
  }
}
