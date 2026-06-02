import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMatches } from '../api/matches'
import MatchCard from '../components/MatchCard'

export default function Fixture() {
  const [selectedDate, setSelectedDate] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['matches', selectedDate],
    queryFn: () => getMatches(selectedDate || undefined)
  })

  // Agrupar partidos por fecha
  const matchesByDate = (data?.matches || []).reduce((acc, match) => {
    if (!acc[match.date]) acc[match.date] = []
    acc[match.date].push(match)
    return acc
  }, {})

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1>⚽ Fixture Mundial 2026</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Filtrar por fecha: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
        {selectedDate && (
          <button onClick={() => setSelectedDate('')} style={{ marginLeft: 8 }}>
            Ver todos
          </button>
        )}
      </div>

      {isLoading && <p>Cargando partidos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {Object.entries(matchesByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, matches]) => (
          <div key={date} style={{ marginBottom: 24 }}>
            <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: 4 }}>
              {new Date(date + 'T12:00:00').toLocaleDateString('es-AR', {
                weekday: 'long', day: 'numeric', month: 'long'
              })}
            </h3>
            {matches
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(match => <MatchCard key={match.matchId} match={match} />)
            }
          </div>
        ))
      }
    </div>
  )
}