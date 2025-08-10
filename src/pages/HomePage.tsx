import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, ArrowUpDown, Briefcase, Building, Calendar, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { Job } from '../types';
import { Button, Card, Select, JobFormModal } from '../components';

export const HomePage: React.FC = () => {
  const { jobs, deleteJob } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Get URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('search') || '');
    setStatusFilter(params.get('status') || '');
    setSortOrder(params.get('sort') || 'desc');
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (statusFilter) params.set('status', statusFilter);
    if (sortOrder !== 'desc') params.set('sort', sortOrder);
    
    const newUrl = `${window.location.pathname}${window.location.hash}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [searchTerm, statusFilter, sortOrder]);

  const filteredJobs = jobs
    ?.filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }) || [];

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Applied': return '#ff9800';
      case 'Interviewed': return '#4caf50';
      case 'Rejected': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const handleViewJob = (jobId: string) => {
    window.location.hash = `job?id=${jobId}`;
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(jobId);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333' }}>My Job Applications</h1>
        <Button onClick={() => setShowJobForm(true)}>
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          Add Job
        </Button>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#666',
              pointerEvents: 'none'
            }} />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'Applied', label: 'Applied' },
              { value: 'Interviewed', label: 'Interviewed' },
              { value: 'Rejected', label: 'Rejected' }
            ]}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={16} style={{ color: '#666' }} />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white',
                flex: 1
              }}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Applications', count: jobs?.length || 0, color: '#1976d2' },
          { label: 'Applied', count: jobs?.filter(j => j.status === 'Applied').length || 0, color: '#ff9800' },
          { label: 'Interviewed', count: jobs?.filter(j => j.status === 'Interviewed').length || 0, color: '#4caf50' },
          { label: 'Rejected', count: jobs?.filter(j => j.status === 'Rejected').length || 0, color: '#f44336' }
        ].map((stat, i) => (
          <Card key={i}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.count}</div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <Briefcase size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No job applications found. Add your first application to get started!</p>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredJobs.map(job => (
            <Card key={job.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>{job.role}</h3>
                    <span
                      style={{
                        backgroundColor: getStatusColor(job.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#666', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Building size={16} />
                      {job.companyName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={16} />
                      {new Date(job.dateApplied).toLocaleDateString()}
                    </div>
                  </div>
                  {job.notes && (
                    <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
                      {job.notes.length > 100 ? `${job.notes.substring(0, 100)}...` : job.notes}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleViewJob(job.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                    title="View Details"
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    onClick={() => setEditingJob(job)}
                    style={{
                      background: 'none',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer'
                    }}
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #f44336',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      color: '#f44336'
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {(showJobForm || editingJob) && (
        <JobFormModal
          job={editingJob}
          onClose={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
};