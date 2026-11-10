import { useEffect, useState } from 'react'
import type { KerekparAdat } from '../type/kerekpar'
import { Kerekpar } from './Kerekpar'

const URL = '/kerekparok.json'

export function KerekparLista() {
  const [kerekparok, setKerekparok] = useState<KerekparAdat[]>([])
  const [hiba, setHiba] = useState<string | null>(null)
  const [betoltes, setBetoltes] = useState(true)

  useEffect(() => {
    async function adatokBetoltese() {
      try {
        const valasz = await fetch(URL)
        if (!valasz.ok) {
          throw new Error(`A bicikliik betöltése sikertelen (${valasz.status}).`)
        }

        const adatok: KerekparAdat[] = await valasz.json()
        setKerekparok(adatok)
      } catch (error) {
        setHiba(error instanceof Error ? error.message : ' hiba.')
      } finally {
        setBetoltes(false)
      }
    }

    void adatokBetoltese()
  }, [])

  return (
    <main className="page">
      {hiba ? (
        <p className="error-message" role="alert">{hiba}</p>
      ) : betoltes ? (
        <p className="loading-message" role="status">Kerékpárok betöltése...</p>
      ) : kerekparok.length === 0 ? (
        <p className="loading-message">Jelenleg nincs kiadó kerékpár.</p>
      ) : (
        <section aria-label="Kiadó kerékpárok">
          {kerekparok.map((kerekpar) => (
            <Kerekpar key={kerekpar.id} kerekpar={kerekpar} />
          ))}
        </section>
      )}
    </main>
  )
}
