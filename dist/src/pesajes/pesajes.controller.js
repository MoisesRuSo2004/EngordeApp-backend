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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PesajesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const pesajes_service_1 = require("./pesajes.service");
const create_pesaje_dto_1 = require("./dto/create-pesaje.dto");
let PesajesController = class PesajesController {
    pesajes;
    constructor(pesajes) {
        this.pesajes = pesajes;
    }
    create(user, dto) {
        return this.pesajes.create(user.sub, dto);
    }
    findByAnimal(animalId) {
        return this.pesajes.findByAnimal(animalId);
    }
    calcularGdp(animalId) {
        return this.pesajes.calcularGdp(animalId);
    }
    findByLote(loteId) {
        return this.pesajes.findByLote(loteId);
    }
    delete(id) {
        return this.pesajes.delete(id);
    }
};
exports.PesajesController = PesajesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pesaje_dto_1.CreatePesajeDto]),
    __metadata("design:returntype", void 0)
], PesajesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('animal/:animalId'),
    __param(0, (0, common_1.Param)('animalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PesajesController.prototype, "findByAnimal", null);
__decorate([
    (0, common_1.Get)('animal/:animalId/gdp'),
    __param(0, (0, common_1.Param)('animalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PesajesController.prototype, "calcularGdp", null);
__decorate([
    (0, common_1.Get)('lote/:loteId'),
    __param(0, (0, common_1.Param)('loteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PesajesController.prototype, "findByLote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PesajesController.prototype, "delete", null);
exports.PesajesController = PesajesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('pesajes'),
    __metadata("design:paramtypes", [pesajes_service_1.PesajesService])
], PesajesController);
//# sourceMappingURL=pesajes.controller.js.map