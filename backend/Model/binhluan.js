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
exports.binhluan = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../database");
var BinhLuan = /** @class */ (function (_super) {
    __extends(BinhLuan, _super);
    function BinhLuan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BinhLuan;
}(sequelize_1.Model));
function binhluan(sequelize) {
    return sequelize.define("binhluan", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        idPost: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: database_1.Post,
                key: "id"
            }
        },
        idUser: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: database_1.User,
                key: "id"
            }
        },
        NoiDung: {
            type: sequelize_1.DataTypes.STRING
        },
        Update_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        Created_at: {
            type: sequelize_1.DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: 'binhluan'
    });
}
exports.binhluan = binhluan;
