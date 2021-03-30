import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface projectAttributes {
    id: number;
    _name: string;
    _province_id:number;
    _district_id:number;
    _lat:number;
    _lng:number
   
}
 interface projectModel extends Model<projectAttributes>, projectAttributes {}
 class Project extends Model<projectModel, projectAttributes> {}

 type projectStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): projectModel;
};

export function project (sequelize: Sequelize): projectStatic {
    return <projectStatic>sequelize.define("project", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
    
         _district_id: DataType.INTEGER,
         _province_id:DataType.INTEGER,
         _lat: DataType.FLOAT,
         _lng:DataType.FLOAT,
         _name:DataType.STRING

        
    },{
        timestamps:false,
        tableName:"project"
    }
    );
}