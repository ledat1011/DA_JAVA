import { BuildOptions, DataTypes , Model, Sequelize } from "sequelize";

interface postAttributes {
  id: number;
  idProvince: number;
      idDistrict:number;
      idWard: number;
      idStreet:number;
      numberAddress: string;

      price: number;
      minPrice:number;
      maxPrice:number;
      selectedRuleParty:string;
      selectedRuleSmoke:string;
      selectedRulePet:string;
      addRule:string;
      introduction:string;
      title:string;
      idTypePost:number;
      idFormPost:number;
      roomNumber:number;
      bathroomNuber:number;
      kitchenNumber:number;
      avatar: string;


      idDoiTuong:number;
      Dientich:number;
      soLuongTruyCap:number;
      status:boolean;
      tienDatCoc:number;
      TrangThaiDatCoc:boolean;
      Created_at:Date;
      Update_at: Date;
      DiaChi:string,
      IdUser:number,
      confirm:boolean,
      lat:number,
      lng:number
      
}
interface postsModel extends Model<postAttributes>, postAttributes { }
class Post extends Model<postsModel, postAttributes> { }

type postStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): postsModel;
};

export function posts(sequelize: Sequelize): postStatic {
  return <postStatic>sequelize.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      idProvince: DataTypes.INTEGER,
      idDistrict: DataTypes.INTEGER,
      idWard: DataTypes.INTEGER,
      idStreet:DataTypes.INTEGER,
      price: DataTypes.DECIMAL(18,0),
      minPrice:DataTypes.DECIMAL(18,0),
      maxPrice:DataTypes.DECIMAL(18,0),
      selectedRuleParty:DataTypes.STRING,
      selectedRuleSmoke:DataTypes.STRING,
      selectedRulePet:DataTypes.STRING,
      addRule:DataTypes.STRING,
      introduction:DataTypes.STRING,
      title:DataTypes.STRING,
      idTypePost:{
        allowNull:false,
        type:DataTypes.INTEGER
      },
      idFormPost:{
        allowNull:false,
        type:DataTypes.INTEGER
      },
      avatar: DataTypes.STRING,
      roomNumber:DataTypes.INTEGER,
      bathroomNuber:DataTypes.INTEGER,
      kitchenNumber:DataTypes.INTEGER,
      idDoiTuong:DataTypes.INTEGER,
      Dientich:DataTypes.INTEGER,
      soLuongTruyCap:DataTypes.INTEGER,
      //for admin
      status:DataTypes.BOOLEAN,
      tienDatCoc:DataTypes.INTEGER,
      TrangThaiDatCoc:DataTypes.BOOLEAN,
      IdUser:DataTypes.INTEGER,
 
      DiaChi:DataTypes.STRING,

      //for user
      confirm:DataTypes.BOOLEAN,
      numberAddress:DataTypes.STRING,
      Created_at:DataTypes.DATE,
      Update_at:{
          type:DataTypes.DATE,
          defaultValue:DataTypes.NOW
      },
      lat:DataTypes.DOUBLE,
      lng:DataTypes.DOUBLE
  }, {
    timestamps: false
  }
  );
}