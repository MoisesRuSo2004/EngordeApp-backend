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
exports.PesajesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let PesajesService = class PesajesService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async create(userId, dto) {
        const animal = await this.prisma.animal.findUnique({
            where: { id: dto.animalId },
            include: { lote: { select: { nombre: true } } },
        });
        if (!animal)
            throw new common_1.NotFoundException('Animal no encontrado');
        const pesaje = await this.prisma.pesaje.create({
            data: { ...dto, fecha: new Date(dto.fecha) },
        });
        const etiqueta = animal.arete ? `Arete #${animal.arete}` : 'Animal';
        this.notifications.enviarAUsuario(userId, {
            titulo: '✅ Pesaje registrado',
            cuerpo: `${etiqueta} — ${dto.pesoKg} kg · Lote ${animal.lote.nombre}`,
            data: { animalId: dto.animalId, loteId: dto.loteId },
        });
        return pesaje;
    }
    findByAnimal(animalId) {
        return this.prisma.pesaje.findMany({
            where: { animalId },
            orderBy: { fecha: 'asc' },
        });
    }
    findByLote(loteId) {
        return this.prisma.pesaje.findMany({
            where: { loteId },
            orderBy: { fecha: 'desc' },
        });
    }
    async calcularGdp(animalId) {
        const animal = await this.prisma.animal.findUnique({ where: { id: animalId } });
        if (!animal)
            throw new common_1.NotFoundException('Animal no encontrado');
        const pesajes = await this.prisma.pesaje.findMany({
            where: { animalId },
            orderBy: { fecha: 'asc' },
        });
        const puntos = [
            { fecha: animal.createdAt, pesoKg: animal.pesoInicialKg },
            ...pesajes.map((p) => ({ fecha: p.fecha, pesoKg: p.pesoKg })),
        ];
        const pesoActual = puntos[puntos.length - 1].pesoKg;
        const hoy = new Date();
        const ultimaFecha = puntos[puntos.length - 1].fecha;
        const diasDesdeUltimoPesaje = Math.floor((hoy.getTime() - new Date(ultimaFecha).getTime()) / (1000 * 60 * 60 * 24));
        let gdpKgDia = 0;
        if (puntos.length >= 2) {
            const ultimos = puntos.slice(-Math.min(4, puntos.length));
            const intervalos = [];
            for (let i = 1; i < ultimos.length; i++) {
                const dias = Math.max(1, (new Date(ultimos[i].fecha).getTime() - new Date(ultimos[i - 1].fecha).getTime()) /
                    (1000 * 60 * 60 * 24));
                intervalos.push((ultimos[i].pesoKg - ultimos[i - 1].pesoKg) / dias);
            }
            gdpKgDia = intervalos.reduce((a, b) => a + b, 0) / intervalos.length;
        }
        return {
            gdpKgDia: Math.round(gdpKgDia * 1000) / 1000,
            pesoActualKg: pesoActual,
            pesoProyectado7d: Math.round((pesoActual + gdpKgDia * 7) * 10) / 10,
            pesoProyectado15d: Math.round((pesoActual + gdpKgDia * 15) * 10) / 10,
            pesoProyectado30d: Math.round((pesoActual + gdpKgDia * 30) * 10) / 10,
            pesoProyectado60d: Math.round((pesoActual + gdpKgDia * 60) * 10) / 10,
            diasDesdeUltimoPesaje,
        };
    }
    async delete(id) {
        const p = await this.prisma.pesaje.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Pesaje no encontrado');
        return this.prisma.pesaje.delete({ where: { id } });
    }
};
exports.PesajesService = PesajesService;
exports.PesajesService = PesajesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], PesajesService);
//# sourceMappingURL=pesajes.service.js.map