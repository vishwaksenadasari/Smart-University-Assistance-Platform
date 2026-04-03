export default function Departments() {
  const deps = [
    { name: "Examination", email: "exam@uni.com" },
    { name: "Admin", email: "admin@uni.com" }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Departments</h2>

      {deps.map((d, i) => (
        <div key={i} className="p-4 border mb-3">
          <h3>{d.name}</h3>
          <p>{d.email}</p>
        </div>
      ))}
    </div>
  );
}