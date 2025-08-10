import React, { useState } from 'react';
import type { Job } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { Button, Input, Select, TextArea } from '..';

interface JobFormModalProps {
  job?: Job | null;
  onClose: () => void;
}

export const JobFormModal: React.FC<JobFormModalProps> = ({ job, onClose }) => {
  const { addJob, updateJob } = useAppContext();
  const [formData, setFormData] = useState({
    companyName: job?.companyName || '',
    role: job?.role || '',
    status: job?.status || 'Applied' as Job['status'],
    dateApplied: job?.dateApplied || new Date().toISOString().split('T')[0],
    companyAddress: job?.companyAddress || '',
    contactDetails: job?.contactDetails || '',
    jobDuties: job?.jobDuties || '',
    requirements: job?.requirements || '',
    notes: job?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      updateJob(job.id, formData);
    } else {
      addJob(formData);
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '2rem', color: '#333' }}>
          {job ? 'Edit Job Application' : 'Add Job Application'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Company Name"
              value={formData.companyName}
              onChange={(value) => setFormData({...formData, companyName: value})}
              required
            />
            <Input
              label="Role"
              value={formData.role}
              onChange={(value) => setFormData({...formData, role: value})}
              required
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Select
              label="Status"
              value={formData.status}
              onChange={(value) => setFormData({...formData, status: value as Job['status']})}
              options={[
                { value: 'Applied', label: 'Applied' },
                { value: 'Interviewed', label: 'Interviewed' },
                { value: 'Rejected', label: 'Rejected' }
              ]}
            />
            <Input
              label="Date Applied"
              type="date"
              value={formData.dateApplied}
              onChange={(value) => setFormData({...formData, dateApplied: value})}
              required
            />
          </div>

          <Input
            label="Company Address"
            value={formData.companyAddress}
            onChange={(value) => setFormData({...formData, companyAddress: value})}
            placeholder="123 Company St, City, Country"
          />
          
          <Input
            label="Contact Details"
            value={formData.contactDetails}
            onChange={(value) => setFormData({...formData, contactDetails: value})}
            placeholder="hr@company.com or +1234567890"
          />

          <TextArea
            label="Job Duties"
            value={formData.jobDuties}
            onChange={(value) => setFormData({...formData, jobDuties: value})}
            placeholder="Describe the main responsibilities and duties..."
            rows={3}
          />

          <TextArea
            label="Requirements"
            value={formData.requirements}
            onChange={(value) => setFormData({...formData, requirements: value})}
            placeholder="List the key requirements and qualifications..."
            rows={3}
          />

          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(value) => setFormData({...formData, notes: value})}
            placeholder="Any additional notes or observations..."
            rows={2}
          />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {job ? 'Update' : 'Add'} Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};