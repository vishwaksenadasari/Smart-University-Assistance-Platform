export default function Card({ title, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 shadow rounded cursor-pointer hover:bg-blue-50"
    >
      {title}
    </div>
  );
}