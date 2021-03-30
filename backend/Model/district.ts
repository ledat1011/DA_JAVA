import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface provinceAttributes {
    id: number;
    _name: string;
    _prefix: string
    _province_id:number
   
}
 interface provinceModel extends Model<provinceAttributes>, provinceAttributes {}
 class Province extends Model<provinceModel, provinceAttributes> {}

 type provincethuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): provinceModel;
};

export function district (sequelize: Sequelize): provincethuStatic {
    return <provincethuStatic>sequelize.define("district", {
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
        _province_id:DataType.INTEGER
        
    },{
        timestamps:false,
        tableName:"district"
    }
    );
}