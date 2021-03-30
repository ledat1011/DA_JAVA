import { BuildOptions, DataTypes as DataType , DataTypes, Model, Sequelize } from "sequelize";

 interface mailAttributes {
    id: number;
    gmail: string;
    pass: string;
    using:boolean
   
}
 interface loaidangnhapModel extends Model<mailAttributes>, mailAttributes {}
 class Mail extends Model<loaidangnhapModel, mailAttributes> {}

 type mailStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): loaidangnhapModel;
};

export function mail (sequelize: Sequelize): mailStatic {
    return <mailStatic>sequelize.define("mail", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          gmail:{
              type:DataTypes.STRING,
              allowNull:false
          },
          pass:{
            type:DataTypes.STRING,
            allowNull:false
          },
          using:{
            type:DataTypes.BOOLEAN,
            allowNull:false
          }
    },{
        timestamps:false,
        tableName:"mail"
    }
    );
}