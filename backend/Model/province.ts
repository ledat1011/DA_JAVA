import { BuildOptions, DataTypes as DataType , DataTypes, Model, Sequelize } from "sequelize";

 interface provinceAttributes {
    id: number;
    _name: string;
    _code: string;
    _hot: boolean;
    _image:string
   
}
 interface provinceModel extends Model<provinceAttributes>, provinceAttributes {}
 class Province extends Model<provinceModel, provinceAttributes> {}

 type provincethuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): provinceModel;
};

export function province (sequelize: Sequelize): provincethuStatic {
    return <provincethuStatic>sequelize.define("province", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
        
          _name:{
              
           type: DataType.STRING,
           allowNull:false
        },
        _code: DataType.STRING,
        _hot:DataTypes.BOOLEAN,
        _image: DataTypes.STRING
        
    },{
        timestamps:false,
        tableName:"province"
    }
    );
}