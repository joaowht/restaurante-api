
import { Router } from "express";
import { conn } from "../config.db.js";

const pedidosRouter = Router();

// ADICIONAR PEDIDO
pedidosRouter.post("/adicionarPedido", (req, res) => {
    const { ID_usuario, valor_total, status, data } = req.body;

    if (!Number.isInteger(Number(ID_usuario)) || Number(ID_usuario) <= 0 ||
        valor_total === undefined || !Number.isInteger(Number(valor_total)) ||
        Number(valor_total) < 0 || !status || !data) {
        return res.status(400).json({
            mensagem: "Dados inválidos!"
        });
    }

    conn.query(
        "INSERT INTO pedidos (ID_usuario, valor_total, status, data) VALUES (?, ?, ?, ?)",
        [ID_usuario, valor_total, status, data],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao adicionar pedido."
                });
            }

            res.status(201).json({
                mensagem: "Pedido adicionado com sucesso!",
                id: result.insertId
            });
        }
    );
});

// LISTAR PEDIDOS
pedidosRouter.get("/listarPedidos", (req, res) => {
    conn.query("SELECT * FROM pedidos", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao listar pedidos."
            });
        }

        res.status(200).json(result);
    });
});

// BUSCAR PEDIDO POR ID
pedidosRouter.get("/buscarPedido", (req, res) => {
    const { ID } = req.query;

    if (!ID || !Number.isInteger(Number(ID)) || Number(ID) <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido!"
        });
    }

    conn.query(
        "SELECT * FROM pedidos WHERE ID = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao buscar pedido."
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    mensagem: "Pedido não encontrado."
                });
            }

            res.status(200).json(result[0]);
        }
    );
});

// ATUALIZAR PEDIDO
pedidosRouter.put("/atualizarPedido", (req, res) => {
    const { ID, ID_usuario, valor_total, status, data } = req.body;

    if (!ID || !Number.isInteger(Number(ID)) || Number(ID) <= 0 ||
        !Number.isInteger(Number(ID_usuario)) || Number(ID_usuario) <= 0 ||
        valor_total === undefined || !Number.isInteger(Number(valor_total)) ||
        Number(valor_total) < 0 || !status || !data) {
        return res.status(400).json({
            mensagem: "Dados inválidos!"
        });
    }

    conn.query(
        "UPDATE pedidos SET ID_usuario = ?, valor_total = ?, status = ?, data = ? WHERE ID = ?",
        [ID_usuario, valor_total, status, data, ID],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao atualizar pedido."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Pedido não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Pedido atualizado com sucesso!"
            });
        }
    );
});

// DELETAR PEDIDO
pedidosRouter.delete("/deletarPedido", (req, res) => {
    const { ID } = req.body;

    if (!ID || !Number.isInteger(Number(ID)) || Number(ID) <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido!"
        });
    }

    conn.query(
        "DELETE FROM pedidos WHERE ID = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao deletar pedido."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Pedido não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Pedido deletado com sucesso!"
            });
        }
    );
});

export { pedidosRouter };