import express from "express";
import "dotenv/config";
import { usuarioRouter } from "./routers/usuarios.js";
import { produtosRouter } from "./routers/produtos.js";
import { pedidosRouter } from "./routers/pedidos.js";
import { receitasRouter } from "./routers/receitas.js";

const app = express();

app.use(express.json());
app.use(usuarioRouter);
app.use(produtosRouter);
app.use(pedidosRouter);
app.use(receitasRouter);

app.get("/", (req, res) => {
    res.json("Olá Mundo!");
});

app.listen(process.env.port || 3333, () => {
    console.log(`O servidor está rodando na porta ${process.env.port || 3333}`);
});