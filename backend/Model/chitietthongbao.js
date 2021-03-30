"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.chitietthongbao = void 0;
var sequelize_1 = require("sequelize");
var Chitietthongbao = /** @class */ (function (_super) {
    __extends(Chitietthongbao, _super);
    function Chitietthongbao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Chitietthongbao;
}(sequelize_1.Model));
function chitietthongbao(sequelize) {
    return sequelize.define("chitietthongbao", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        idUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        idThongBao: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        status: {
            type: sequelize_1.DataTypes.BOOLEAN
        }
    }, {
        timestamps: false,
        tableName: "chitietthongbao"
    });
}
exports.chitietthongbao = chitietthongbao;
