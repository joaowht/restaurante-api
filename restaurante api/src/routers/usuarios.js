import { Router } from "express";
import { conn } from "../config.db.js";
import bcrypt from "bcrypt";

const usuarioRouter = Router()

usuarioRouter.post("/adicionarUser", async (req, res) => {
    const { Nome, Email, Senha, Tipo } = req.body
    const senhaHash = await bcrypt.hash(Senha, 10)
    conn.query(`insert into usuarios (Nome, Email, Senha, Tipo) values ("${Nome}", "${Email}", "${senhaHash}", "${Tipo}")`,
        (err, result) => {
            if (err) {
                console.log("Erro inserir usuário: ", err);
                return;
            } else {
                res.json(`resultado: usuario "${Nome}" adicionado com sucesso!`)
            }
        })
})

usuarioRouter.post("/loginUser", async (req, res) => {
    const { Email, Senha, Tipo } = req.body
    if (!Email || !Email.includes("@")) {
        return res.json("Email inválido!")
    }
    if (!Senha || !["cliente", "restaurante"].includes(Tipo)) {
        return res.json("Dados inválidos!")
    }
    conn.query(`select * from usuarios where Email = "${Email}" AND Tipo = "${Tipo}"`,
        async (err, result) => {
            if (err) {
                console.log("Erro ao buscar usuário: ", err);
                return;
            } else if (result.length === 0) {
                return res.json("Usuário não encontrado!")
            } else {
                const senhaCorreta = await bcrypt.compare(Senha, result[0].Senha)

                if (!senhaCorreta) {
                    return res.json("Senha incorreta!")
                }
                res.json(`Usuário "${result[0].Nome}" logado com sucesso!`)
            }
        })
})

usuarioRouter.get("/listarUser", (req, res) => {
    conn.query(`select * from usuarios order by id asc`,
        (err, result) => {
            if (err) {
                console.log("Erro listar usuários: ", err);
                return;
            } else {
                res.json(result)
            }
        })
})

usuarioRouter.put("/atualizarUser", async (req, res) => {
    const { id, Nome, Email, Senha, Tipo } = req.body
    const senhaHash = await bcrypt.hash(Senha, 10)
    conn.query(`update usuarios set Nome = "${Nome}", Email = "${Email}", Senha = "${senhaHash}", Tipo = "${Tipo}" where id = "${id}"`,
        (err, result) => {
            if (err) {
                console.log("Erro atualizar usuário: ", err);
                return;
            } else {
                res.json(`resultado: usuario "${Nome}" atualizado com sucesso!`)
            }
        })
})

usuarioRouter.delete("/deletarUser", (req, res) => {
    const { ID } = req.body
    conn.query(`delete from usuarios where ID= ${ID}`,
        (err, result) => {
            if (err) {
                res.json(`resultado: "ID inserido não existe"`)
            }
            else {
                res.json(`resultado: "Usuário deletado com sucesso`)
            }
        })
})

export { usuarioRouter }