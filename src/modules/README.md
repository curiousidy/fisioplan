# Arquitectura Hexagonal - CodelyTV Style

Este proyecto sigue la arquitectura hexagonal según el estilo de CodelyTV.

## Estructura por Módulos

```
src/modules/
├── physio/                      # Módulo de Fisioterapeutas
│   ├── domain/                  # Capa de Dominio
│   │   ├── Physio.ts           # Entidad
│   │   ├── PhysioRepository.ts # Interface del repositorio (puerto)
│   │   └── ...                 # Value Objects, etc.
│   │
│   ├── application/             # Capa de Aplicación
│   │   ├── create/             # Caso de uso: Crear
│   │   ├── search/             # Caso de uso: Buscar
│   │   ├── update/             # Caso de uso: Actualizar
│   │   └── delete/             # Caso de uso: Eliminar
│   │
│   └── infrastructure/          # Capa de Infraestructura
│       ├── PrismaPhysioRepository.ts  # Implementación del repositorio
│       └── ...                 # Otros adaptadores
│
└── shared/                      # Código compartido
    ├── domain/                  # Dominio compartido
    └── infrastructure/          # Infraestructura compartida
```

## Capas

### Domain (Dominio)
- Entidades del negocio
- Interfaces de repositorios (puertos)
- Value Objects
- Lógica de negocio pura
- **No depende de nada**

### Application (Aplicación)
- Casos de uso organizados por carpetas
- Orquesta el dominio
- **Depende solo del dominio**

### Infrastructure (Infraestructura)
- Implementaciones concretas de repositorios
- Adaptadores a servicios externos
- Detalles técnicos (Prisma, HTTP, etc.)
- **Depende de aplicación y dominio**

## Flujo de Dependencias

```
Infrastructure → Application → Domain
```

El dominio es el núcleo y no conoce nada de las capas externas.
