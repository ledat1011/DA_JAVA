import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface linkAttributes {
    id: number;
    URL: string
   
}
 interface linkModel extends Model<linkAttributes>, linkAttributes {}
 class Link extends Model<linkModel, linkAttributes> {}

 type linkthuStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): linkModel;
};

export function link (sequelize: Sequelize): linkthuStatic {
    return <linkthuStatic>sequelize.define("link", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
    
        URL: DataType.STRING
        
    },{
        timestamps:false,
        tableName:"link"
    }
    );
}