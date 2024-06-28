import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const Education = ({ education, onChange }) => {
  const addEducation = () => {
    onChange([
      ...education,
      {
        institution: '',
        qualification: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onChange(newEducation);
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    onChange(newEducation);
  };

  return (
    <div className="space-y-4">
      <Label>Education</Label>
      <div className="space-y-2">
        {education.map((edu, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              placeholder="Institution"
            />
            <Select
              onValueChange={(value) => updateEducation(index, 'qualification', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Qualifications</SelectLabel>
                  <SelectItem value="High School Diploma">High School Diploma</SelectItem>
                  <SelectItem value="Associate's Degree">Associate`s Degree</SelectItem>
                  <SelectItem value="Bachelor's Degree">Bachelor`s Degree</SelectItem>
                  <SelectItem value="Master's Degree">Master`s Degree</SelectItem>
                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              value={edu.fieldOfStudy}
              onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
              placeholder="Field of Study"
            />
            <div className="flex space-x-2">
              <Input
                value={edu.startDate}
                type="date"
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                placeholder="Start Date"
              />
              <Input
                value={edu.endDate}
                type="date"
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                placeholder="End Date"
              />
            </div>
            <Button variant="destructive" onClick={() => removeEducation(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addEducation}>Add Education</Button>
    </div>
  );
};

export default Education;