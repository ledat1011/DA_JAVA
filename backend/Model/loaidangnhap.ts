import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface loaidangnhapAttributes {
    id: number;
    ten: string;
    mota: string;
   
}
 interface loaidangnhapModel extends Model<loaidangnhapAttributes>, loaidangnhapAttributes {}
 class Loaidangnhap extends Model<loaidangnhapModel, loaidangnhapAttributes> {}

 type LoaidangnhapStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): loaidangnhapModel;
};

export function loaidangnhap (sequelize: Sequelize): LoaidangnhapStatic {
    return <LoaidangnhapStatic>sequelize.define("loaidangnhap", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          ten:{
            type:DataType.STRING(50)
          },
          mota:DataType.STRING
    },{
        timestamps:false,
        tableName:"loaidangnhap"
    }
    );
}