import React from 'react';
import { Building, Calendar, MapPin, Phone, FileText, Users, Edit2, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { Job } from '../types';
import { Button, Card } from '../components';

export const JobDetailPage: React.FC = () => {
  const { jobs, deleteJob } = useAppContext();
  const params = new URLSearchParams(window.location.search);
  const jobId = params.get('id');
  
  const job = jobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1 style={{ color: '#f44336', marginBottom: '1rem' }}>404 - Job Not Found</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          The job application you're looking for doesn't exist.
        </p>
        <Button onClick={() => window.location.hash = 'home'}>
          Back to Home
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Applied': return '#ff9800';
      case 'Interviewed': return '#4caf50';
      case 'Rejected': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(job.id);
      window.location.hash = 'home';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Button variant="secondary" onClick={() => window.location.hash = 'home'}>
          ← Back to Jobs
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <h1 style={{ margin: 0, color: '#333' }}>{job.role}</h1>
            <span
              style={{
                backgroundColor: getStatusColor(job.status),
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '16px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {job.status}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: '#666', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building size={20} />
              <span style={{ fontSize: '1.125rem' }}>{job.companyName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} />
              <span>Applied on {new Date(job.dateApplied).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {job.companyAddress && (
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333', marginBottom: '1rem' }}>
                <MapPin size={20} />
                Company Address
              </h3>
              <p style={{ color: '#666', margin: 0, paddingLeft: '1.5rem' }}>{job.companyAddress}</p>
            </div>
          )}

          {job.contactDetails && (
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333', marginBottom: '1rem' }}>
                <Phone size={20} />
                Contact Details
              </h3>
              <p style={{ color: '#666', margin: 0, paddingLeft: '1.5rem' }}>{job.contactDetails}</p>
            </div>
          )}

          {job.jobDuties && (
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333', marginBottom: '1rem' }}>
                <FileText size={20} />
                Job Duties
              </h3>
              <div style={{ paddingLeft: '1.5rem' }}>
                <p style={{ color: '#666', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {job.jobDuties}
                </p>
              </div>
            </div>
          )}

          {job.requirements && (
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333', marginBottom: '1rem' }}>
                <Users size={20} />
                Requirements
              </h3>
              <div style={{ paddingLeft: '1.5rem' }}>
                <p style={{ color: '#666', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {job.requirements}
                </p>
              </div>
            </div>
          )}

          {job.notes && (
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333', marginBottom: '1rem' }}>
                <Edit2 size={20} />
                Notes
              </h3>
              <div style={{ paddingLeft: '1.5rem' }}>
                <p style={{ color: '#666', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {job.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button 
              variant="secondary"
              onClick={() => {
                window.location.hash = `home?edit=${job.id}`;
              }}
            >
              <Edit2 size={16} style={{ marginRight: '0.5rem' }} />
              Edit Application
            </Button>
            <Button 
              variant="danger"
              onClick={handleDelete}
            >
              <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
              Delete Application
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};