export default function MatchCard({ match }) {
  const statusLabel = {
    SCHEDULED: '🕐 Programado',
    IN_PLAY: '🟢 En vivo',
    LIVE: '🟢 En vivo',
    FINISHED: '✅ Finalizado',
    POSTPONED: '⏸ Postergado'
  }

  return (
    <div style={styles.card}>
      <div style={styles.teams}>
        <span style={styles.team}>{match.homeTeam}</span>
        <div style={styles.score}>
          {match.homeScore !== null && match.awayScore !== null
            ? `${match.homeScore} - ${match.awayScore}`
            : `${match.time} hs`}
        </div>
        <span style={styles.team}>{match.awayTeam}</span>
      </div>
      <div style={styles.status}>{statusLabel[match.status] || match.status}</div>
      {match.group && <div style={styles.group}>Grupo {match.group}</div>}
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: '12px 16px',
    marginBottom: 8,
    background: '#fff'
  },
  teams: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12
  },
  team: { flex: 1, fontWeight: 500, fontSize: 15 },
  score: {
    padding: '4px 12px',
    background: '#f0f0f0',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 16,
    minWidth: 80,
    textAlign: 'center'
  },
  status: { fontSize: 12, color: '#888', marginTop: 6 },
  group: { fontSize: 12, color: '#aaa' }
}