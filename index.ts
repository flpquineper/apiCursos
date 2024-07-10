import express from 'express'
import cors from 'cors'
import cursoRoutes from './routes/curso'
import alunoRoutes from './routes/aluno'
import loginRoutes from './routes/login'

const port = 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/curso", cursoRoutes)
app.use("/alunos", alunoRoutes)
app.use("/login", loginRoutes)

app.get('/', (req, res) => {
    res.send('API de Cadastro em Cursos')
  })
  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
  })