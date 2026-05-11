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
exports.PerfilesController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const perfiles_service_1 = require("./perfiles.service");
class CrearPerfilDto {
    userId;
    username;
    email;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CrearPerfilDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/^[a-z0-9_.]+$/, { message: 'Username solo puede contener letras, números, puntos y _' }),
    __metadata("design:type", String)
], CrearPerfilDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CrearPerfilDto.prototype, "email", void 0);
class ActualizarUsernameDto {
    username;
    email;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/^[a-z0-9_.]+$/, { message: 'Username solo puede contener letras, números, puntos y _' }),
    __metadata("design:type", String)
], ActualizarUsernameDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ActualizarUsernameDto.prototype, "email", void 0);
let PerfilesController = class PerfilesController {
    perfiles;
    constructor(perfiles) {
        this.perfiles = perfiles;
    }
    checkDisponible(username) {
        return this.perfiles.checkDisponible(username);
    }
    resolverEmail(username) {
        return this.perfiles.resolverEmail(username);
    }
    crear(dto) {
        return this.perfiles.crear(dto.userId, dto.username, dto.email);
    }
    obtenerMio(user) {
        return this.perfiles.obtenerPorUserId(user.sub);
    }
    actualizarUsername(user, dto) {
        return this.perfiles.actualizarUsername(user.sub, dto.username, dto.email);
    }
};
exports.PerfilesController = PerfilesController;
__decorate([
    (0, common_1.Get)('check/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfilesController.prototype, "checkDisponible", null);
__decorate([
    (0, common_1.Get)('resolver/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfilesController.prototype, "resolverEmail", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CrearPerfilDto]),
    __metadata("design:returntype", void 0)
], PerfilesController.prototype, "crear", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('mio'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerfilesController.prototype, "obtenerMio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('username'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ActualizarUsernameDto]),
    __metadata("design:returntype", void 0)
], PerfilesController.prototype, "actualizarUsername", null);
exports.PerfilesController = PerfilesController = __decorate([
    (0, common_1.Controller)('perfiles'),
    __metadata("design:paramtypes", [perfiles_service_1.PerfilesService])
], PerfilesController);
//# sourceMappingURL=perfiles.controller.js.map