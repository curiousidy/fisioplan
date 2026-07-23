@/Users/idaira/.claude/RTK.md

# FisioPlan — Project Conventions

## Stack

- **Framework**: Next.js 15 App Router
- **Styles**: Tailwind CSS v4 — pure, sin shadcn/ui, sin librerías de componentes
- **Forms**: react-hook-form + Zod v4
- **Icons**: react-icons — CENTRALIZADO en `src/lib/icons.ts`. Ningún componente importa directo de react-icons
- **Toasts**: sonner
- **Calendario**: react-big-calendar + moment
- **ORM**: Prisma + PostgreSQL
- **Testing**: Vitest

## Arquitectura

- **Patrón**: Hexagonal/Clean — Domain → Application → Infrastructure
- **Rendering**: Server Components por defecto. Client Components SOLO donde hay interactividad explícita (`"use client"`)
- **Mutations**: Server Actions únicamente. NUNCA fetch HTTP a las propias API routes desde Server Components (self-referential fetch)
- **Data fetching en Server Components**: llamar directamente a los repositorios de Prisma, no a `/api/*`
- **Estado global**: no existe. Sin Redux, Zustand, ni Context para estado de app

## Módulos

```
src/modules/{domain}/
  domain/          # Entidades e interfaces de repositorio
  application/     # Use cases
  infrastructure/  # Repositorios Prisma + Controllers + DTOs
```

## UI

- Mobile-first
- Sin autenticación (MVP)
- Filtros y búsqueda: client-side en componentes Manager (`"use client"`)
- Patrón: Server Component (fetch data) → Manager (client boundary, estado local) → hijos presentacionales

## Responsive — Reglas

- **UN solo layout que se adapta** — nunca dos versiones separadas con `md:hidden` / `hidden md:block`. Eso es diseño adaptativo, no responsive.
- **Tablas de 4+ columnas son incompatibles con mobile** — reemplazar por lista de cards con `flex items-center justify-between`. El badge/estado va a la derecha con `shrink-0`.
- **Textos largos en grillas estrechas** — usar etiquetas cortas ("Fisios" en lugar de "Fisioterapeutas") + `truncate w-full` como protección adicional.
- **Layouts secundarios/colapsables**: en contexto compacto usar barra de stats inline, no cards individuales con `p-6` y bordes propios.

## Convenciones

- Conventional commits — NUNCA agregar Co-Authored-By ni atribución de AI
- No buildear después de cambios (`next build` solo en CI)
- Usar `bat`, `rg`, `fd`, `sd`, `eza` — nunca `cat`, `grep`, `find`, `sed`, `ls`
- Status válidos de cita: `agendada`, `realizada`, `cancelada` (normalizar legacy `created`/`pending` en el mapper)

## Skills

Skill registry: `.atl/skill-registry.md`
Skills disponibles: `~/.claude/skills/`
