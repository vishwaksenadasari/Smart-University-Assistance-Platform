export default function SubmitIssue() {
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Submit Issue</h2>

      <input className="border p-2 w-full mb-3" placeholder="Title" />

      <select className="border p-2 w-full mb-3">
        <option>Select Department</option>
        <option>Examination</option>
        <option>Administration</option>
      </select>

      <textarea className="border p-2 w-full mb-3" placeholder="Description" />

      <button className="bg-blue-600 text-white p-2">Submit</button>
    </div>
  );
}