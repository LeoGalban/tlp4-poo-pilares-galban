// Ej5 — Getters y setters
// Desde afuera se usan como si fueran atributos (persona.edad = 30),
// pero por dentro ejecutan código: el set valida y el get puede calcular.

class Persona {
  private readonly dni: string; // privado y fijo desde la creación
  nombre: string; // público: se lee y se cambia libremente

  // Los datos reales se guardan con "_" para que el nombre no choque
  // con el getter/setter. Arrancan con un valor inicial que el constructor
  // reemplaza enseguida pasando por los setters (y sus validaciones).
  private _edad: number = 0;
  private _email: string = "";

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    this.edad = edad; // usa el set edad → valida
    this.email = email; // usa el set email → valida
  }

  get edad(): number {
    return this._edad;
  }

  set edad(valor: number) {
    if (valor < 0 || valor > 120) {
      throw new Error(`Edad inválida: ${valor} (debe estar entre 0 y 120)`);
    }
    this._edad = valor;
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    if (!valor.includes("@")) {
      throw new Error(`Email inválido: "${valor}" (falta el @)`);
    }
    this._email = valor;
  }

  // Calculado en el momento, no se guarda: si cambia la edad, cambia solo
  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  // Solo datos que se pueden mostrar: sin dni ni email
  get datosPublicos(): string {
    const mayor = this.esMayorDeEdad ? "sí" : "no";
    return `${this.nombre} — mayor de edad: ${mayor}`;
  }
}

// ---------- Bloque de prueba ----------
const persona = new Persona("40123456", "Leonel", 17, "leonel@mail.com");

console.log("Nombre:", persona.nombre);
console.log("Edad:", persona.edad); // usa el get, sin paréntesis
console.log("Email:", persona.email);
console.log("¿Es mayor de edad?", persona.esMayorDeEdad);
console.log("Datos públicos:", persona.datosPublicos);

// Cambiamos la edad con el set: esMayorDeEdad se recalcula solo
persona.edad = 18;
console.log("Después de cumplir 18:", persona.datosPublicos);

persona.email = "leonel.nuevo@mail.com";
console.log("Email nuevo:", persona.email);

// Casos que fallan (los set lanzan Error y el valor anterior se mantiene)
try {
  persona.edad = -5;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.edad = 150;
} catch (error) {
  console.log("Error:", (error as Error).message);
}

try {
  persona.email = "correo-sin-arroba";
} catch (error) {
  console.log("Error:", (error as Error).message);
}

console.log("La edad y el email no cambiaron:", persona.edad, persona.email);

// También valida al crear: el constructor usa los setters
try {
  new Persona("30111222", "Ana", 200, "ana@mail.com");
} catch (error) {
  console.log("Error al crear:", (error as Error).message);
}

// Esto NO compila (lo dejamos comentado para mostrarlo):
// console.log(persona.dni);         // error: 'dni' es private
// persona.esMayorDeEdad = true;     // error: solo tiene get, es de solo lectura
