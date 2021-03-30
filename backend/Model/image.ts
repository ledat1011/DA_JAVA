import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface imageAttributes {
    id: number;
    IdPost: number;
    img: string
   
}
 interface imageModel extends Model<imageAttributes>, imageAttributes {}
 class Image extends Model<imageModel, imageAttributes> {}

 type imagethuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): imageModel;
};

export function image (sequelize: Sequelize): imagethuStatic {
    return <imagethuStatic>sequelize.define("image", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
        
          IdPost:{
              
           type: DataType.NUMBER,
           allowNull:false
        },
        img: DataType.STRING
        
    },{
        timestamps:false,
        tableName:"image"
    }
    );
}