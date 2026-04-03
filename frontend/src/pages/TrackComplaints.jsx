export default function TrackComplaints() {
  const data = [
    { id: 1, title: "Transcript delay", status: "Pending" },
    { id: 2, title: "Marks correction", status: "Resolved" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Track Complaints</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th><th>Title</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id} className="text-center">
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}