import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

let alumnos = []

app.use(cors())
app.use(express.json())

// Registro: nombre y apellido
app.post('/alumnos', (req, res) => {
  const { nombre, apellido } = req.body

  if (!nombre || !apellido || typeof nombre !== 'string' || typeof apellido !== 'string') {
    return res.status(400).json({ error: 'Nombre y apellido obligatorios' })
  }

  const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`.toLowerCase()

  const yaExiste = alumnos.some((a) => a.toLowerCase() === nombreCompleto)

  if (yaExiste) {
    return res.status(409).json({ error: 'Este alumno ya está registrado' })
  }

  alumnos.push(`${nombre.trim()} ${apellido.trim()}`)
  res.status(201).json({ mensaje: 'Alumno registrado con éxito' })
})

// Obtener lista
app.get('/alumnos', (req, res) => {
  res.json({ alumnos })
})

// Eliminar todos
app.delete('/alumnos', (req, res) => {
  alumnos = []
  res.json({ mensaje: 'Lista eliminada' })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
