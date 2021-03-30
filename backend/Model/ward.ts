import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface wardAttributes {
    id: number;
    _name: string;
    _prefix: string,
    _province_id: number
    _district_id:number
   
}
 interface provinceModel extends Model<wardAttributes>, wardAttributes {}
 class Province extends Model<provinceModel, wardAttributes> {}

 type provincethuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): provinceModel;
};

export function ward (sequelize: Sequelize): provincethuStatic {
    return <provincethuStatic>sequelize.define("ward", {
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
        _prefix: DataType.STRING,
        _province_id:DataType.INTEGER,
        _district_id:DataType.INTEGER
        
    },{
        timestamps:false,
        tableName:"ward"
    }
    );
}