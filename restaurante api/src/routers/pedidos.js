import { Router } from "express";
import { conn } from "../config.db.js";

const pedidosRouter = Router()

pedidosRouter.post("/adicionarPedido", (req, res) => {
    const { ID_usuario, valor_total, status, data } = req.body
    conn.query(`insert into pedidos (ID_usuario, valor_total, status, data) values ("${ID_usuario}", ${valor_total}, "${status}", "${data}")`,
        (err, result) => {
            if (err) {
                console.log("Erro inserir pedido: ", err);
            } else {
                res.json(`resultado: pedido adicionado com sucesso!`)
            }
        })
})

pedidosRouter.get("/listarPedidos", (req, res) => {
    conn.query(`select * from pedidos`,
        (err, result) => {
            if (err) {
                console.log("Erro listar pedidos: ", err);
            } else {
                res.json(result)
            }
        })
})

pedidosRouter.get("/buscarPedido", (req, res) => {
    const { ID } = req.body
    conn.query(`select * from pedidos where ID = "${ID}"`,
        (err, result) => {
            if (err) {
                console.log("Erro buscar pedido: ", err);
            } else {
                res.json(result)
            }
        })
})

pedidosRouter.put("/atualizarPedido", (req, res) => {
    const { ID, ID_usuario, valor_total, status, data } = req.body
    conn.query(`update pedidos set ID_usuario = "${ID_usuario}", valor_total = ${valor_total}, status = "${status}", data = "${data}" where ID = "${ID}"`,
        (err, result) => {
            if (err) {
                console.log("Erro atualizar pedido: ", err);
            } else {
                res.json(`resultado: pedido "${ID}" atualizado com sucesso!`)
            }
        })
})

pedidosRouter.delete("/deletarPedido", (req, res) => {
    const { ID } = req.body
    conn.query(`delete from pedidos where ID = "${ID}"`,
        (err, result) => {
            if (err) {
                console.log("Erro deletar pedido: ", err);
            } else {
                res.json(`resultado: pedido "${ID}" deletado com sucesso!`)
            }
        })
})

export { pedidosRouter }