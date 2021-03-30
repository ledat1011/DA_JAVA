import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface chitietthongbaoAttributes {
    id: number;
    idUser: number;
    idThongBao: number;
    status:boolean
   
}
 interface chitietthongbaoModel extends Model<chitietthongbaoAttributes>, chitietthongbaoAttributes {}
 class Chitietthongbao extends Model<chitietthongbaoModel, chitietthongbaoAttributes> {}

 type ChitietthongbaoStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): chitietthongbaoModel;
};

export function chitietthongbao (sequelize: Sequelize): ChitietthongbaoStatic {
    return <ChitietthongbaoStatic>sequelize.define("chitietthongbao", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          idUser:{
            type:DataType.NUMBER,
            allowNull:false
          },
          idThongBao:{
              
           type: DataType.NUMBER,
           allowNull:false
        },
          status:{
              type:DataType.BOOLEAN
          }
    },{
        timestamps:false,
        tableName:"chitietthongbao"
    }
    );
}