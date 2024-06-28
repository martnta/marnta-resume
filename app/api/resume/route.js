import { resumeSchema } from '../../../lib/resume'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

const prisma = new PrismaClient()

export async function POST(request) {
  const body = await request.json()
  console.log('Received payload:', body)

  try {
    const resumeData = resumeSchema.parse(body)

    // Check if email is unique
    const existingResume = await prisma.resume.findUnique({
      where: { email: resumeData.email },
    })
    if (existingResume) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 })
    }

    const resume = await prisma.resume.create({
      data: {
        name: resumeData.name,
        email: resumeData.email,
        dateOfBirth: resumeData.dateOfBirth,
        addrss: resumeData.address,
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
    console.error('Error saving resume:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid resume data', errors: error.issues }, { status: 400 })
    }
    return NextResponse.json({ message: 'Error saving resume' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const resume = await prisma.resume.findFirst({
      include: {
        workExperience: true,
        education: true,
        skills: true,
        contacts: true,
        projects: true,
      },
    })

    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json(resume, { status: 200 })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({ message: 'Error fetching resume' }, { status: 500 })
  }
}