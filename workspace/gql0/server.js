const { graphql, buildSchema } = require('graphql');
 
// Esta sección construye un schema en la sintaxis GraphQL
//En este ejemplo estamos diciendo que “La query saludo, retorna un String”
const schema = buildSchema(`
 type Query {
   saludo: String
 }
`);
 
// El objeto rootValue provee una funciòn “resolver” para cada endpoint de la API
const rootValue = {
 saludo: () => {
   return 'Bueeenas, cómo andan..';
 },
};
 
// Ejecuta la query '{ hello }' e imprime el response. La llamada a la misma está definida por el resolver hello()
 
graphql({
 schema,
 source: '{ saludo }',
 rootValue
}).then((response) => {
 console.log(response);
});
