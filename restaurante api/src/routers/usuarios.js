
import { Router } from "express";
import { conn } from "../config.db.js";
import bcrypt from "bcrypt";

const usuarioRouter = Router();

// CADASTRAR USUÁRIO
usuarioRouter.post("/adicionarUser", async (req, res) => {
    try {
        const { Nome, Email, Senha, Tipo } = req.body;

        if (!Nome || !Email || !Email.includes("@") ||
            !Senha || Senha.length < 6 ||
            !["cliente", "restaurante"].includes(Tipo)) {
            return res.status(400).json({
                mensagem: "Dados inválidos! Verifique os campos."
            });
        }

        const senhaHash = await bcrypt.hash(Senha, 10);

        conn.query(
            "INSERT INTO usuarios (Nome, Email, Senha, Tipo) VALUES (?, ?, ?, ?)",
            [Nome, Email, senhaHash, Tipo],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        mensagem: "Erro ao cadastrar usuário."
                    });
                }

                res.status(201).json({
                    mensagem: "Usuário cadastrado com sucesso!",
                    id: result.insertId
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
});

// LOGIN
usuarioRouter.post("/loginUser", (req, res) => {
    const { Email, Senha, Tipo } = req.body;

    if (!Email || !Email.includes("@") ||
        !Senha || !["cliente", "restaurante"].includes(Tipo)) {
        return res.status(400).json({
            mensagem: "Dados inválidos!"
        });
    }

    conn.query(
        "SELECT * FROM usuarios WHERE Email = ? AND Tipo = ?",
        [Email, Tipo],
        async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao buscar usuário."
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado!"
                });
            }

            try {
                const senhaCorreta = await bcrypt.compare(
                    Senha,
                    result[0].Senha
                );

                if (!senhaCorreta) {
                    return res.status(401).json({
                        mensagem: "Senha incorreta!"
                    });
                }

                res.status(200).json({
                    mensagem: `Usuário "${result[0].Nome}" logado com sucesso!`
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    mensagem: "Erro ao verificar senha."
                });
            }
        }
    );
});

// ATUALIZAR USUÁRIO
usuarioRouter.put("/atualizarUser", async (req, res) => {
    try {
        const { id, Nome, Email, Senha, Tipo } = req.body;

        if (!id || !Nome || !Email || !Email.includes("@") ||
            !Senha || Senha.length < 6 ||
            !["cliente", "restaurante"].includes(Tipo)) {
            return res.status(400).json({
                mensagem: "Dados inválidos!"
            });
        }

        const senhaHash = await bcrypt.hash(Senha, 10);

        conn.query(
            "UPDATE usuarios SET Nome = ?, Email = ?, Senha = ?, Tipo = ? WHERE ID = ?",
            [Nome, Email, senhaHash, Tipo, id],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        mensagem: "Erro ao atualizar usuário."
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        mensagem: "Usuário não encontrado."
                    });
                }

                res.status(200).json({
                    mensagem: "Usuário atualizado com sucesso!"
                });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
});

// DELETAR USUÁRIO
usuarioRouter.delete("/deletarUser", (req, res) => {
    const id = req.body.ID ?? req.body.id;

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido!"
        });
    }

    conn.query(
        "DELETE FROM usuarios WHERE ID = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    mensagem: "Erro ao deletar usuário."
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });
            }

            res.status(200).json({
                mensagem: "Usuário deletado com sucesso!"
            });
        }
    );
});

export { usuarioRouter };
