
import { BuildOptions, DataTypes as DataType, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  First_name: string;
  Email: string;
  Last_name: String,
  PhoneNumber: number,
  PassWord: string,
  Money: number,
  block: boolean,
  // Id_role: number,
  Id_LoaiDangNhap:number,
  ConfirmEmaiil:boolean
  Created_at: Date,
  Update_at: Date,
  
}
interface UserModel extends Model<UserAttributes>, UserAttributes { }
class User extends Model<UserModel, UserAttributes> { }

type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
};

export function users(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define("users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    First_name: {
      type: DataType.STRING(50)
    },
    Last_name: DataType.STRING(50),

    PhoneNumber: DataType.INTEGER,
    Email: DataType.STRING,
    Money: DataType.DECIMAL,
    block: DataType.BOOLEAN,
    // Id_role: DataType.INTEGER,
    PassWord:DataType.STRING,
    Id_LoaiDangNhap: DataType.INTEGER,
    ConfirmEmaiil: DataType.BOOLEAN,
    Created_at: {
      type: DataType.DATE,
    },
    Update_at: {
      type: DataType.DATE,
      defaultValue: DataType.NOW
    },
   
  }, {
    timestamps: false
  }
  );
}