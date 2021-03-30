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
exports.posts = void 0;
var sequelize_1 = require("sequelize");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Post;
}(sequelize_1.Model));
function posts(sequelize) {
    return sequelize.define("posts", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        idProvince: sequelize_1.DataTypes.INTEGER,
        idDistrict: sequelize_1.DataTypes.INTEGER,
        idWard: sequelize_1.DataTypes.INTEGER,
        idStreet: sequelize_1.DataTypes.INTEGER,
        price: sequelize_1.DataTypes.DECIMAL(18, 0),
        minPrice: sequelize_1.DataTypes.DECIMAL(18, 0),
        maxPrice: sequelize_1.DataTypes.DECIMAL(18, 0),
        selectedRuleParty: sequelize_1.DataTypes.STRING,
        selectedRuleSmoke: sequelize_1.DataTypes.STRING,
        selectedRulePet: sequelize_1.DataTypes.STRING,
        addRule: sequelize_1.DataTypes.STRING,
        introduction: sequelize_1.DataTypes.STRING,
        title: sequelize_1.DataTypes.STRING,
        idTypePost: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER
        },
        idFormPost: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER
        },
        avatar: sequelize_1.DataTypes.STRING,
        roomNumber: sequelize_1.DataTypes.INTEGER,
        bathroomNuber: sequelize_1.DataTypes.INTEGER,
        kitchenNumber: sequelize_1.DataTypes.INTEGER,
        idDoiTuong: sequelize_1.DataTypes.INTEGER,
        Dientich: sequelize_1.DataTypes.INTEGER,
        soLuongTruyCap: sequelize_1.DataTypes.INTEGER,
        //for admin
        status: sequelize_1.DataTypes.BOOLEAN,
        tienDatCoc: sequelize_1.DataTypes.INTEGER,
        TrangThaiDatCoc: sequelize_1.DataTypes.BOOLEAN,
        IdUser: sequelize_1.DataTypes.INTEGER,
        DiaChi: sequelize_1.DataTypes.STRING,
        //for user
        confirm: sequelize_1.DataTypes.BOOLEAN,
        numberAddress: sequelize_1.DataTypes.STRING,
        Created_at: sequelize_1.DataTypes.DATE,
        Update_at: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        lat: sequelize_1.DataTypes.DOUBLE,
        lng: sequelize_1.DataTypes.DOUBLE
    }, {
        timestamps: false
    });
}
exports.posts = posts;
