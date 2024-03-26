import express from "express";
import cors from "cors";
import db from "../src/database/db.js"
import routes from "../src/routes/routes.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(routes);

// Esta é a função que a Vercel espera que você exporte
export default async function handler(req, res) {
  try {
    // Antes de lidar com a solicitação, aguarde a conexão com o banco de dados
    await db.connect();

    // Roteie a solicitação para as rotas definidas na sua aplicação
    app(req, res);
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// // O código abaixo inicia o servidor Express, mas isso é apenas um exemplo. A Vercel ignora essa parte e usa a função exportada acima.
// db.then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// }).catch((error) => {
//   console.log("Failed to connect to the database:", error);
//   process.exit(1); // Encerra o processo, indicando um erro
// });