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
exports.project = void 0;
var sequelize_1 = require("sequelize");
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Project;
}(sequelize_1.Model));
function project(sequelize) {
    return sequelize.define("project", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        _district_id: sequelize_1.DataTypes.INTEGER,
        _province_id: sequelize_1.DataTypes.INTEGER,
        _lat: sequelize_1.DataTypes.FLOAT,
        _lng: sequelize_1.DataTypes.FLOAT,
        _name: sequelize_1.DataTypes.STRING
    }, {
        timestamps: false,
        tableName: "project"
    });
}
exports.project = project;
