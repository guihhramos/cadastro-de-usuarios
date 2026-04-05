import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

// Rota para criar usuários (POST /usuarios)
app.post('/usuarios', async (req, res) => {
    try {
        const { email, name, age } = req.body
        const user = await prisma.user.create({
            data: {
                email,
                name,
                age,
            }
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar usuário", details: error.message })
    }
})

// Rota para listar usuários (GET /usuarios) com suporte a filtros via Query Params
app.get('/usuarios', async (req, res) => {
    try {
        let users = []
        
        if (Object.keys(req.query).length > 0) {
            users = await prisma.user.findMany({
                where: {
                    name: req.query.name,
                    email: req.query.email,
                    age: req.query.age
                }
            })
        } else {
            users = await prisma.user.findMany()
        }
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários", details: error.message })
    }
})

// Rota para editar usuário (PUT /usuarios/:id)
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { email, name, age } = req.body
        const user = await prisma.user.update({
            where: {
                id: req.params.id
            },
            data: {
                email,
                name,
                age,
            }
        })
        res.status(201).json(user) // No vídeo, o instrutor usa 201 para PUT também
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar usuário", details: error.message })
    }
})

// Rota para deletar usuário (DELETE /usuarios/:id)
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: "Usuário deletado com sucesso!" })
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar usuário", details: error.message })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
