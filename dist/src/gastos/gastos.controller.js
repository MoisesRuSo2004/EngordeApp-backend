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
exports.GastosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const gastos_service_1 = require("./gastos.service");
const create_gasto_dto_1 = require("./dto/create-gasto.dto");
let GastosController = class GastosController {
    gastos;
    constructor(gastos) {
        this.gastos = gastos;
    }
    create(dto) {
        return this.gastos.create(dto);
    }
    findByLote(loteId) {
        return this.gastos.findByLote(loteId);
    }
    resumen(loteId) {
        return this.gastos.resumenByLote(loteId);
    }
    delete(id) {
        return this.gastos.delete(id);
    }
};
exports.GastosController = GastosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gasto_dto_1.CreateGastoDto]),
    __metadata("design:returntype", void 0)
], GastosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('lote/:loteId'),
    __param(0, (0, common_1.Param)('loteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GastosController.prototype, "findByLote", null);
__decorate([
    (0, common_1.Get)('lote/:loteId/resumen'),
    __param(0, (0, common_1.Param)('loteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GastosController.prototype, "resumen", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GastosController.prototype, "delete", null);
exports.GastosController = GastosController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('gastos'),
    __metadata("design:paramtypes", [gastos_service_1.GastosService])
], GastosController);
//# sourceMappingURL=gastos.controller.js.map