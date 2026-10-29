const cards = [
  { key: 'centers', label: 'Total centers', icon: '⌂' },
  { key: 'capacity', label: 'Total child capacity', icon: '◌' },
  { key: 'licensed', label: 'Licensed centers', icon: '✓' },
]

export default function SummaryCards({ summary }) {
  return (
    <section className="summary-grid" aria-label="Daycare summary">
      {cards.map((card) => (
        <article className="summary-card" key={card.key}>
          <div className="summary-card-top">
            <span className="summary-label">{card.label}</span>
            <span className="summary-icon" aria-hidden="true">{card.icon}</span>
          </div>
          <strong>{summary[card.key]}</strong>
        </article>
      ))}
    </section>
  )
}
