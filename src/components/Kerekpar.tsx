import type { KerekparAdat } from '../type/kerekpar'

type KerekparProps = {
  kerekpar: KerekparAdat
}

export function Kerekpar({ kerekpar }: KerekparProps) {
  return (
    <article>
      <h3 style={{ color: kerekpar.szin }}>{kerekpar.nev}</h3>
      <p>Típus: <em>{kerekpar.tipus}</em></p>
      <p>Napi bérleti díj: <u>{kerekpar.napiDij}</u></p>
    </article>
  )
}
