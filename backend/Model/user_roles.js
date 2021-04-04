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
exports.user_roles = void 0;
var sequelize_1 = require("sequelize");
var User_roles = /** @class */ (function (_super) {
    __extends(User_roles, _super);
    function User_roles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User_roles;
}(sequelize_1.Model));
function user_roles(sequelize) {
    return sequelize.define("user_roles", {
        role_id: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: "user_roles"
    });
}
exports.user_roles = user_roles;
