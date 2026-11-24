import { Router } from "express";
import { conn } from "../config.db.js";

const produtosRouter = Router()

produtosRouter.post("/adicionarProduto", (req, res) => {
    const { Nome, Descricao, Preco, Categoria, Disponivel } = req.body
    conn.query(`insert into produtos (Nome, Descricao, Preco, Categoria, Disponivel) values ("${Nome}", "${Descricao}", ${Preco}, "${Categoria}", ${Disponivel})`,
        (err, result) => {
            if (err) {
                console.log("Erro inserir produto: ", err);
            } else {
                res.json(`resultado: produto "${Nome}" adicionado com sucesso!`)
            }
        })
})

produtosRouter.get("/listarProdutos", (req, res) => {
    conn.query(`select * from produtos`,
        (err, result) => {
            if (err) {
                console.log("Erro listar produtos: ", err);
            } else {
                res.json(result)
            }
        })
})

produtosRouter.get("/buscarProduto", (req, res) => {
    const { id } = req.body
    conn.query(`select * from produtos where id = "${id}"`,
        (err, result) => {
            if (err) {
                console.log("Erro buscar produto: ", err);
            } else {
                res.json(result)
            }
        })
})

produtosRouter.put("/atualizarProduto", (req, res) => {
    const { id, Nome, Descricao, Preco, Categoria, Disponivel } = req.body
    conn.query(`update produtos set Nome = "${Nome}", Descricao = "${Descricao}", Preco = ${Preco}, Categoria = "${Categoria}", Disponivel = ${Disponivel} where id = "${id}"`,
        (err, result) => {
            if (err) {
                console.log("Erro atualizar produto: ", err);
            } else {
                res.json(`resultado: produto "${Nome}" atualizado com sucesso!`)
            }
        })
})

produtosRouter.delete("/deletarProduto", (req, res) => {
    const { id } = req.body
    conn.query(`delete from produtos where id = "${id}"`,
        (err, result) => {
            if (err) {
                console.log("Erro deletar produto: ", err);
            } else {
                res.json(`resultado: produto de id "${id}" deletado com sucesso!`)
            }
        })
})

export { produtosRouter }