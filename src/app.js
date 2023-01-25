const express = require("express");

const app = express();
app.use(express.json());
//ROUTE PARAMS
//QUERY PARAMS
//BODY PARAMS
//HEADERS

app.post("/exemplo/:id", (request, response) => {
  console.log(request.body);
  console.log(request.params);
  console.log(request.query);
  console.log(request.headers);

  const idExemplo = request.params.id;
  console.log(idExemplo);
  return response.status(201).json({
    nome: "exemplo",
  });
});

// app.get("/users", (request, response) => {
//   return response.send("Retornou os dados");
// });

app.listen(3000, () => {
  console.log("Server is running!");
});
