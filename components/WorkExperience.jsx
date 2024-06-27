import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WorkExperience = ({ experience, onChange, newExperience, setNewExperience }) => {
  const handleAddExperience = () => {
    onChange([...experience, newExperience]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    onChange(updatedExperience);
  };

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div key={index} className="border p-4 rounded-md">
          <h3 className="font-bold">{exp.company}</h3>
          <p>{exp.position}</p>
          <p>{`${exp.startDate} - ${exp.endDate}`}</p>
          <p>{exp.description}</p>
          <Button variant="destructive" onClick={() => handleRemoveExperience(index)}>
            Remove
          </Button>
        </div>
      ))}

      <div className="border p-4 rounded-md">
        <h3 className="font-bold mb-2">Add New Experience</h3>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
          />

          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
          />

          <div className="flex justify-between">
            <div className="">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
            </div>

            <div className="">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
          />

          <Button onClick={handleAddExperience}>Add Experience</Button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
