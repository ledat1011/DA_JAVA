import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface danhgiaAttributes {
    id: number;
    idUser: number;
    idPost: number;
    rate:number
   
}
 interface danhgiaModel extends Model<danhgiaAttributes>, danhgiaAttributes {}
 class Danhgia extends Model<danhgiaModel, danhgiaAttributes> {}

 type danhgiaStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): danhgiaModel;
};

export function danhgia (sequelize: Sequelize): danhgiaStatic {
    return <danhgiaStatic>sequelize.define("danhgia", {
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
          idUser:{
              
           type: DataType.NUMBER,
           allowNull:false
        },
        rate: DataType.NUMBER
    },{
        timestamps:false,
        tableName:"danhgia"
    }
    );
}