// Ej2 — Encapsulamiento
// Los datos sensibles (saldo e historial) son private: solo se pueden cambiar
// a través de los métodos de la clase, que validan cada operación.

// Cada movimiento es un objeto con su tipo y su monto
type Movimiento = {
  tipo: "apertura" | "deposito" | "retiro";
  monto: number;
};

class CuentaBancaria {
  readonly titular: string; // se asigna una sola vez, en el constructor
  private saldo: number;
  private historial: Movimiento[];

  constructor(titular: string, montoInicial: number) {
    if (montoInicial < 0) {
      throw new Error("El monto inicial no puede ser negativo");
    }
    this.titular = titular;
    this.saldo = montoInicial;
    this.historial = [{ tipo: "apertura", monto: montoInicial }];
  }

  depositar(monto: number): void {
    if (monto <= 0) {
      throw new Error("El monto a depositar debe ser mayor a 0");
    }
    this.saldo += monto;
    this.historial.push({ tipo: "deposito", monto: monto });
  }

  retirar(monto: number): void {
    if (monto <= 0) {
      throw new Error("El monto a retirar debe ser mayor a 0");
    }
    if (monto > this.saldo) {
      throw new Error(`Saldo insuficiente: querés retirar $${monto} y hay $${this.saldo}`);
    }
    this.saldo -= monto;
    this.historial.push({ tipo: "retiro", monto: monto });
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  // Devuelve una COPIA: un array nuevo con objetos nuevos ({ ...m }).
  // Así, si quien llama modifica lo que recibe, el historial interno no cambia.
  obtenerHistorial(): Movimiento[] {
    return this.historial.map((m) => ({ ...m }));
  }
}

// ---------- Bloque de prueba ----------
const cuenta = new CuentaBancaria("Leonel", 1000);
console.log("Titular:", cuenta.titular);
console.log("Saldo inicial:", cuenta.consultarSaldo());

cuenta.depositar(500);
cuenta.retirar(300);
console.log("Saldo después de depositar 500 y retirar 300:", cuenta.consultarSaldo());
console.log("Historial:", cuenta.obtenerHistorial());

// Casos que fallan
try {
  cuenta.depositar(-100);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  cuenta.retirar(0);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  cuenta.retirar(5000);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

// Demostración de la copia: modificamos lo que nos devolvió obtenerHistorial()
const copia = cuenta.obtenerHistorial();
copia.push({ tipo: "deposito", monto: 999999 }); // agregamos un movimiento falso
copia[0].monto = 0; // y cambiamos uno existente
console.log("Copia modificada:", copia);
console.log("Historial interno (sin cambios):", cuenta.obtenerHistorial());
console.log("Saldo (sin cambios):", cuenta.consultarSaldo());

// Esto NO compila (lo dejamos comentado para mostrarlo):
// cuenta.saldo = 1000000;   // error: 'saldo' es private
// cuenta.titular = "Otro";  // error: 'titular' es readonly
