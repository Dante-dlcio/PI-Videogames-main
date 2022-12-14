const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
    sequelize.define('genres',{
        id:{
            type: DataTypes.UUID,
            defaultValues: DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        apiId:{
            type: DataTypes.INTEGER,            
        },
        name:{
            type: DataTypes.STRING(255),
            allowNull:false,    
        },
        image:{
            type: DataTypes.STRING(255)
            
        },
        created:{
            type: DataTypes.STRING(255)
        }
        
    },{
        timestapms: false 
    })
}