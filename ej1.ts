// Ej1 — Abstracción
// Un Producto real tiene muchísimos datos: proveedor, código de barras, peso,
// fecha de vencimiento, fotos, garantía, ubicación en el depósito, etc.
// A propósito los dejamos afuera: para vender y mostrar productos solo
// necesitamos nombre, precio, categoría y stock. Eso es abstraer: quedarnos
// con lo esencial para el problema que resolvemos.

class Producto {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    // Validamos que no se pueda crear un producto con datos inválidos
    if (precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    if (stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  // Ej: "Teclado (electrónica): $10000 — 5 unidades"
  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  // true si se puede vender esa cantidad sin que el stock quede negativo
  hayStock(cantidad: number): boolean {
    return cantidad > 0 && cantidad <= this.stock;
  }

  // DECISIÓN: lanzamos Error en vez de solo mostrar un mensaje.
  // Si solo hiciéramos console.log, el código que llama no se entera de que
  // la venta falló y podría seguir (cobrar, emitir factura) como si nada.
  // Con un Error, quien llama está obligado a manejar el problema (try/catch),
  // y la clase no decide por su cuenta cómo mostrarle el error al usuario.
  venderUnidades(cantidad: number): void {
    if (cantidad <= 0) {
      throw new Error("La cantidad a vender debe ser mayor a 0");
    }
    if (!this.hayStock(cantidad)) {
      throw new Error(
        `Stock insuficiente de ${this.nombre}: pediste ${cantidad}, hay ${this.stock}`
      );
    }
    this.stock -= cantidad;
  }

  // Devuelve el precio con descuento SIN modificar this.precio
  aplicarDescuento(porcentaje: number): number {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error("El porcentaje debe estar entre 0 y 100");
    }
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

// ---------- Bloque de prueba ----------
const teclado = new Producto("Teclado", 10000, "electrónica", 5);
const yerba = new Producto("Yerba", 3500, "almacén", 20);

console.log(teclado.describir());
console.log(yerba.describir());

console.log("¿Hay stock para 3 teclados?", teclado.hayStock(3));
console.log("¿Hay stock para 10 teclados?", teclado.hayStock(10));

teclado.venderUnidades(3);
console.log("Después de vender 3:", teclado.describir());

// Descuento: el precio original no cambia
console.log("Precio con 20% de descuento:", teclado.aplicarDescuento(20));
console.log("Precio original sigue igual:", teclado.precio);

// Casos que fallan
try {
  teclado.venderUnidades(10);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  teclado.venderUnidades(0);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  teclado.aplicarDescuento(150);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  new Producto("Mouse", -500, "electrónica", 2);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

console.log("Estado final:", teclado.describir());
