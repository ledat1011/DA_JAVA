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
exports.reply = void 0;
var sequelize_1 = require("sequelize");
var Reply = /** @class */ (function (_super) {
    __extends(Reply, _super);
    function Reply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Reply;
}(sequelize_1.Model));
function reply(sequelize) {
    return sequelize.define("reply", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        idBinhLuan: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        NoiDung: sequelize_1.DataTypes.STRING,
        Update_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        Created_at: {
            type: sequelize_1.DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: "reply"
    });
}
exports.reply = reply;
