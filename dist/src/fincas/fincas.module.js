"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FincasModule = void 0;
const common_1 = require("@nestjs/common");
const fincas_controller_1 = require("./fincas.controller");
const fincas_service_1 = require("./fincas.service");
let FincasModule = class FincasModule {
};
exports.FincasModule = FincasModule;
exports.FincasModule = FincasModule = __decorate([
    (0, common_1.Module)({
        controllers: [fincas_controller_1.FincasController],
        providers: [fincas_service_1.FincasService],
        exports: [fincas_service_1.FincasService],
    })
], FincasModule);
//# sourceMappingURL=fincas.module.js.map