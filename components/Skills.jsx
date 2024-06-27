import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Skills = () => {
  const [skills, setSkills] = useState([''])

  const addSkill = () => {
    setSkills([...skills, ''])
  }

  const removeSkill = (index) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
  }

  const updateSkill = (index, value) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  return (
    <div className="space-y-4">
      <Label>Skills</Label>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
            />
            <Button variant="destructive" onClick={() => removeSkill(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addSkill}>Add Skill</Button>
    </div>
  )
}

export default Skills
