import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface replyAttributes {
    id: number;
    idBinhLuan: number,
    NoiDung:string,
    Created_at:Date,
    Update_at:Date
   
}
 interface replyModel extends Model<replyAttributes>, replyAttributes {}
 class Reply extends Model<replyModel, replyAttributes> {}

 type replyStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): replyModel;
};

export function reply (sequelize: Sequelize): replyStatic {
    return <replyStatic>sequelize.define("reply", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          idBinhLuan:{
              type:DataType.STRING,
              allowNull:false
          },
          NoiDung: DataType.STRING,
          Update_at:{
            type: DataType.DATE,
            defaultValue:DataType.NOW
          },
          Created_at:{
            type:DataType.DATE
          }
        
    },{
        timestamps:false,
        tableName:"reply"
    }
    );
}