"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentabilidadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pesajes_service_1 = require("../pesajes/pesajes.service");
const gastos_service_1 = require("../gastos/gastos.service");
let RentabilidadService = class RentabilidadService {
    prisma;
    pesajes;
    gastos;
    constructor(prisma, pesajes, gastos) {
        this.prisma = prisma;
        this.pesajes = pesajes;
        this.gastos = gastos;
    }
    async calcularLote(loteId, userId) {
        const lote = await this.prisma.lote.findFirst({
            where: { id: loteId, userId },
            include: { animales: { where: { deletedAt: null } } },
        });
        if (!lote)
            throw new Error('Lote no encontrado');
        const precioMercado = await this.prisma.precioMercado.findFirst({
            where: { userId },
            orderBy: { fecha: 'desc' },
        });
        const precioKilo = precioMercado?.precioKiloCop ?? 0;
        const resumenGastos = await this.gastos.resumenByLote(loteId);
        const gastosLote = resumenGastos.lista
            .filter((g) => !g.animalId)
            .reduce((s, g) => s + g.montoCop, 0);
        const gastosLotePorAnimal = lote.animales.length > 0 ? gastosLote / lote.animales.length : 0;
        const animalesCalculo = [];
        for (const animal of lote.animales) {
            const gdpData = await this.pesajes.calcularGdp(animal.id);
            const gastosDirectos = resumenGastos.lista
                .filter((g) => g.animalId === animal.id)
                .reduce((s, g) => s + g.montoCop, 0);
            const costoTotal = animal.precioCompraCop + gastosDirectos + gastosLotePorAnimal;
            const valorHoy = gdpData.pesoActualKg * precioKilo;
            const utilidadHoy = valorHoy - costoTotal;
            const valor30d = gdpData.pesoProyectado30d * precioKilo;
            const utilidad30d = valor30d - costoTotal;
            animalesCalculo.push({
                animalId: animal.id,
                arete: animal.arete,
                raza: animal.raza,
                pesoActualKg: gdpData.pesoActualKg,
                gdpKgDia: gdpData.gdpKgDia,
                pesoProyectado30d: gdpData.pesoProyectado30d,
                precioCompraCop: animal.precioCompraCop,
                gastosDirectosCop: gastosDirectos + gastosLotePorAnimal,
                costoTotalCop: costoTotal,
                valorVentaHoyCop: valorHoy,
                utilidadHoyCop: utilidadHoy,
                margenHoyPct: costoTotal > 0 ? Math.round((utilidadHoy / costoTotal) * 100 * 10) / 10 : 0,
                valorVenta30dCop: valor30d,
                utilidad30dCop: utilidad30d,
                margen30dPct: costoTotal > 0 ? Math.round((utilidad30d / costoTotal) * 100 * 10) / 10 : 0,
            });
        }
        const totalValorHoy = animalesCalculo.reduce((s, a) => s + a.valorVentaHoyCop, 0);
        const totalCosto = animalesCalculo.reduce((s, a) => s + a.costoTotalCop, 0);
        const utilidadTotal = totalValorHoy - totalCosto;
        const gdpPromedio = animalesCalculo.length > 0
            ? animalesCalculo.reduce((s, a) => s + a.gdpKgDia, 0) / animalesCalculo.length
            : 0;
        return {
            loteId,
            nombre: lote.nombre,
            totalAnimales: lote.animales.length,
            precioKiloMercado: precioKilo,
            costoTotalLoteCop: totalCosto,
            gastosLoteCop: resumenGastos.total,
            valorVentaTotalHoyCop: totalValorHoy,
            utilidadHoyCop: utilidadTotal,
            margenHoyPct: totalCosto > 0 ? Math.round((utilidadTotal / totalCosto) * 100 * 10) / 10 : 0,
            gdpPromedioKgDia: Math.round(gdpPromedio * 1000) / 1000,
            animales: animalesCalculo.sort((a, b) => b.utilidadHoyCop - a.utilidadHoyCop),
        };
    }
};
exports.RentabilidadService = RentabilidadService;
exports.RentabilidadService = RentabilidadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pesajes_service_1.PesajesService,
        gastos_service_1.GastosService])
], RentabilidadService);
//# sourceMappingURL=rentabilidad.service.js.map