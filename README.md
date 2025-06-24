# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d fisioPlanDB
```
2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno (la url debe ser similar a la siguiente -> "postgresql://pepe_user:pepe_pass@localhost:5432/postgres?schema=public" y coincidir con las variables que se indican en el dockercompose en la seccion environment)
4. Ejecutar el seed para [crear la base de datos local](localhost:3000/api/seed)

# Prisma comands

```
** Sólo si se va a generar un nuevo schema **
npx prisma init
npx prisma migrate dev
npx prisma generate

** Si se quiere utilizar el que ya está subido **
npx prisma migrate deploy
```

# Prod

# Stage
