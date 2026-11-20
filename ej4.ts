// Ej4 — Polimorfismo
// Importamos Empleado y EmpleadoFijo del ej3 en vez de copiarlos:
// así no duplicamos código y cualquier cambio se hace en un solo lugar.
import { Empleado, EmpleadoFijo } from "./ej3.ts";

// Cobra por hora trabajada, sin bono por antigüedad
class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    if (horasTrabajadas < 0 || valorHora < 0) {
      throw new Error("Las horas y el valor por hora no pueden ser negativos");
    }
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

// Cobra un porcentaje de lo que vendió en el mes
class EmpleadoPorComision extends Empleado {
  private ventasDelMes: number;
  private porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    if (ventasDelMes < 0) {
      throw new Error("Las ventas no pueden ser negativas");
    }
    if (porcentajeComision < 0 || porcentajeComision > 100) {
      throw new Error("El porcentaje de comisión debe estar entre 0 y 100");
    }
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  override calcularSueldo(): number {
    return (this.ventasDelMes * this.porcentajeComision) / 100;
  }
}

// Función suelta: suma el sueldo de todos, sin importar de qué tipo sea cada uno
function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (const empleado of empleados) {
    total += empleado.calcularSueldo();
  }
  return total;
}

// ---------- Bloque de prueba ----------
// Un solo array de tipo Empleado[] con las 3 subclases mezcladas
const empleados: Empleado[] = [
  new EmpleadoFijo("Juan", 3, 100000), // 106000
  new EmpleadoPorHoras("Sofía", 5, 80, 2500), // 200000 (sin bono)
  new EmpleadoPorComision("Diego", 2, 1500000, 10), // 150000
  new EmpleadoFijo("María", 10, 200000), // 240000
];

// Polimorfismo: llamamos al mismo método sin preguntar el tipo.
// Cada objeto responde con su propia versión de calcularSueldo().
for (const empleado of empleados) {
  console.log(empleado.describir());
}

console.log("Nómina total: $" + calcularNomina(empleados)); // 696000

// Casos que fallan
try {
  new EmpleadoPorHoras("Tomás", 1, -10, 2500);
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  new EmpleadoPorComision("Carla", 1, 500000, 150);
} catch (error) {
  console.log("Error:", (error as Error).message);
}
