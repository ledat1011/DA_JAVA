import * as sequelize from "sequelize";
import {users} from "./Model/users";
import {roles} from "./Model/roles";
import {binhluan} from './Model/binhluan'
import {posts} from './Model/posts'
import{loaidangnhap} from "./Model/loaidangnhap"
import {chitietthongbao} from './Model/chitietthongbao'
import {chitiettienich} from './Model/chitiettienich'
import {danhgia} from './Model/danhgia'
import {datcoc} from './Model/datcoc'
import {doanhthu} from './Model/doanhthu'
import {image} from './Model/image'
import {link} from './Model/link'
import {loaitienich} from './Model/loaitienich'
import {reply} from './Model/reply'
import {savepost} from './Model/savepost'
import {thongbao} from './Model/thongbao'
import {tienich} from './Model/tienich'
import {province} from './Model/province'
import {district} from './Model/district'
import {ward} from './Model/ward'
import {typepost} from './Model/typepost'
import {formpost} from './Model/formpost'
import {project} from "./Model/project"
import {street} from "./Model/street"
import {mail} from "./Model/mail"
import {report} from "./Model/report"


const dbConfig = new sequelize.Sequelize(
    (process.env.DB_DATABASE || "dacn_db"),
    (process.env.DB_USER || "NhaTro"),
    (process.env.DB_PASS || "Ledat1999"),
    {
        // port: Number(process.env.DB_PORT) || 54320,
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
        logging:false
    }
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

export const User = users(dbConfig);
export const Role = roles(dbConfig);
export const Post = posts(dbConfig);
export const BinhLuan = binhluan(dbConfig);
export const LoaiDangNhap = loaidangnhap(dbConfig);
export const ChiTietThongBao = chitietthongbao(dbConfig);
export const ThongBao = thongbao(dbConfig);
export const TienIch = tienich(dbConfig);
export const ChiTietTienIch = chitiettienich(dbConfig);
export const DanhGia = danhgia(dbConfig);
export const DatCoc = datcoc(dbConfig);
export const DoanhThu = doanhthu(dbConfig);
export const Image = image(dbConfig);
export const Link = link(dbConfig);
export const LoaiTienIch = loaitienich(dbConfig);
export const Reply = reply(dbConfig);
export const SavePost = savepost(dbConfig);
export const Province = province(dbConfig)
export const District = district(dbConfig)
export const Ward = ward(dbConfig);
export const TypePost = typepost(dbConfig);
export const FormPost = formpost(dbConfig);
export const Project = project(dbConfig);
export const Street = street(dbConfig);
export const Mail = mail(dbConfig);
export const Report = report(dbConfig);
// user - role
Role.hasMany(User,{
    foreignKey:"Id_role"
})
User.belongsTo(Role,{
    foreignKey:"Id_role"
})
/** [user] ==> post */
User.hasMany(Post,{
    foreignKey:"idUser",
})
Post.belongsTo(User,{
    foreignKey:"idUser",
})

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

User.hasMany(BinhLuan,{
    foreignKey:"idUser"
})
BinhLuan.belongsTo(User,{
    foreignKey:"idUser"
})
Post.hasMany(BinhLuan,{
    foreignKey:"idPost"
})
BinhLuan.belongsTo(Post,{
    foreignKey:"idPost"
})

/** user - loaidangnhap */
LoaiDangNhap.hasMany(User,{
    foreignKey:"Id_LoaiDangNhap"
})
User.belongsTo(LoaiDangNhap,{
    foreignKey:"Id_LoaiDangNhap"
})
/** chitietthong bao - User/ThongBao */
// User.belongsToMany(ThongBao,{
//     through: ChiTietThongBao,
//     foreignKey:"idUser"
// })
// ThongBao.belongsToMany(User,{
//     through:ChiTietThongBao,
//     foreignKey:"idThongBao"
// })
User.hasMany(ChiTietThongBao,{
    foreignKey:"idUser"
})
ChiTietThongBao.belongsTo(User,{
    foreignKey:"idUser"
})

ThongBao.hasMany(ChiTietThongBao,{
    foreignKey:"idThongBao"
})
ChiTietThongBao.belongsTo(ThongBao,{
    foreignKey:"idThongBao"
})

/**chitiettienich - tienich/post */
TienIch.belongsToMany(Post,{
    through:ChiTietTienIch,
    foreignKey:"idTienIch"
})
Post.belongsToMany(TienIch,{
    through:ChiTietTienIch,
    foreignKey:'idPost',

})
Post.hasMany(ChiTietTienIch,{
    foreignKey:"idPost"
})
ChiTietTienIch.belongsTo(Post,{
    foreignKey:"idPost"
})

TienIch.hasMany(ChiTietTienIch,{
    foreignKey:"idTienIch"
})
ChiTietTienIch.belongsTo(TienIch,{
    foreignKey:"idTienIch"
})
/**danhgia -users/posts */
User.belongsToMany(Post,{
    through:DanhGia,
    foreignKey:"idUser",
    as:"danhgias"   
})
Post.belongsToMany(User,{
    through:DanhGia,
    foreignKey:"idPost",
    as:"danhgias"   
})
/**datcoc -- users/posts  */
User.belongsToMany(Post,{
    through:DatCoc,
    foreignKey:"idUser"
})
Post.belongsToMany(User,{
    through:DatCoc,
    foreignKey:"idPost"
})

User.hasMany(DatCoc,{
    foreignKey:"idUser"
})
DatCoc.belongsTo(User,{
    foreignKey:"idUser"
})
Post.hasMany(DatCoc,{
    foreignKey:"idPost"
})
DatCoc.belongsTo(Post,{
    foreignKey:"idPost"
})


/**doanhthu - User */
User.hasMany(DoanhThu,{
    foreignKey:"idUser"
})
DoanhThu.belongsTo(User,{
    foreignKey:"idUser"
})
/** image -- Post */
Post.hasMany(Image,{
    foreignKey:"IdPost"
})
Image.belongsTo(Post,{
    foreignKey:"IdPost"
})
/**reply -binhluan */
BinhLuan.hasMany(Reply,{
    foreignKey:'idBinhLuan'
})
Reply.belongsTo(BinhLuan,{
    foreignKey:'idBinhLuan'
})
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
User.hasMany(SavePost,{
    foreignKey:"IdUser"
})
SavePost.belongsTo(User,{
    foreignKey:"idUser"
})
Post.hasMany(SavePost,{
    foreignKey:"IdPost"
})
SavePost.belongsTo(Post,{
    foreignKey:"IdPost"
})

/**tienich - loaitienich */
LoaiTienIch.hasMany(TienIch,{
    foreignKey:"idLoaiTienIch"
})
TienIch.belongsTo(LoaiTienIch,{
    foreignKey:"idLoaiTienIch"
})

/** District -- province */
Province.hasMany(District,{
    foreignKey:"_province_id"
})
District.belongsTo(Province,{
    foreignKey:"_province_id"
})
/** ward -- province/district */
Province.belongsToMany(District,{
    through: Ward,
    foreignKey:'_province_id'
})
District.belongsToMany(Province,{
    through:Ward,
    foreignKey:'_district_id'
})
/** post -- typepost */
TypePost.hasMany(Post,{
    foreignKey:"idTypePost"
})
Post.belongsTo(TypePost,{
    foreignKey:"idTypePost"
})

/** post -- formpost */
FormPost.hasMany(Post,{
    foreignKey:"idFormPost"
})
Post.belongsTo(FormPost,{
    foreignKey:"idFormPost"
})
/** post -- province */
Province.hasMany(Post,{
    foreignKey:"idProvince"
})
Post.belongsTo(Province,{
    foreignKey:"idProvince"
})
/** post -- district */
District.hasMany(Post,{
    foreignKey:"idDistrict"
})
Post.belongsTo(District,{
    foreignKey:"idDistrict"
})
/** post -- ward */
Ward.hasMany(Post,{
    foreignKey:"idWard"
})
Post.belongsTo(Ward,{
    foreignKey:"idWard"
})
/** street -- province/district */
Province.hasMany(Street,{
    foreignKey:"_province_id"
})
Street.belongsTo(Province,{
    foreignKey:"_province_id"
})

District.hasMany(Street,{
    foreignKey:"_district_id"
})
Street.belongsTo(District,{
    foreignKey:"_district_id"
})

/** project -- province/district */
Province.hasMany(Project,{
    foreignKey:"_province_id"
})
Project.belongsTo(Province,{
    foreignKey:"_province_id"
})

District.hasMany(Project,{
    foreignKey:"_district_id"
})
Project.belongsTo(District,{
    foreignKey:"_district_id"
})
/** report -- user/post */

User.belongsToMany(Post,{
    through: Report,
    foreignKey:"idUser",
})
Post.belongsToMany(User,{
    through: Report,
    foreignKey:'idPost',
})

User.hasMany(Report,{
    foreignKey:"idUser"
})
Report.belongsTo(User,{
    foreignKey:"idUser"
})
Post.hasMany(Report,{
    foreignKey:"idPost"
})
Report.belongsTo(Post,{
    foreignKey:"idPost"
})