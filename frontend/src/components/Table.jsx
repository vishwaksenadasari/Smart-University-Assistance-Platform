export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-sm text-left border-collapse">
        
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-3 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {Object.values(row).map((value, j) => (
                  <td key={j} className="p-3">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}

// Helper function for status styling
function renderCell(value) {
  if (value === "Pending") {
    return <span className="text-yellow-600 font-semibold">🟡 Pending</span>;
  }
  if (value === "In Progress") {
    return <span className="text-blue-600 font-semibold">🔵 In Progress</span>;
  }
  if (value === "Resolved") {
    return <span className="text-green-600 font-semibold">🟢 Resolved</span>;
  }
  return value;
}