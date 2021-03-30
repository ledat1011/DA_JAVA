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
exports.datcoc = void 0;
var sequelize_1 = require("sequelize");
var Datcoc = /** @class */ (function (_super) {
    __extends(Datcoc, _super);
    function Datcoc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Datcoc;
}(sequelize_1.Model));
function datcoc(sequelize) {
    return sequelize.define("datcoc", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        idPost: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        idUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        NgayXemPhong: sequelize_1.DataTypes.DATE
    }, {
        timestamps: false,
        tableName: "datcoc"
    });
}
exports.datcoc = datcoc;
