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
exports.AnimalesController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class VenderAnimalDto {
    precioVentaCop;
    pesoVentaKg;
    fechaVenta;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], VenderAnimalDto.prototype, "precioVentaCop", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], VenderAnimalDto.prototype, "pesoVentaKg", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], VenderAnimalDto.prototype, "fechaVenta", void 0);
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const animales_service_1 = require("./animales.service");
const create_animal_dto_1 = require("./dto/create-animal.dto");
let AnimalesController = class AnimalesController {
    animales;
    constructor(animales) {
        this.animales = animales;
    }
    create(dto) {
        return this.animales.create(dto);
    }
    createMasivo(dto) {
        return this.animales.createMasivo(dto);
    }
    findByLote(loteId) {
        return this.animales.findByLote(loteId);
    }
    findVendidosByLote(loteId) {
        return this.animales.findVendidosByLote(loteId);
    }
    findOne(id) {
        return this.animales.findOne(id);
    }
    update(id, dto) {
        return this.animales.update(id, dto);
    }
    vender(user, id, dto) {
        return this.animales.vender(user.sub, id, dto);
    }
    remove(id) {
        return this.animales.remove(id);
    }
};
exports.AnimalesController = AnimalesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animal_dto_1.CreateAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('masivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animal_dto_1.CreateAnimalesMasivoDto]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "createMasivo", null);
__decorate([
    (0, common_1.Get)('lote/:loteId'),
    __param(0, (0, common_1.Param)('loteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "findByLote", null);
__decorate([
    (0, common_1.Get)('lote/:loteId/vendidos'),
    __param(0, (0, common_1.Param)('loteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "findVendidosByLote", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/vender'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, VenderAnimalDto]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "vender", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimalesController.prototype, "remove", null);
exports.AnimalesController = AnimalesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('animales'),
    __metadata("design:paramtypes", [animales_service_1.AnimalesService])
], AnimalesController);
//# sourceMappingURL=animales.controller.js.map