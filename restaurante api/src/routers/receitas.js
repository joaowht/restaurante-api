import { Router } from "express";
import axios from "axios";

const receitasRouter = Router()

// ORGANIZAR OS DADOS DA RECEITA
function organizarReceitas(meals) {
    return meals.map((receita) => {
        const ingredientes = []
        for (let i = 1; i <= 20; i++) {
            const ingrediente = receita[`strIngredient${i}`]
            const quantidade = receita[`strMeasure${i}`]

            if (ingrediente && ingrediente.trim() !== "") {
                ingredientes.push({
                    ingrediente: ingrediente,
                    quantidade: quantidade
                })
            }
        }

        return {
            nome: receita.strMeal,
            categoria: receita.strCategory,
            ingredientes: ingredientes
        }
    })
}

// BUSCAR RECEITA PELO NOME
receitasRouter.post("/buscarReceita", async (req, res) => {
    const { nome } = req.body
    if (!nome || nome.trim() === "") {
        return res.status(400).json("Informe o nome da receita!")
    }
    try {
        const resposta = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/search.php",
            {
                params: {
                    s: nome.trim()
                }
            }
        )

        if (!resposta.data.meals) {
            return res.json("Nenhuma receita encontrada!")
        } else {
            res.json(organizarReceitas(resposta.data.meals))
        }

    } catch (err) {
        console.log("Erro ao buscar receita: ", err.message)
        res.status(500).json("Erro ao consultar a API de receitas!")
    }
})

// BUSCAR RECEITA ALEATÓRIA
receitasRouter.get("/receitaAleatoria", async (req, res) => {
    try {
        const resposta = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        )
        
        res.json(organizarReceitas(resposta.data.meals))

    } catch (err) {
        console.log("Erro buscar receita aleatória: ", err.message)
        res.status(500).json("Erro ao consultar a API de receitas!")
    }
})

export { receitasRouter }