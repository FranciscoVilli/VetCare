# VetCare — Contexto del Proyecto

## ¿Qué es esto?

Interfaz web para gestionar una base de datos distribuida de la clínica veterinaria **VetCare**, desarrollada para la materia de **Bases de Datos Distribuidas**.

El esquema real (fragmentación, replicación, asignación) ya está implementado en **SQL Server Management Studio** dentro de una VM con VirtualBox. Esta app es la capa visual que se conectará a esa BD.

---

## Arquitectura distribuida

| Nodo | Máquina | Sede |
|------|---------|------|
| Nodo 1 | VM Francisco | Quito |
| Nodo 2 | VM Compañero | Cuenca |

Cada VM corre su propia instancia de SQL Server. La app Next.js se clona en **cada VM** y se conecta al SQL Server local (`localhost:1433`). No hay conexión de red entre VMs.

```
VM Quito                        VM Cuenca
──────────────────              ──────────────────
Next.js (npm run dev)           Next.js (npm run dev)
       ↓                               ↓
localhost:1433                  localhost:1433
       ↓                               ↓
SQL Server Quito                SQL Server Cuenca
(datos del Nodo 1)              (datos del Nodo 2)
```

---

## Estado actual

- [x] Interfaz completa con todos los módulos
- [x] Selector de nodo (Quito / Cuenca) en el header
- [x] CRUD completo en cada módulo (crear, editar, eliminar)
- [x] Módulo de Exámenes bloqueado cuando se selecciona Cuenca
- [x] Dashboard con estadísticas del nodo activo
- [x] Fondo personalizado (`public/vetcare.png`)
- [x] Página de login (`/login`) — solo visual, sin validación
- [x] Botón "Cerrar sesión" en sidebar redirige a `/login`
- [ ] **Pendiente: conectar a SQL Server real** (actualmente usa datos mock)

---

## Módulos del sistema

| Módulo | Ruta | Nodos | Notas |
|--------|------|-------|-------|
| Sedes | `/sedes` | Quito + Cuenca | Replicado en ambos nodos |
| Mascotas | `/mascotas` | Quito + Cuenca | Filtradas por sede |
| Veterinarios | `/veterinarios` | Quito + Cuenca | |
| Dueños | `/duenos` | Quito + Cuenca | |
| Consultas | `/consultas` | Quito + Cuenca | |
| Exámenes | `/examenes` | **Solo Quito** | Bloqueado en Cuenca |

---

## Estructura del proyecto

```
vetcare/
├── app/                        # Páginas (Next.js App Router)
│   ├── page.tsx                # Dashboard con estadísticas
│   ├── login/page.tsx          # Página de login (solo visual)
│   ├── sedes/page.tsx
│   ├── mascotas/page.tsx
│   ├── veterinarios/page.tsx
│   ├── duenos/page.tsx
│   ├── consultas/page.tsx
│   └── examenes/page.tsx
├── components/
│   ├── AppShell.tsx            # Layout principal (sidebar + header + fondo)
│   ├── ConditionalShell.tsx    # Omite AppShell en rutas sin sidebar (ej. /login)
│   ├── Header.tsx              # Header con selector de nodo
│   ├── Sidebar.tsx             # Navegación lateral + botón cerrar sesión
│   ├── Modal.tsx               # Modal reutilizable para formularios
│   └── FragBadge.tsx           # Badge de tipo de fragmentación (interno)
├── lib/
│   ├── context.tsx             # Estado global del nodo seleccionado
│   └── mockData.ts             # ⚠️ Datos de prueba — reemplazar con BD real
└── public/
    └── vetcare.png             # Imagen de fondo
```

---

## Cómo correr el proyecto

```bash
# 1. Clonar
git clone https://github.com/FranciscoVilli/VetCare.git
cd VetCare

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
# → Abre http://localhost:3000
```

**Requisitos:** Node.js 18+ instalado.

---

## Pendiente: Conectar SQL Server

### Paso 1 — Instalar el driver

```bash
npm install mssql
npm install --save-dev @types/mssql
```

### Paso 2 — Crear `lib/db.ts`

```ts
import sql from 'mssql';

const config: sql.config = {
  server: 'localhost',
  port: 1433,
  database: 'VetCare',        // ← nombre exacto de la BD en SSMS
  user: 'sa',                 // ← usuario SQL
  password: 'TU_PASSWORD',    // ← contraseña
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getDb() {
  if (!pool) pool = await sql.connect(config);
  return pool;
}
```

### Paso 3 — Crear API Routes por módulo

Ejemplo para Mascotas (`app/api/mascotas/route.ts`):

```ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// GET /api/mascotas?sede=S001
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sede = searchParams.get('sede') ?? 'S001';
  const db = await getDb();
  const result = await db
    .request()
    .input('sede', sede)
    .query('SELECT * FROM Mascotas WHERE SedeCodigo = @sede');
  return NextResponse.json(result.recordset);
}

// POST /api/mascotas  → crear
// PUT /api/mascotas   → editar
// DELETE /api/mascotas?codigo=M001 → eliminar
```

### Paso 4 — Actualizar las páginas

En cada `page.tsx`, cambiar el `useState` con datos mock por un `useEffect` que llame a la API:

```ts
// ANTES (mock)
const [items, setItems] = useState(mockMascotas[node]);

// DESPUÉS (SQL Server)
const [items, setItems] = useState([]);
useEffect(() => {
  const sede = node === 'quito' ? 'S001' : 'S002';
  fetch(`/api/mascotas?sede=${sede}`)
    .then(r => r.json())
    .then(setItems);
}, [node]);
```

### Paso 5 — Verificar en SSMS antes de conectar

Confirmar que SQL Server tiene:
- TCP/IP habilitado (SQL Server Configuration Manager)
- Autenticación mixta habilitada
- Puerto 1433 abierto

---

## Próximos pasos (orden sugerido)

1. [ ] Confirmar nombres exactos de tablas en SSMS
2. [ ] Crear `lib/db.ts` con credenciales de cada VM
3. [ ] Crear API routes para cada módulo (empezar por Mascotas)
4. [ ] Reemplazar mock data en páginas una por una
5. [ ] Probar CRUD contra BD real
6. [ ] Ajustar nombres de columnas si difieren del mock

---

## Desarrollado con

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (iconos)
- **Materia:** Bases de Datos Distribuidas
