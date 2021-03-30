import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface rolesAttributes {
    id: number;
    name_roles: string;
    Description: string;
   
}
 interface rolesModel extends Model<rolesAttributes>, rolesAttributes {}
 class Role extends Model<rolesModel, rolesAttributes> {}

 type RoleStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): rolesModel;
};

export function roles (sequelize: Sequelize): RoleStatic {
    return <RoleStatic>sequelize.define("roles", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
          },
          name_roles:{
            type:DataType.STRING(50)
          },
          Description:DataType.STRING
    },{
        timestamps:false
    }
    );
}