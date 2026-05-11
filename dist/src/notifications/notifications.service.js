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
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    prisma;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async enviarAUsuario(userId, payload) {
        const tokens = await this.prisma.pushToken.findMany({
            where: { userId, activo: true },
            select: { token: true },
        });
        if (tokens.length === 0)
            return;
        const mensajes = tokens.map((t) => ({
            to: t.token,
            sound: 'default',
            title: payload.titulo,
            body: payload.cuerpo,
            data: payload.data ?? {},
        }));
        try {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mensajes),
            });
            const result = (await response.json());
            if (result?.data) {
                const datos = Array.isArray(result.data) ? result.data : [result.data];
                const tokensList = tokens.map((t) => t.token);
                for (let i = 0; i < datos.length; i++) {
                    const item = datos[i];
                    if (item?.status === 'error' &&
                        (item?.details?.error === 'DeviceNotRegistered' ||
                            item?.details?.error === 'InvalidCredentials')) {
                        await this.prisma.pushToken.updateMany({
                            where: { token: tokensList[i] },
                            data: { activo: false },
                        }).catch(() => { });
                    }
                }
            }
        }
        catch (err) {
            this.logger.warn(`Error enviando push a userId ${userId}: ${err}`);
        }
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map