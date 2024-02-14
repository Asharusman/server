module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",{
        firstName:DataTypes.STRING,
        lastName:DataTypes.STRING,
        password:DataTypes.STRING,
        email:DataTypes.STRING,
        profilePic:DataTypes.STRING,
        mobileNumber:DataTypes.STRING,
        dateOfBirth:DataTypes.STRING,
        gender:DataTypes.STRING,
        height:DataTypes.STRING,
        weight:DataTypes.STRING
    })
    return User
}