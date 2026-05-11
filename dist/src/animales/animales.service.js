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
exports.AnimalesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AnimalesService = class AnimalesService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    create(dto) {
        return this.prisma.animal.create({ data: dto });
    }
    async createMasivo(dto) {
        const animales = Array.from({ length: dto.cantidad }, () => ({
            loteId: dto.loteId,
            pesoInicialKg: dto.pesoPromedioKg,
            precioCompraCop: dto.precioPromedioCop,
            raza: dto.raza ?? null,
        }));
        return this.prisma.animal.createMany({ data: animales });
    }
    findByLote(loteId) {
        return this.prisma.animal.findMany({
            where: { loteId, deletedAt: null },
            include: {
                pesajes: { orderBy: { fecha: 'desc' }, take: 1 },
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const animal = await this.prisma.animal.findFirst({
            where: { id },
            include: {
                pesajes: { orderBy: { fecha: 'asc' } },
                gastos: { orderBy: { fecha: 'desc' } },
            },
        });
        if (!animal)
            throw new common_1.NotFoundException('Animal no encontrado');
        return animal;
    }
    findVendidosByLote(loteId) {
        return this.prisma.animal.findMany({
            where: { loteId, estado: 'VENDIDO' },
            orderBy: { fechaVenta: 'desc' },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.animal.update({ where: { id }, data: dto });
    }
    async vender(userId, id, dto) {
        const animal = await this.prisma.animal.findUnique({
            where: { id },
            include: { lote: { select: { nombre: true } } },
        });
        if (!animal)
            throw new common_1.NotFoundException('Animal no encontrado');
        const updated = await this.prisma.animal.update({
            where: { id },
            data: {
                estado: client_1.EstadoAnimal.VENDIDO,
                precioVentaCop: dto.precioVentaCop,
                pesoVentaKg: dto.pesoVentaKg,
                fechaVenta: new Date(dto.fechaVenta),
                deletedAt: new Date(),
            },
        });
        const ganancia = dto.precioVentaCop - animal.precioCompraCop;
        const signo = ganancia >= 0 ? '+' : '';
        const etiqueta = animal.arete ? `Arete #${animal.arete}` : 'Animal';
        this.notifications.enviarAUsuario(userId, {
            titulo: '🐄 Venta registrada',
            cuerpo: `${etiqueta} vendido a $${dto.precioVentaCop.toLocaleString('es-CO')} · Resultado: ${signo}$${Math.abs(ganancia).toLocaleString('es-CO')}`,
            data: { loteId: animal.loteId },
        });
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.animal.update({
            where: { id },
            data: { deletedAt: new Date(), estado: client_1.EstadoAnimal.VENDIDO },
        });
    }
};
exports.AnimalesService = AnimalesService;
exports.AnimalesService = AnimalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], AnimalesService);
//# sourceMappingURL=animales.service.js.map