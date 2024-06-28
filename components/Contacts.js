// Contacts.jsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Contacts = ({contacts, onChange}) => {
  const addContact = () => {
    onChange([...contacts, { type: '', value: '' }])
  }

  const removeContact = (index) => {
    const newContacts = [...contacts]
    newContacts.splice(index, 1)
    onChange(newContacts)
  }

  const updateContact = (index, field, value) => {
    const newContacts = [...contacts]
    newContacts[index][field] = value
    onChange(newContacts)
  }

  return (
    <div className="space-y-4">
      <Label>Contacts</Label>
      <div className="space-y-2">
        {contacts.map((contact, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              value={contact.type}
              onChange={(e) => updateContact(index, 'type', e.target.value)}
              placeholder="Type"
            />
            <Input
              value={contact.value}
              onChange={(e) => updateContact(index, 'value', e.target.value)}
              placeholder="Value"
            />
            <Button variant="destructive" onClick={() => removeContact(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addContact}>Add Contact</Button>
    </div>
  )
}

export default Contacts
