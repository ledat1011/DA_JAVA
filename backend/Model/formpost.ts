import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface formpostAttributes {
    id: number;
    name:string,
  
   
}
 interface formpostModel extends Model<formpostAttributes>, formpostAttributes {}
 class Tienich extends Model<formpostModel, formpostAttributes> {}

 type formpostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): formpostModel;
};

export function formpost (sequelize: Sequelize): formpostStatic {
    return <formpostStatic>sequelize.define("formpost", {
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
        tableName:"formpost"
    }
    );
}