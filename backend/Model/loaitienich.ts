import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface loaitienichAttributes {
    id: number;
    TenLoaiTienIch: string
   
}
 interface loaitienichModel extends Model<loaitienichAttributes>, loaitienichAttributes {}
 class Loaitienich extends Model<loaitienichModel, loaitienichAttributes> {}

 type loaitienichStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): loaitienichModel;
};

export function loaitienich (sequelize: Sequelize): loaitienichStatic {
    return <loaitienichStatic>sequelize.define("loaitienich", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
    
          TenLoaiTienIch: DataType.STRING
        
    },{
        timestamps:false,
        tableName:"loaitienich"
    }
    );
}