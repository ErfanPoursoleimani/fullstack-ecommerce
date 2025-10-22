import { DataTypes, Model, Sequelize } from 'sequelize';

// Initialize Sequelize connection
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to console.log to see SQL queries
});

// Define the TempPayment model
class TempPayment extends Model {
  public id!: number;
  public authority!: string;
  public userId!: number;
  public items!: any[];
  public finalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

TempPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authority: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the User table
        key: 'id',
      },
    },
    items: {
      type: DataTypes.JSON, // MySQL JSON column
      allowNull: false,
    },
    finalPrice: {
      type: DataTypes.DECIMAL(10, 2), // Adjust precision as needed
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'temp_payments',
    timestamps: true, // Automatically adds createdAt and updatedAt
    indexes: [
      {
        unique: true,
        fields: ['authority'],
      },
    ],
  }
);

// Optional: Set up association with User model
// TempPayment.belongsTo(User, { foreignKey: 'userId' });

export default TempPayment;