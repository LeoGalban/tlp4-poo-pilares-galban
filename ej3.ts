// Ej3 — Herencia
// Empleado es la clase base (padre). EmpleadoFijo hereda de ella: reutiliza
// nombre, antiguedad y describir(), y solo cambia cómo se calcula el sueldo.

export class Empleado {
  // protected: no se accede desde afuera, pero sí desde las subclases
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    if (antiguedad < 0) {
      throw new Error("La antigüedad no puede ser negativa");
    }
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  // Un empleado "genérico" no sabe cómo cobra: las subclases lo definen
  calcularSueldo(): number {
    return 0;
  }

  // No se sobrescribe en las subclases. Llama a this.calcularSueldo(), que
  // ejecuta la versión de la subclase según el objeto real.
  describir(): string {
    return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
  }
}

export class EmpleadoFijo extends Empleado {
  private sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad); // el padre se encarga de nombre y antiguedad
    if (sueldoBase < 0) {
      throw new Error("El sueldo base no puede ser negativo");
    }
    this.sueldoBase = sueldoBase;
  }

  // Sobrescribe el método del padre: base + 2% de la base por año
  override calcularSueldo(): number {
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

// ---------- Bloque de prueba ----------
// import.meta.main es true solo si ejecutamos este archivo directamente
// (npm run ej3). Cuando ej4 lo importa, estas pruebas no se ejecutan.
if (import.meta.main) {
  const generico = new Empleado("Ana", 1);
  const juan = new EmpleadoFijo("Juan", 3, 100000);
  const maria = new EmpleadoFijo("María", 10, 200000);

  console.log(generico.describir()); // sueldo 0: usa el método del padre
  console.log(juan.describir()); // 100000 + 3 * 2000 = 106000
  console.log(maria.describir()); // 200000 + 10 * 4000 = 240000

  console.log("¿Juan es un Empleado?", juan instanceof Empleado);

  // Casos que fallan
  try {
    new EmpleadoFijo("Pedro", -2, 150000);
  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  try {
    new EmpleadoFijo("Lucía", 2, -1000);
  } catch (error) {
    console.log("Error:", (error as Error).message);
  }

  // Esto NO compila: nombre es protected
  // console.log(juan.nombre);
}
