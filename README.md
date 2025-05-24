# Projekt futtatása

A projekt futtatásához szükséges a docker illetve a docker compose megléte.

Ez a projekt Docker Compose használatával indítható, fejlesztői (dev) és éles (prod) módban is.

## Production mód

Buildelés `docker-compose --env-file .env.prod --profile prod build` paranccsal.

Ezután a projektet a `docker-compose --env-file .env.prod --profile prod up` parancs segítségével indíthatod el a gyökérkönyvtárból.
A production módban a localhost-on elérhető az alkalmazás.

### Fejlesztői mód (dev)

Fejlesztői módban a `docker-compose --env-file .env.dev up` parancsot használd.
Ebben az esetben a backend és a frontend külön kerül futtatásra, tehát kézzel kell elindítanod őket:

#### Backend indítása

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

#### Frontend indítása

```bash
cd frontend
yarn install
yarn dev
```

A projekt elindítása után a frontend elérhető lesz a `http://localhost:3000` címen (dev módban), míg az API kiszolgáló a `http://localhost:8080` címen.
