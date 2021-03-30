import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface tienichAttributes {
    id: number;
    idLoaiTienIch:number,
    TenTienIch:string,
  
   
}
 interface tienichoModel extends Model<tienichAttributes>, tienichAttributes {}
 class Tienich extends Model<tienichoModel, tienichAttributes> {}

 type tienichStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): tienichoModel;
};

export function tienich (sequelize: Sequelize): tienichStatic {
    return <tienichStatic>sequelize.define("tienich", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          idLoaiTienIch:{
              type:DataType.INTEGER,
              allowNull:false
          },
          TenTienIch: DataType.STRING,
      
        
    },{
        timestamps:false,
        tableName:"tienich"
    }
    );
}