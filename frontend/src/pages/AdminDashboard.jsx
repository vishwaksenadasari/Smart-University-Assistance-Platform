export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow">Total Complaints: 120</div>
        <div className="p-4 bg-white shadow">Resolved: 90</div>
        <div className="p-4 bg-white shadow">Pending: 30</div>
      </div>
    </div>
  );
}