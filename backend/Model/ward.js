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
exports.ward = void 0;
var sequelize_1 = require("sequelize");
var Province = /** @class */ (function (_super) {
    __extends(Province, _super);
    function Province() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Province;
}(sequelize_1.Model));
function ward(sequelize) {
    return sequelize.define("ward", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        _name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        _prefix: sequelize_1.DataTypes.STRING,
        _province_id: sequelize_1.DataTypes.INTEGER,
        _district_id: sequelize_1.DataTypes.INTEGER
    }, {
        timestamps: false,
        tableName: "ward"
    });
}
exports.ward = ward;
