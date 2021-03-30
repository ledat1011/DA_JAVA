import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface chitiettienichAttributes {
    id: number;
    idTienIch: number;
    idPost: number;

   
}
 interface chitiettienichModel extends Model<chitiettienichAttributes>, chitiettienichAttributes {}
 class Chitiettienich extends Model<chitiettienichModel, chitiettienichAttributes> {}

 type chitiettienichStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): chitiettienichModel;
};

export function chitiettienich (sequelize: Sequelize): chitiettienichStatic {
    return <chitiettienichStatic>sequelize.define("chitiettienich", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          idPost:{
            type:DataType.NUMBER,
            allowNull:false
          },
          idTienIch:{
              
           type: DataType.NUMBER,
           allowNull:false
        }
    },{
        timestamps:false,
        tableName:"chitiettienich"
    }
    );
}