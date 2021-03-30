import { BuildOptions, DataTypes as DataType , DataTypes, Model, Sequelize } from "sequelize";

 interface doanhthuAttributes {
    id: number;
    idUser: number;
    Money: number;
    NgayNap:Date,
    Ngay:number;
    Thang:number;
    Nam:number;
   
}
 interface doanhthuModel extends Model<doanhthuAttributes>, doanhthuAttributes {}
 class Doanhthu extends Model<doanhthuModel, doanhthuAttributes> {}

 type doanhthuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): doanhthuModel;
};

export function doanhthu (sequelize: Sequelize): doanhthuStatic {
    const currentDate = new Date();
    return <doanhthuStatic>sequelize.define("doanhthu", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          Money:{
            type:DataType.DECIMAL,
           
          },
          idUser:{
              
           type: DataType.NUMBER,
           allowNull:false
        },
        NgayNap: DataType.DATE,
        Nam:{
            type:DataTypes.INTEGER,
            defaultValue:currentDate.getFullYear()
            
        },
        Thang:{
            type:DataTypes.INTEGER,
            defaultValue:currentDate.getMonth() +1
            
        },
        Ngay:{
            type:DataTypes.INTEGER,
            defaultValue:currentDate.getDate()
            
        }
        
    },{
        timestamps:false,
        tableName:"doanhthu"
    }
    );
}