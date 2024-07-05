import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()


router.post("/", async (req, res) => {
    const { email, senha } = req.body
  
    // em termos de segurança, o recomendado é exibir uma mensagem padrão
    // a fim de evitar de dar "dicas" sobre o processo de login para hackers
    const mensaPadrao = "Login ou senha incorretos"
  
    if (!email || !senha) {
      // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }
  
    try {
      const aluno = await prisma.aluno.findFirst({
        where: { email }
      })
  
      if (aluno == null) {
        // res.status(400).json({ erro: "E-mail inválido" })
        res.status(400).json({ erro: mensaPadrao })
        return
      }
  
      // se o e-mail existe, faz-se a comparação dos hashs
      if (bcrypt.compareSync(senha, aluno.senha)) {
        // se confere, gera e retorna o token
        const token = jwt.sign({
          userLogadoId: aluno.id,
          userLogadoNome: aluno.nome
        },
          process.env.JWT_KEY as string,
          { expiresIn: "1h" }
        )
  
        res.status(200).json({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
          token
        })
      } else {
        // res.status(400).json({ erro: "Senha incorreta" })
  
        await prisma.log.create({
          data: { 
            descricao: "Tentativa de Acesso Inválida", 
            complemento: `Aluno: ${aluno.email}`,
            alunoId: aluno.id
          }
        })
  
        res.status(400).json({ erro: mensaPadrao })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })
  
export default router

