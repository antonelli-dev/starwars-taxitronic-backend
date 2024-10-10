# Taxitronic API

**Endpoints for Star Wars test project**

## Commands:

### 1.  Crear red en docker:
```bash
docker network create local-net
```

### 2. backend:
```bash
1- Generar build: docker build -t taxitronic-backend .
2- Ejecutar contenedor:  docker run -p 3000:3000 --name backend --network local-net taxitronic-backend
```

### 3. frontend:
```bash
1- Generar build: docker build -t taxitronic-frontend .
2- Ejecutar contenedor: docker run -p 3001:3001 --network local-net taxitronic-frontend
```

### Endpoints Examples: 
```bash
Get Characters from movie with ID 4
https://starwars-taxitronic-backend.onrender.com/v1/films/4/characters
Get All Movies
https://starwars-taxitronic-backend.onrender.com/starwars/v1/films

```
