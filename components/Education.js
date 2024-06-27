"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

const DatePickerDemo = ({ date, onDateChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const Education = () => {
  const [educations, setEducations] = useState([
    {
      institution: '',
      qualification: '',
      fieldOfStudy: '',
      startDate: null,
      endDate: null,
    },
  ]);

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        institution: '',
        qualification: '',
        fieldOfStudy: '',
        startDate: null,
        endDate: null,
      },
    ]);
  };

  const removeEducation = (index) => {
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations);
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  return (
    <div className="space-y-4">
      {educations.map((education, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-md p-4 space-y-4"
        >
          <div className="grid gap-2">
            <Label htmlFor={`education-${index}-institution`}>
              Institution
            </Label>
            <Input
              id={`education-${index}-institution`}
              value={education.institution}
              onChange={(e) =>
                updateEducation(index, 'institution', e.target.value)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`education-${index}-qualification`}>
              Qualification
            </Label>
            <Select
              onValueChange={(value) => updateEducation(index, 'qualification', value)}
              value={education.qualification}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a qualification" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Qualification</SelectLabel>
                  <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                  <SelectItem value="Master's">Master's</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Certificate">Certificate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`education-${index}-fieldOfStudy`}>
              Field of Study
            </Label>
            <Input
              id={`education-${index}-fieldOfStudy`}
              value={education.fieldOfStudy}
              onChange={(e) =>
                updateEducation(index, 'fieldOfStudy', e.target.value)
              }
            />
          </div>
          <div className="flex justify-between">
            <div className="grid gap-2">
              <Label htmlFor={`education-${index}-startDate`}>Start Date</Label>
              <DatePickerDemo
                date={education.startDate}
                onDateChange={(date) => updateEducation(index, 'startDate', date)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`education-${index}-endDate`}>End Date</Label>
              <DatePickerDemo
                date={education.endDate}
                onDateChange={(date) => updateEducation(index, 'endDate', date)}
              />
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={() => removeEducation(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={addEducation}>Add Education</Button>
    </div>
  );
};

export default Education;
