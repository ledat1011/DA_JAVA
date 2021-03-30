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
exports.loaidangnhap = void 0;
var sequelize_1 = require("sequelize");
var Loaidangnhap = /** @class */ (function (_super) {
    __extends(Loaidangnhap, _super);
    function Loaidangnhap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Loaidangnhap;
}(sequelize_1.Model));
function loaidangnhap(sequelize) {
    return sequelize.define("loaidangnhap", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        ten: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        mota: sequelize_1.DataTypes.STRING
    }, {
        timestamps: false,
        tableName: "loaidangnhap"
    });
}
exports.loaidangnhap = loaidangnhap;
