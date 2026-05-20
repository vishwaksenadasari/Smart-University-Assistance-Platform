// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";
import api from '../api/axios';

/* ---- Dynamic greeting based on time ---- */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { label: "Good Morning", emoji: "🌤️" };
  if (hour < 17) return { label: "Good Afternoon", emoji: "☀️" };
  if (hour < 20) return { label: "Good Evening", emoji: "🌇" };
  return { label: "Good Night", emoji: "🌙" };
}

export default function AdminDashboard() {
  const { label, emoji } = getGreeting();
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const compRes = await api.get('/admin/complaints');
        const noticeRes = await api.get('/admin/notices');

        if (compRes?.data) setComplaints(compRes.data);
        if (noticeRes?.data) setNotices(noticeRes.data);
        setError('');
      } catch (err) {
        console.error("Admin Dashboard fetch error:", err);
        setError(err.response?.data?.error || 'Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pendingCount = complaints.filter(c => 
    ['pending', 'open', 'in progress'].includes(c.status?.toLowerCase()) // Ensure status is lowercase for comparison
  ).length;
  const resolvedCount = complaints.filter(c => c.status?.toLowerCase() === 'resolved').length;

  const recentComplaints = complaints
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)
    .map(c => ({
        ...c,
        meta: c.created_at ? new Date(c.created_at).toLocaleDateString() : "Submitted recently"
    }));

  return (
    <div className="admin-dashboard-page">
      <div className="admin-content-wrapper">
        
        {/* TOPBAR */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <h2 className="admin-page-title">Admin Dashboard</h2>
            <p className="admin-page-subtitle">University Assistance Management System</p>
          </div>

          {/* Search + Profile */}
          <div className="topbar-right">
            {/* Search */}
            <div className="admin-search-box">
              <span className="search-emoji">🔍</span>
              <Link to='/admin/search'>
              <input
                type="text"
                placeholder="Search..."
                className="admin-search-input"
              />
              </Link>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="admin-stats">
          {/* Total Complaints */}
          <Link to='/admin/complaints'>
          <div className="stat-card"> {/* Removed hardcoded value */}
            <div className="stat-card-content">
              <div className="stat-info">
                <p className="stat-label">Total Complaints</p>
                <h3 className="stat-number text-blue">{complaints.length}</h3>
              </div>
              <div className="stat-icon bg-blue-lt">📋</div>
            </div>
          </div>
          </Link>

          {/* Pending */}
          <Link to='/admin/complaints'>
          <div className="stat-card"> {/* Removed hardcoded value */}
            <div className="stat-card-content">
              <div className="stat-info">
                <p className="stat-label">Pending</p>
                <h3 className="stat-number text-yellow">{pendingCount}</h3>
              </div>
              <div className="stat-icon bg-yellow-lt">⏳</div>
            </div>
          </div>
          </Link>

          {/* Resolved */}
          <Link to='/admin/complaints'>
          <div className="stat-card"> {/* Removed hardcoded value */}
            <div className="stat-card-content">
              <div className="stat-info">
                <p className="stat-label">Resolved</p>
                <h3 className="stat-number text-green">{resolvedCount}</h3>
              </div>
              <div className="stat-icon bg-green-lt">✅</div>
            </div>
          </div>
          </Link>
        </div>

        {error && <p className="manage-error">{error}</p>}

        {loading && <p className="loading-text">Loading admin dashboard data...</p>}

        {!loading && complaints.length === 0 && notices.length === 0 && !error && (
          <div className="admin-greeting">
            <h2>{emoji} {label}, Admin!</h2>
            <p>No data available. Start by creating some notices or managing complaints.</p>
          </div>
        )}


        {/* MAIN GRID */}
        <div className="admin-main-grid">
          {/* COMPLAINT TABLE */}
          <div className="panel complaints-panel">
            <div className="panel-header">
              <h3 className="panel-title">Recent Complaints</h3>
            </div>
            {recentComplaints.length === 0 && !loading && !error && (
              <p className="empty-text">No recent complaints to display.</p>
            )}
            
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Issue</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.length > 0 && recentComplaints.map((item) => (
                    <tr key={item.complaint_id}>
                      <td className="font-medium">{item.student_id}</td>
                      <td>{item.title}</td>
                      <td>{item.department || 'N/A'}</td>
                      <td>
                        <span className={`item-badge ${item.status?.toLowerCase().replace(' ', '')}`}>
                          {item.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}