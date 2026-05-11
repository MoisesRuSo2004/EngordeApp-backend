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
exports.ProveedoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProveedoresService = class ProveedoresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(userId, dto) {
        return this.prisma.proveedor.create({
            data: { ...dto, userId },
        });
    }
    findAll(userId) {
        return this.prisma.proveedor.findMany({
            where: { userId },
            orderBy: { nombre: 'asc' },
            include: { _count: { select: { lotes: true } } },
        });
    }
    async findOne(userId, id) {
        const p = await this.prisma.proveedor.findFirst({
            where: { id, userId },
            include: {
                lotes: {
                    select: { id: true, nombre: true, fechaCompra: true, estado: true },
                    orderBy: { fechaCompra: 'desc' },
                },
            },
        });
        if (!p)
            throw new common_1.NotFoundException('Proveedor no encontrado');
        return p;
    }
    async update(userId, id, dto) {
        const p = await this.prisma.proveedor.findFirst({ where: { id, userId } });
        if (!p)
            throw new common_1.NotFoundException('Proveedor no encontrado');
        return this.prisma.proveedor.update({ where: { id }, data: dto });
    }
    async remove(userId, id) {
        const p = await this.prisma.proveedor.findFirst({ where: { id, userId } });
        if (!p)
            throw new common_1.NotFoundException('Proveedor no encontrado');
        return this.prisma.proveedor.delete({ where: { id } });
    }
};
exports.ProveedoresService = ProveedoresService;
exports.ProveedoresService = ProveedoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProveedoresService);
//# sourceMappingURL=proveedores.service.js.map