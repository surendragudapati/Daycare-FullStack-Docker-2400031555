export default function CenterTable({ centers, onEdit, onDelete, deletingId }) {
  if (!centers.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⌂</div>
        <h3>No centers found</h3>
        <p>Try a different search or add your first daycare center.</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Center</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>License</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {centers.map((center) => (
            <tr key={center.id}>
              <td><strong>{center.centerName}</strong></td>
              <td className="muted-cell">{center.location}</td>
              <td>{center.childCapacity} children</td>
              <td>
                <span className={`license-badge ${center.licensed ? 'licensed' : 'unlicensed'}`}>
                  <span className="badge-dot" />
                  {center.licensed ? 'Licensed' : 'Not licensed'}
                </span>
              </td>
              <td className="actions">
                <button className="text-button" type="button" onClick={() => onEdit(center)}>Edit</button>
                <button className="text-button danger" type="button" onClick={() => onDelete(center)} disabled={deletingId === center.id}>
                  {deletingId === center.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
