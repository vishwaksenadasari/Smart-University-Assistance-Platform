export default function Notices() {
  const notices = [
    { title: "Mid exams postponed", date: "12 March" },
    { title: "Holiday announced", date: "15 March" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Notices</h2>

      {notices.map((n, i) => (
        <div key={i} className="p-4 border mb-3 rounded">
          <h3 className="font-bold">{n.title}</h3>
          <p>{n.date}</p>
        </div>
      ))}
    </div>
  );
}