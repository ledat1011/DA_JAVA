"use strict";
exports.__esModule = true;
require("dotenv").config();
exports.User_roles = exports.Report = exports.Mail = exports.Street = exports.Project = exports.FormPost = exports.TypePost = exports.Ward = exports.District = exports.Province = exports.SavePost = exports.Reply = exports.LoaiTienIch = exports.Link = exports.Image = exports.DoanhThu = exports.DatCoc = exports.DanhGia = exports.ChiTietTienIch = exports.TienIch = exports.ThongBao = exports.ChiTietThongBao = exports.LoaiDangNhap = exports.BinhLuan = exports.Post = exports.Role = exports.User = void 0;
var sequelize = require("sequelize");
var users_1 = require("./Model/users");
var roles_1 = require("./Model/roles");
var binhluan_1 = require("./Model/binhluan");
var posts_1 = require("./Model/posts");
var loaidangnhap_1 = require("./Model/loaidangnhap");
var chitietthongbao_1 = require("./Model/chitietthongbao");
var chitiettienich_1 = require("./Model/chitiettienich");
var danhgia_1 = require("./Model/danhgia");
var datcoc_1 = require("./Model/datcoc");
var doanhthu_1 = require("./Model/doanhthu");
var image_1 = require("./Model/image");
var link_1 = require("./Model/link");
var loaitienich_1 = require("./Model/loaitienich");
var reply_1 = require("./Model/reply");
var savepost_1 = require("./Model/savepost");
var thongbao_1 = require("./Model/thongbao");
var tienich_1 = require("./Model/tienich");
var province_1 = require("./Model/province");
var district_1 = require("./Model/district");
var ward_1 = require("./Model/ward");
var typepost_1 = require("./Model/typepost");
var formpost_1 = require("./Model/formpost");
var project_1 = require("./Model/project");
var street_1 = require("./Model/street");
var mail_1 = require("./Model/mail");
var report_1 = require("./Model/report");
var user_roles_1 = require("./Model/user_roles");
var dbConfig = new sequelize.Sequelize((process.env.DB_DATABASE || "dacn_db"), (process.env.DB_USER || "NhaTro"), (process.env.DB_PASS || "Ledat1999"), {
    // port: Number(process.env.DB_PORT) || 54320,
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    },
    // logging: false
});
// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`
exports.User = users_1.users(dbConfig);
exports.Role = roles_1.roles(dbConfig);
exports.Post = posts_1.posts(dbConfig);
exports.BinhLuan = binhluan_1.binhluan(dbConfig);
exports.LoaiDangNhap = loaidangnhap_1.loaidangnhap(dbConfig);
exports.ChiTietThongBao = chitietthongbao_1.chitietthongbao(dbConfig);
exports.ThongBao = thongbao_1.thongbao(dbConfig);
exports.TienIch = tienich_1.tienich(dbConfig);
exports.ChiTietTienIch = chitiettienich_1.chitiettienich(dbConfig);
exports.DanhGia = danhgia_1.danhgia(dbConfig);
exports.DatCoc = datcoc_1.datcoc(dbConfig);
exports.DoanhThu = doanhthu_1.doanhthu(dbConfig);
exports.Image = image_1.image(dbConfig);
exports.Link = link_1.link(dbConfig);
exports.LoaiTienIch = loaitienich_1.loaitienich(dbConfig);
exports.Reply = reply_1.reply(dbConfig);
exports.SavePost = savepost_1.savepost(dbConfig);
exports.Province = province_1.province(dbConfig);
exports.District = district_1.district(dbConfig);
exports.Ward = ward_1.ward(dbConfig);
exports.TypePost = typepost_1.typepost(dbConfig);
exports.FormPost = formpost_1.formpost(dbConfig);
exports.Project = project_1.project(dbConfig);
exports.Street = street_1.street(dbConfig);
exports.Mail = mail_1.mail(dbConfig);
exports.Report = report_1.report(dbConfig);
exports.User_roles = user_roles_1.user_roles(dbConfig);
exports.User_roles.removeAttribute('id');
// user - role
//===================================
// Role.hasMany(User,{
//     foreignKey:"Id_role"
// })
// User.belongsTo(Role,{
//     foreignKey:"Id_role"
// })
//=====================================
exports.Role.hasMany(exports.User_roles, {
    foreignKey: "role_id"
});
exports.User_roles.belongsTo(exports.Role, {
    foreignKey: "role_id"
});
exports.User.hasMany(exports.User_roles, {
    foreignKey: "user_id"
});
exports.User_roles.belongsTo(exports.User, {
    foreignKey: "user_id"
});
/** [user] ==> post */
exports.User.hasMany(exports.Post, {
    foreignKey: "idUser"
});
exports.Post.belongsTo(exports.User, {
    foreignKey: "idUser"
});
/* ----------Binh luan  - post/user-----------*/
// User.belongsToMany(Post,{
//     through: {
//         model:BinhLuan,
//         unique:false
//     },
//     as:"binhluans",
//     foreignKey:"idUser",
// })
// Post.belongsToMany(User,{
//     through: {
//         model:BinhLuan,
//         unique:false,
//     },
//     as:"binhluans",
//     foreignKey:'idPost',
// })
exports.User.hasMany(exports.BinhLuan, {
    foreignKey: "idUser"
});
exports.BinhLuan.belongsTo(exports.User, {
    foreignKey: "idUser"
});
exports.Post.hasMany(exports.BinhLuan, {
    foreignKey: "idPost"
});
exports.BinhLuan.belongsTo(exports.Post, {
    foreignKey: "idPost"
});
/** user - loaidangnhap */
exports.LoaiDangNhap.hasMany(exports.User, {
    foreignKey: "Id_LoaiDangNhap"
});
exports.User.belongsTo(exports.LoaiDangNhap, {
    foreignKey: "Id_LoaiDangNhap"
});
/** chitietthong bao - User/ThongBao */
// User.belongsToMany(ThongBao,{
//     through: ChiTietThongBao,
//     foreignKey:"idUser"
// })
// ThongBao.belongsToMany(User,{
//     through:ChiTietThongBao,
//     foreignKey:"idThongBao"
// })
exports.User.hasMany(exports.ChiTietThongBao, {
    foreignKey: "idUser"
});
exports.ChiTietThongBao.belongsTo(exports.User, {
    foreignKey: "idUser"
});
exports.ThongBao.hasMany(exports.ChiTietThongBao, {
    foreignKey: "idThongBao"
});
exports.ChiTietThongBao.belongsTo(exports.ThongBao, {
    foreignKey: "idThongBao"
});
/**chitiettienich - tienich/post */
exports.TienIch.belongsToMany(exports.Post, {
    through: exports.ChiTietTienIch,
    foreignKey: "idTienIch"
});
exports.Post.belongsToMany(exports.TienIch, {
    through: exports.ChiTietTienIch,
    foreignKey: 'idPost'
});
exports.Post.hasMany(exports.ChiTietTienIch, {
    foreignKey: "idPost"
});
exports.ChiTietTienIch.belongsTo(exports.Post, {
    foreignKey: "idPost"
});
exports.TienIch.hasMany(exports.ChiTietTienIch, {
    foreignKey: "idTienIch"
});
exports.ChiTietTienIch.belongsTo(exports.TienIch, {
    foreignKey: "idTienIch"
});
/**danhgia -users/posts */
exports.User.belongsToMany(exports.Post, {
    through: exports.DanhGia,
    foreignKey: "idUser",
    as: "danhgias"
});
exports.Post.belongsToMany(exports.User, {
    through: exports.DanhGia,
    foreignKey: "idPost",
    as: "danhgias"
});
/**datcoc -- users/posts  */
exports.User.belongsToMany(exports.Post, {
    through: exports.DatCoc,
    foreignKey: "idUser"
});
exports.Post.belongsToMany(exports.User, {
    through: exports.DatCoc,
    foreignKey: "idPost"
});
exports.User.hasMany(exports.DatCoc, {
    foreignKey: "idUser"
});
exports.DatCoc.belongsTo(exports.User, {
    foreignKey: "idUser"
});
exports.Post.hasMany(exports.DatCoc, {
    foreignKey: "idPost"
});
exports.DatCoc.belongsTo(exports.Post, {
    foreignKey: "idPost"
});
/**doanhthu - User */
exports.User.hasMany(exports.DoanhThu, {
    foreignKey: "idUser"
});
exports.DoanhThu.belongsTo(exports.User, {
    foreignKey: "idUser"
});
/** image -- Post */
exports.Post.hasMany(exports.Image, {
    foreignKey: "IdPost"
});
exports.Image.belongsTo(exports.Post, {
    foreignKey: "IdPost"
});
/**reply -binhluan */
exports.BinhLuan.hasMany(exports.Reply, {
    foreignKey: 'idBinhLuan'
});
exports.Reply.belongsTo(exports.BinhLuan, {
    foreignKey: 'idBinhLuan'
});
/**savepost -- user/post */
// User.belongsToMany(Post,{
//     through:SavePost,
//     as:"saveposts",
//     foreignKey:"idUser"
// })
// Post.belongsToMany(User,{
//     through:SavePost,
//     as:"saveposts",
//     foreignKey:"idPost"
// })
exports.User.hasMany(exports.SavePost, {
    foreignKey: "IdUser"
});
exports.SavePost.belongsTo(exports.User, {
    foreignKey: "idUser"
});
exports.Post.hasMany(exports.SavePost, {
    foreignKey: "IdPost"
});
exports.SavePost.belongsTo(exports.Post, {
    foreignKey: "IdPost"
});
/**tienich - loaitienich */
exports.LoaiTienIch.hasMany(exports.TienIch, {
    foreignKey: "idLoaiTienIch"
});
exports.TienIch.belongsTo(exports.LoaiTienIch, {
    foreignKey: "idLoaiTienIch"
});
/** District -- province */
exports.Province.hasMany(exports.District, {
    foreignKey: "_province_id"
});
exports.District.belongsTo(exports.Province, {
    foreignKey: "_province_id"
});
/** ward -- province/district */
exports.Province.belongsToMany(exports.District, {
    through: exports.Ward,
    foreignKey: '_province_id'
});
exports.District.belongsToMany(exports.Province, {
    through: exports.Ward,
    foreignKey: '_district_id'
});
/** post -- typepost */
exports.TypePost.hasMany(exports.Post, {
    foreignKey: "idTypePost"
});
exports.Post.belongsTo(exports.TypePost, {
    foreignKey: "idTypePost"
});
/** post -- formpost */
exports.FormPost.hasMany(exports.Post, {
    foreignKey: "idFormPost"
});
exports.Post.belongsTo(exports.FormPost, {
    foreignKey: "idFormPost"
});
/** post -- province */
exports.Province.hasMany(exports.Post, {
    foreignKey: "idProvince"
});
exports.Post.belongsTo(exports.Province, {
    foreignKey: "idProvince"
});
/** post -- district */
exports.District.hasMany(exports.Post, {
    foreignKey: "idDistrict"
});
exports.Post.belongsTo(exports.District, {
    foreignKey: "idDistrict"
});
/** post -- ward */
exports.Ward.hasMany(exports.Post, {
    foreignKey: "idWard"
});
exports.Post.belongsTo(exports.Ward, {
    foreignKey: "idWard"
});
/** street -- province/district */
exports.Province.hasMany(exports.Street, {
    foreignKey: "_province_id"
});
exports.Street.belongsTo(exports.Province, {
    foreignKey: "_province_id"
});
exports.District.hasMany(exports.Street, {
    foreignKey: "_district_id"
});
exports.Street.belongsTo(exports.District, {
    foreignKey: "_district_id"
});
/** project -- province/district */
exports.Province.hasMany(exports.Project, {
    foreignKey: "_province_id"
});
exports.Project.belongsTo(exports.Province, {
    foreignKey: "_province_id"
});
exports.District.hasMany(exports.Project, {
    foreignKey: "_district_id"
});
exports.Project.belongsTo(exports.District, {
    foreignKey: "_district_id"
});
/** report -- user/post */
exports.User.belongsToMany(exports.Post, {
    through: exports.Report,
    foreignKey: "idUser"
});
exports.Post.belongsToMany(exports.User, {
    through: exports.Report,
    foreignKey: 'idPost'
});
exports.User.hasMany(exports.Report, {
    foreignKey: "idUser"
});
exports.Report.belongsTo(exports.User, {
    foreignKey: "idUser"
});
exports.Post.hasMany(exports.Report, {
    foreignKey: "idPost"
});
exports.Report.belongsTo(exports.Post, {
    foreignKey: "idPost"
});
