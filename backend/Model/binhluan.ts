import { BuildOptions, DataTypes as DataType, DataTypes, Model, Sequelize } from "sequelize";
import {User,Post} from "../database"
interface binhluanAttributes {
  id: number;
  NoiDung:string;
  idUser:number,
  idPost:number,
  Created_at:Date,
  Update_at:Date

}
interface binhluanModel extends Model<binhluanAttributes>, binhluanAttributes { }
class BinhLuan extends Model<binhluanModel, binhluanAttributes> { }

type binhluanStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): binhluanModel;
};

export function binhluan(sequelize: Sequelize): binhluanStatic {
  return <binhluanStatic>sequelize.define("binhluan", {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      idPost:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: Post,
          key:"id"
        }
      },

      idUser:{
          type:DataTypes.NUMBER,
          allowNull:false,
          references:{
            model: User,
            key:"id"
          }
      },
      NoiDung:{
        type:DataType.STRING
      },
      Update_at:{
        type: DataType.DATE,
        defaultValue:DataType.NOW
      },
      Created_at:{
        type:DataType.DATE
      }
      
  }, {
    timestamps: false,
    tableName:'binhluan'
  }
  );
}