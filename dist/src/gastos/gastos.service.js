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
exports.GastosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GastosService = class GastosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.gasto.create({
            data: { ...dto, fecha: new Date(dto.fecha) },
        });
    }
    findByLote(loteId) {
        return this.prisma.gasto.findMany({
            where: { loteId },
            orderBy: { fecha: 'desc' },
        });
    }
    async resumenByLote(loteId) {
        const gastos = await this.prisma.gasto.findMany({ where: { loteId } });
        const total = gastos.reduce((s, g) => s + g.montoCop, 0);
        const porCategoria = gastos.reduce((acc, g) => {
            acc[g.categoria] = (acc[g.categoria] ?? 0) + g.montoCop;
            return acc;
        }, {});
        return { total, porCategoria, lista: gastos };
    }
    async delete(id) {
        const g = await this.prisma.gasto.findUnique({ where: { id } });
        if (!g)
            throw new common_1.NotFoundException('Gasto no encontrado');
        return this.prisma.gasto.delete({ where: { id } });
    }
};
exports.GastosService = GastosService;
exports.GastosService = GastosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GastosService);
//# sourceMappingURL=gastos.service.js.map