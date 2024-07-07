import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { verificaToken } from "../middlewares/verificaToken"

const prisma = new PrismaClient()
const router = Router()

async function main() {
    /***********************************/
    /* SOFT DELETE MIDDLEWARE */
    /***********************************/
    prisma.$use(async (params, next) => {
      // Check incoming query type
      if (params.model == 'Curso') {
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update'
          params.args['data'] = { deleted: true }
        }
      }
      return next(params)
    })
  }
  main()

  router.get("/", async (req, res) => {
    try {
      const curso = await prisma.curso.findMany({
        where: { deleted: false }
      })
      res.status(200).json(curso)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  router.post("/",  async (req: any, res) => {
    // dados que são fornecidos no corpo da requisição
    const { nome, tipo, valor, nomeProfessor } = req.body
  
    // dado que é acrescentado pelo Token (verificaToken) no req
    const { alunoLogadoId } = req
  
    if (!nome || !tipo || !valor || !nomeProfessor) {
      res.status(400).json({ erro: "Informe o nome do curso, tipo, valor total e o nome do Professor" })
      return
    }
    try {
        const curso = await prisma.curso.create({
          data: { nome, tipo, valor, nomeProfessor}
        })
        res.status(201).json(curso)
      } catch (error) {
        res.status(400).json(error)
      }
    })

    router.delete("/:id", verificaToken, async (req, res) => {
        const { id } = req.params
      
        try {
          const curso = await prisma.curso.delete({
            where: { id: Number(id) }
          })
          res.status(200).json(curso)
        } catch (error) {
          res.status(400).json(error)
        }
    })
    
    router.put("/:id", verificaToken, async (req, res) => {
        const { id } = req.params
        const { nome, tipo, valor, nomeProfessor } = req.body
      
        if (!nome || !tipo || !valor || !nomeProfessor) {
          res.status(400).json({ erro: "Informe nome do curso, tipo, valor total e o nome do professor" })
          return
        }
      
        try {
          const curso = await prisma.curso.update({
            where: { id: Number(id) },
            data: { nome, tipo, valor, nomeProfessor }
          })
          res.status(200).json(curso)
        } catch (error) {
          res.status(400).json(error)
        }
      })

export default router