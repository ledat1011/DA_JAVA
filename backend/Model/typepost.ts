import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface typepostAttributes {
    id: number;
    name:string,
  
   
}
 interface typepostModel extends Model<typepostAttributes>, typepostAttributes {}
 class Tienich extends Model<typepostModel, typepostAttributes> {}

 type typepostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): typepostModel;
};

export function typepost (sequelize: Sequelize): typepostStatic {
    return <typepostStatic>sequelize.define("typepost", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
        
          name: DataType.STRING,
      
        
    },{
        timestamps:false,
        tableName:"typepost"
    }
    );
}