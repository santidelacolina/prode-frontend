const API_URL = import.meta.env.VITE_API_URL

export async function getMatches(date) {
  const url = date ? `${API_URL}/matches?date=${date}` : `${API_URL}/matches`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al cargar partidos')
  return res.json()
}