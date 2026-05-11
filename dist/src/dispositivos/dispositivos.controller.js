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
exports.DispositivosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const dispositivos_service_1 = require("./dispositivos.service");
const upsert_token_dto_1 = require("./dto/upsert-token.dto");
let DispositivosController = class DispositivosController {
    dispositivos;
    constructor(dispositivos) {
        this.dispositivos = dispositivos;
    }
    registrarToken(user, dto) {
        return this.dispositivos.upsertToken(user.sub, dto);
    }
    desactivarTokens(user) {
        return this.dispositivos.desactivarTokens(user.sub);
    }
};
exports.DispositivosController = DispositivosController;
__decorate([
    (0, common_1.Post)('token'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_token_dto_1.UpsertTokenDto]),
    __metadata("design:returntype", void 0)
], DispositivosController.prototype, "registrarToken", null);
__decorate([
    (0, common_1.Delete)('token'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DispositivosController.prototype, "desactivarTokens", null);
exports.DispositivosController = DispositivosController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dispositivos'),
    __metadata("design:paramtypes", [dispositivos_service_1.DispositivosService])
], DispositivosController);
//# sourceMappingURL=dispositivos.controller.js.map