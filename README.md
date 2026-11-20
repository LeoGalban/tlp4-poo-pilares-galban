# TLP4 — Pilares de POO en TypeScript

Práctica de Taller de Lenguajes de Programación IV: los cuatro pilares de la
Programación Orientada a Objetos y getters/setters, un ejercicio por archivo.

## Requisitos

- **Node.js 22.18+ o 23.6+** (los `.ts` se ejecutan directo con Node, sin compilar,
  gracias al *type stripping* nativo).
- TypeScript se instala como dependencia de desarrollo y solo se usa para chequear tipos.

## Cómo correrlo

```bash
npm install        # instala typescript y @types/node
npm run check      # chequea tipos (tsc --noEmit)

npm run ej1        # Abstracción — Producto
npm run ej2        # Encapsulamiento — CuentaBancaria
npm run ej3        # Herencia — Empleado y EmpleadoFijo
npm run ej4        # Polimorfismo — distintos tipos de Empleado
npm run ej5        # Getters y setters — Persona
```

Cada archivo termina con un bloque de prueba que crea objetos, muestra
resultados y fuerza errores dentro de `try/catch` para mostrar las validaciones.

## Configuración

- `"strict": true`, sin `any`.
- `"erasableSyntaxOnly": true`: Node solo puede ejecutar TypeScript cuyos tipos
  se puedan borrar, así que no se usan parameter properties
  (`constructor(private x: number)`), `enum` ni `namespace`. Los atributos se
  declaran como campos y se asignan en el constructor.
- `"noEmit": true`: no se generan archivos `.js`.

## Los pilares en cada ejercicio

### Ej1 — Abstracción (`ej1.ts`)

`Producto` modela solo lo necesario para vender: nombre, precio, categoría y
stock. Datos reales como proveedor, código de barras o vencimiento quedan
afuera a propósito. Los métodos (`describir`, `hayStock`, `venderUnidades`,
`aplicarDescuento`) esconden los detalles de cada operación.

**Decisión en `venderUnidades`: lanza `Error` en vez de mostrar un mensaje.**
Con un `console.log`, el código que llama no se entera de que la venta falló
y podría seguir (cobrar, facturar) como si nada. Con un `Error` está obligado
a manejar el problema con `try/catch`, y la clase no decide por su cuenta
cómo mostrarle el error al usuario.

### Ej2 — Encapsulamiento (`ej2.ts`)

`CuentaBancaria` tiene `saldo` e `historial` como `private`: solo se modifican
con `depositar` y `retirar`, que validan cada operación. `titular` es `readonly`.
`obtenerHistorial()` devuelve una copia, así nadie puede alterar el historial
interno desde afuera.

### Ej3 — Herencia (`ej3.ts`)

`EmpleadoFijo extends Empleado`: reutiliza `nombre`, `antiguedad` (protected)
y `describir()` del padre, y solo redefine `calcularSueldo()`
(sueldo base + 2% por año de antigüedad).

### Ej4 — Polimorfismo (`ej4.ts`)

Importa las clases del ej3 y agrega `EmpleadoPorHoras` y `EmpleadoPorComision`.
Un `Empleado[]` mezcla las tres subclases y se recorre llamando a
`calcularSueldo()` sin preguntar el tipo: cada objeto responde con su propia
versión. `calcularNomina()` suma los sueldos de cualquier lista de empleados.

### Ej5 — Getters y setters (`ej5.ts`)

`Persona` expone `edad` y `email` con `get`/`set`: se usan como atributos, pero
el `set` valida (edad entre 0 y 120, email con `@`). `esMayorDeEdad` y
`datosPublicos` son getters calculados, no guardados. `datosPublicos` no
muestra el dni ni el email.
