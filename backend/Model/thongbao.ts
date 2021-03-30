import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface thongbaoAttributes {
    id: number;
    NoiDung:string,
    NgayThongBao:Date,
    link:string,
    MoTa:string
  
   
}
 interface thongbaoModel extends Model<thongbaoAttributes>, thongbaoAttributes {}
 class Thongbao extends Model<thongbaoModel, thongbaoAttributes> {}

 type thongbaoStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): thongbaoModel;
};

export function thongbao (sequelize: Sequelize): thongbaoStatic {
    return <thongbaoStatic>sequelize.define("thongbao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
         
          NoiDung: DataType.STRING,
          NgayThongBao:{
            type: DataType.DATE,
            defaultValue:DataType.NOW
          },
          MoTa:DataType.STRING,
          link:DataType.STRING

    },{
        timestamps:false,
        tableName:"thongbao"
    }
    );
}