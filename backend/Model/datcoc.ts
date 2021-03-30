import { BuildOptions, DataTypes as DataType , DataTypes, Model, Sequelize } from "sequelize";

 interface datcocAttributes {
    id: number;
    idUser: number;
    idPost: number;
    code:string;
    NgayXemPhong:Date
   
}
 interface datcocModel extends Model<datcocAttributes>, datcocAttributes {}
 class Datcoc extends Model<datcocModel, datcocAttributes> {}

 type datcocStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): datcocModel;
};

export function datcoc (sequelize: Sequelize): datcocStatic {
    return <datcocStatic>sequelize.define("datcoc", {
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
        code:{
            type:DataTypes.STRING,
            allowNull:false
        },
        NgayXemPhong: DataType.DATE
        
    },{
        timestamps:false,
        tableName:"datcoc"
    }
    );
}