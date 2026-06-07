import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MainDashboard.css";
import api from '../api/axios';

/* ---- Dynamic greeting based on time ---- */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { label: "Good Morning", emoji: "🌤️" };
  if (hour < 17) return { label: "Good Afternoon", emoji: "☀️" };
  if (hour < 20) return { label: "Good Evening", emoji: "🌇" };
  return { label: "Good Night", emoji: "🌙" };
}

function Dashboard() {
  const { label, emoji } = getGreeting();
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compRes = await api.get('/complaints');
        const noticeRes = await api.get('/notices');

        if (compRes?.data) setComplaints(compRes.data);
        if (noticeRes?.data) setNotices(noticeRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const pendingCount = complaints.filter(c => c.status?.toLowerCase() === 'pending' || c.status?.toLowerCase() === 'open').length;
  const resolvedCount = complaints.filter(c => c.status?.toLowerCase() === 'resolved').length;

  const stats = [
    { label: "Total Complaints", value: complaints.length, icon: "📋", to: "/student/complaints" },
    { label: "Pending Issues",   value: pendingCount,  icon: "⏳", to: "/student/complaints" },
    { label: "Resolved Issues",  value: resolvedCount, icon: "✅", to: "/student/complaints" },
    { label: "Latest Notices",   value: notices.length,  icon: "📢", to: "/student/notices"    },
  ];

  const recentComplaints = complaints
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)
    .map(c => ({
      ...c,
      meta: c.created_at ? new Date(c.created_at).toLocaleDateString() : "Submitted recently"
    }));

  const latestNotices = notices
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)
    .map(n => ({
      ...n,
      status: "notice",
      meta: n.created_at ? new Date(n.created_at).toLocaleDateString() : "Posted recently"
    }));

  return (
    <div className="dashboard">

      {/* ── Top Bar ── */}
      <div className="dash-topbar">
        <span className="dash-brand">Student<span>Portal</span></span>

        <Link to="/student/search" className="dash-search-link">
          <input
            className="dash-search-input"
            placeholder="Search complaints, notices…"
            readOnly
          />
        </Link>
      </div>

      {/* ── Greeting Banner ── */}
      <div className="dash-greeting">
        <div className="dash-greeting-text">
          <h3>{emoji} {label}!</h3>
          <p>You have {pendingCount} pending complaints and {notices.length} new notices. Stay on top of things.</p>
        </div>
        <div className="dash-greeting-actions">
          <Link to="/student/complaints/create">
            <button className="btn-primary">+ Submit an Issue</button>
          </Link>
          <Link to="/student/notices">
            <button className="btn-ghost">View Notices</button>
          </Link>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="dash-stats">
        {stats.map((s) => (
          <Link to={s.to} key={s.label}>
            <div className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Panels Row ── */}
      <div className="dash-panels">

        {/* Recent Complaints */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Recent Complaints</span>
            <Link to="/student/complaints" className="panel-link">View All →</Link>
          </div>
          <ul className="panel-list">
            {recentComplaints.map((c) => (
              <li key={c.complaint_id} className="panel-item">
                <span className={`item-dot ${c.status}`} />
                <div className="item-info">
                  <div className="item-title">{c.title}</div>
                  <div className="item-meta">{c.meta}</div>
                </div>
                <span className={`item-badge ${c.status}`}>{c.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Notices */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Latest Notices</span>
            <Link to="/student/notices" className="panel-link">See All →</Link>
          </div>
          <ul className="panel-list">
            {latestNotices.map((n) => (
              <li key={n.notice_id} className="panel-item">
                <span className={`item-dot ${n.status}`} />
                <div className="item-info">
                  <div className="item-title">{n.title}</div>
                  <div className="item-meta">{n.meta}</div>
                </div>
                <span className={`item-badge ${n.status}`}>notice</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;