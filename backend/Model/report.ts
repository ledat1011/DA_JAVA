import { BuildOptions, DataTypes as DataType , DataTypes, Model, Sequelize } from "sequelize";

 interface reportAttributes {
    id: number;
    idUser: number;
    idPost: number;
    level:string;
    content_report:string;
    create_at:Date
    
}
 interface reportModel extends Model<reportAttributes>, reportAttributes {}
 class Report extends Model<reportModel, reportAttributes> {}

 type reportStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): reportModel;
};

export function report (sequelize: Sequelize): reportStatic {
    return <reportStatic>sequelize.define("report", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          idPost:{
            type:DataType.NUMBER,
            allowNull:false,
            
          },
          idUser:{
              
           type: DataType.NUMBER,
           allowNull:false
        },
        content_report:{
            type:DataTypes.STRING,
           
        },
        level: DataTypes.STRING,
        create_at: DataType.DATE
        
    },{
        timestamps:false,
        tableName:"report"
    }
    );
}