import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface savepostAttributes {
    id: number;
    IdUser: number,
    IdPost: number
   
}
 interface saveposthModel extends Model<savepostAttributes>, savepostAttributes {}
 class Savepost extends Model<saveposthModel, savepostAttributes> {}

 type savepostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): saveposthModel;
};

export function savepost (sequelize: Sequelize): savepostStatic {
    return <savepostStatic>sequelize.define("savepost", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
    
          IdPost: {
              type:DataType.INTEGER,
              allowNull:false
          },
          IdUser:{
            type:DataType.INTEGER,
            allowNull:false
          }

        
    },{
        timestamps:false,
        tableName:"savepost"
    }
    );
}