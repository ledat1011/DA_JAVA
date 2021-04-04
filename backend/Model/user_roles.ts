import { BuildOptions, DataTypes as DataType , Model, Sequelize } from "sequelize";

 interface typepostAttributes {
    user_id: number;
    role_id:number,
  
   
}
 interface typepostModel extends Model<typepostAttributes>, typepostAttributes {}
 class User_roles extends Model<typepostModel, typepostAttributes> {}

 type user_rolesStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): typepostModel;
};

export function user_roles (sequelize: Sequelize): user_rolesStatic {
    return <user_rolesStatic>sequelize.define("user_roles", {
       role_id: {
        type:DataType.NUMBER,
        allowNull:false
       },
       user_id: {
        type:DataType.NUMBER,
        allowNull:false
       },
       
      
        
    },{
        timestamps:false,
        tableName:"user_roles",
        

    }
    );
}
