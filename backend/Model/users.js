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
exports.users = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
function users(sequelize) {
    return sequelize.define("users", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        First_name: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        Last_name: sequelize_1.DataTypes.STRING(50),
        PhoneNumber: sequelize_1.DataTypes.INTEGER,
        Email: sequelize_1.DataTypes.STRING,
        Money: sequelize_1.DataTypes.DECIMAL,
        block: sequelize_1.DataTypes.BOOLEAN,
        Id_role: sequelize_1.DataTypes.INTEGER,
        PassWord: sequelize_1.DataTypes.STRING,
        Id_LoaiDangNhap: sequelize_1.DataTypes.INTEGER,
        ConfirmEmaiil: sequelize_1.DataTypes.BOOLEAN,
        Created_at: {
            type: sequelize_1.DataTypes.DATE
        },
        Update_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        timestamps: false
    });
}
exports.users = users;
