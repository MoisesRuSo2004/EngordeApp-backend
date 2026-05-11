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
exports.PerfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PerfilesService = class PerfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkDisponible(username) {
        const existe = await this.prisma.perfil.findUnique({
            where: { username: username.toLowerCase() },
        });
        return { disponible: !existe };
    }
    async crear(userId, username, email) {
        const usernameLower = username.toLowerCase();
        const conflicto = await this.prisma.perfil.findFirst({
            where: { OR: [{ username: usernameLower }, { email }] },
        });
        if (conflicto?.username === usernameLower) {
            throw new common_1.ConflictException('Ese nombre de usuario ya está en uso');
        }
        if (conflicto?.email === email) {
            throw new common_1.ConflictException('Ya existe una cuenta con ese correo');
        }
        return this.prisma.perfil.create({
            data: { userId, username: usernameLower, email },
        });
    }
    async resolverEmail(username) {
        const perfil = await this.prisma.perfil.findUnique({
            where: { username: username.toLowerCase() },
            select: { email: true },
        });
        if (!perfil)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return { email: perfil.email };
    }
    async actualizarUsername(userId, nuevoUsername, email) {
        const lower = nuevoUsername.toLowerCase();
        const conflicto = await this.prisma.perfil.findUnique({ where: { username: lower } });
        if (conflicto && conflicto.userId !== userId) {
            throw new common_1.ConflictException('Ese nombre de usuario ya está en uso');
        }
        return this.prisma.perfil.upsert({
            where: { userId },
            update: { username: lower },
            create: { userId, username: lower, email },
        });
    }
    obtenerPorUserId(userId) {
        return this.prisma.perfil.findUnique({ where: { userId } });
    }
};
exports.PerfilesService = PerfilesService;
exports.PerfilesService = PerfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PerfilesService);
//# sourceMappingURL=perfiles.service.js.map