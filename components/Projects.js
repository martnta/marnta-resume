import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Projects = ({ projects, onChange }) => {
  const addProject = () => {
    onChange([...projects, { name: '', description: '', startDate: '', endDate: '' }]);
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onChange(newProjects);
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    onChange(newProjects);
  };

  return (
    <div className="space-y-4">
      <Label>Projects</Label>
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <Input
              value={project.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              placeholder="Project Name"
            />
            <Input
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              placeholder="Project Description"
            />
            <div className="flex space-x-2">
              <Input
                value={project.startDate}
                type='date'
                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                placeholder="Start Date"
              />
              <Input
                value={project.endDate}
                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                type= 'date'
                placeholder="End Date"
              />
            </div>
            <Button variant="destructive" onClick={() => removeProject(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addProject}>Add Project</Button>
    </div>
  );
};

export default Projects;
