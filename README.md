```
Para iniciar se debe restaurar la base datos .
(los usuarios se pueden crear en /signup)

en el directorio donde esta la carpeta /dump ingresar :
mongorestore --db tiendaNext dump/tiendaNext

iniciar mongodb con el comando : mongod

luego  desde la carpeta /tiendaReact ingresar :
node api/index

finalmente , desde la carpeta /frontend/tienda :
npm start

abrir el navegador en  localhost:3000.
