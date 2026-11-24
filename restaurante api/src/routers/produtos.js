
import { Router } from "express";
import { conn } from "../config.db.js";

const produtosRouter = Router();

// ADICIONAR PRODUTO
produtosRouter.post("/adicionarProduto", (req, res) => {
    const { Nome, Descricao, Preco, Categoria, Disponivel } = req.body;

    if (!Nome || !Descricao || !Categoria ||
        Preco === undefined || isNaN(Number(Preco)) ||
        ![0, 1, true, false].includes(Disponivel)) {
        return res.status(400).json({
            mensagem: "Dados inválidos!"
        });
    }

    conn.query(
        "INSERT INTO produtos (Nome, Descricao, Preco, Categoria, Disponivel) VALUES (?, ?, ?, ?, ?)",
        [Nome, Descricao, Number(Preco), Categoria, Disponivel],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao adicionar produto."
                });
            }

            res.status(201).json({
                mensagem: "Produto adicionado com sucesso!",
                id: result.insertId
            });
        }
    );
});

// LISTAR PRODUTOS
produtosRouter.get("/listarProdutos", (req, res) => {
    conn.query("SELECT * FROM produtos", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                mensagem: "Erro ao listar produtos."
            });
        }

        res.status(200).json(result);
    });
});

// BUSCAR PRODUTO POR ID
produtosRouter.get("/buscarProduto", (req, res) => {
    const { id } = req.query;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido!"
        });
    }

    conn.query(
        "SELECT * FROM produtos WHERE ID = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao buscar produto."
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });
            }

            res.status(200).json(result[0]);
        }
    );
});

// ATUALIZAR PRODUTO
produtosRouter.put("/atualizarProduto", (req, res) => {
    const { id, Nome, Descricao, Preco, Categoria, Disponivel } = req.body;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0 ||
        !Nome || !Descricao || !Categoria ||
        Preco === undefined || isNaN(Number(Preco)) ||
        ![0, 1, true, false].includes(Disponivel)) {
        return res.status(400).json({
            mensagem: "Dados inválidos!"
        });
    }

    conn.query(
        "UPDATE produtos SET Nome = ?, Descricao = ?, Preco = ?, Categoria = ?, Disponivel = ? WHERE ID = ?",
        [Nome, Descricao, Number(Preco), Categoria, Disponivel, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao atualizar produto."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Produto atualizado com sucesso!"
            });
        }
    );
});

// DELETAR PRODUTO
produtosRouter.delete("/deletarProduto", (req, res) => {
    const { id } = req.body;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido!"
        });
    }

    conn.query(
        "DELETE FROM produtos WHERE ID = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao deletar produto."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Produto deletado com sucesso!"
            });
        }
    );
});

export { produtosRouter };
