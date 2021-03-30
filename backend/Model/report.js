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
exports.report = void 0;
var sequelize_1 = require("sequelize");
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    function Report() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Report;
}(sequelize_1.Model));
function report(sequelize) {
    return sequelize.define("report", {
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
        content_report: {
            type: sequelize_1.DataTypes.STRING
        },
        level: sequelize_1.DataTypes.STRING,
        create_at: sequelize_1.DataTypes.DATE
    }, {
        timestamps: false,
        tableName: "report"
    });
}
exports.report = report;
