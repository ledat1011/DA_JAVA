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
exports.mail = void 0;
var sequelize_1 = require("sequelize");
var Mail = /** @class */ (function (_super) {
    __extends(Mail, _super);
    function Mail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mail;
}(sequelize_1.Model));
function mail(sequelize) {
    return sequelize.define("mail", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        gmail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        using: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: "mail"
    });
}
exports.mail = mail;
