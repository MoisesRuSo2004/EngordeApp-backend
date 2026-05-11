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
exports.LotesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let LotesService = class LotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, dto) {
        return this.prisma.lote.create({
            data: {
                ...dto,
                userId,
                fechaCompra: new Date(dto.fechaCompra),
            },
            include: { finca: true, proveedor: true },
        });
    }
    async findAll(userId, estado) {
        const lotes = await this.prisma.lote.findMany({
            where: { userId, ...(estado ? { estado } : {}) },
            include: {
                finca: true,
                proveedor: true,
                _count: { select: { animales: { where: { deletedAt: null } } } },
                animales: {
                    where: { deletedAt: null },
                    select: { precioCompraCop: true, estado: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return lotes.map((lote) => {
            const { animales, ...rest } = lote;
            const totalInvertidoCop = animales.reduce((s, a) => s + a.precioCompraCop, 0);
            const animalesActivos = animales.filter((a) => a.estado === 'ACTIVO').length;
            const diasEnOperacion = Math.floor((Date.now() - new Date(lote.fechaCompra).getTime()) / (1000 * 60 * 60 * 24));
            return { ...rest, totalInvertidoCop, animalesActivos, diasEnOperacion };
        });
    }
    async findOne(userId, id) {
        const lote = await this.prisma.lote.findFirst({
            where: { id, userId },
            include: {
                finca: true,
                proveedor: true,
                animales: {
                    where: { deletedAt: null },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!lote)
            throw new common_1.NotFoundException('Lote no encontrado');
        return lote;
    }
    async update(userId, id, dto) {
        await this.findOne(userId, id);
        return this.prisma.lote.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.fechaCompra ? { fechaCompra: new Date(dto.fechaCompra) } : {}),
            },
        });
    }
    async archivar(userId, id) {
        await this.findOne(userId, id);
        return this.prisma.lote.update({
            where: { id },
            data: { estado: client_1.EstadoLote.ARCHIVADO },
        });
    }
};
exports.LotesService = LotesService;
exports.LotesService = LotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LotesService);
//# sourceMappingURL=lotes.service.js.map