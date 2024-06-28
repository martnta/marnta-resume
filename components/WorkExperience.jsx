import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WorkExperience = ({ experience, onChange }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const addExperience = () => {
    onChange([...experience, newExperience]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const removeExperience = (index) => {
    const newExperienceList = [...experience];
    newExperienceList.splice(index, 1);
    onChange(newExperienceList);
  };

  const updateExperience = (index, field, value) => {
    const newExperienceList = [...experience];
    newExperienceList[index][field] = value;
    onChange(newExperienceList);
  };

  const updateNewExperience = (field, value) => {
    setNewExperience({
      ...newExperience,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <Label>Work Experience</Label>
      <div className="space-y-2">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              placeholder="Company"
            />
            <Input
              value={exp.position}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              placeholder="Position"
            />
            <div className="flex space-x-2">
              <Input
                value={exp.startDate}
                type="date"
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                placeholder="Start Date"
              />
              <Input
                value={exp.endDate}
                type="date"
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                placeholder="End Date"
              />
            </div>
            <Textarea
              value={exp.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              placeholder="Description"
            />
            <Button variant="destructive" onClick={() => removeExperience(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="border p-4 rounded-md">
        <h3 className="font-bold mb-2">Add New Experience</h3>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={newExperience.company}
            onChange={(e) => updateNewExperience('company', e.target.value)}
          />

          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={newExperience.position}
            onChange={(e) => updateNewExperience('position', e.target.value)}
          />

          <div className="flex justify-between">
            <div className="">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newExperience.startDate}
                onChange={(e) => updateNewExperience('startDate', e.target.value)}
              />
            </div>

            <div className="">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newExperience.endDate}
                onChange={(e) => updateNewExperience('endDate', e.target.value)}
              />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newExperience.description}
            onChange={(e) => updateNewExperience('description', e.target.value)}
          />

          <Button onClick={addExperience}>Add Experience</Button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;