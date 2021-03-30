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
exports.savepost = void 0;
var sequelize_1 = require("sequelize");
var Savepost = /** @class */ (function (_super) {
    __extends(Savepost, _super);
    function Savepost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Savepost;
}(sequelize_1.Model));
function savepost(sequelize) {
    return sequelize.define("savepost", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        IdPost: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        IdUser: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: "savepost"
    });
}
exports.savepost = savepost;
