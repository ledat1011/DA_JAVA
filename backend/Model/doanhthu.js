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
exports.doanhthu = void 0;
var sequelize_1 = require("sequelize");
var Doanhthu = /** @class */ (function (_super) {
    __extends(Doanhthu, _super);
    function Doanhthu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Doanhthu;
}(sequelize_1.Model));
function doanhthu(sequelize) {
    var currentDate = new Date();
    return sequelize.define("doanhthu", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        Money: {
            type: sequelize_1.DataTypes.DECIMAL
        },
        idUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        NgayNap: sequelize_1.DataTypes.DATE,
        Nam: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: currentDate.getFullYear()
        },
        Thang: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: currentDate.getMonth() + 1
        },
        Ngay: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: currentDate.getDate()
        }
    }, {
        timestamps: false,
        tableName: "doanhthu"
    });
}
exports.doanhthu = doanhthu;
