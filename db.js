import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
const Conn = new Sequelize(
  'terranove',
  'root',
  'root',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
);
const Department = Conn.define('department',{
    address:{
      type:Sequelize.STRING,
      allowNull: false
    },
    email:{
      type:Sequelize.STRING,
      allowNull:true
    },
    phonenumber:{
      type:Sequelize.STRING,
      allowNull:true
    }
});

const Orderer = Conn.define('Orderer',{
  pib:{
    type:Sequelize.STRING,
    allowNull: false
  },
  company_name:{
    type: Sequelize.STRING,
    allowNull: true
  },
  phone_number:{
    type: Sequelize.STRING,
    allowNull: true
  },
  passport_data:{
    type: Sequelize.STRING,
    allowNull: true
  },
  email:{
    type: Sequelize.STRING,
    allowNull:true
  },
  address:{
    type:Sequelize.STRING,
    allowNull: true
  }
});
const Director = Conn.define('director',{
  pib:{
    type:Sequelize.STRING,
    allowNull: false
  },
  address:{
    type:Sequelize.STRING,
    allowNull: true
  },
  marital_status:{
    type:Sequelize.STRING,
    allowNull: true
  },
  work_experience:{
    type:Sequelize.INTEGER,
    allowNull: true
  }
});

 const Architectors = Conn.define('architectors', {
   pib:{
     type:Sequelize.STRING,
     allowNull: false
   },
   hours:{
     type:Sequelize.INTEGER,
     allowNull: false
   },
   work_experience:{
     type:Sequelize.INTEGER,
     allowNull: true
   },
   email:{
     type:Sequelize.STRING,
     allowNull: true
   },
   phone_number:{
     type:Sequelize.STRING,
     allowNull: false
   }
 });

 const Users = Conn.define('users',{
   login:{
     type:Sequelize.STRING,
     allowNull: false
   },
   password:{
     type:Sequelize.STRING,
     allowNull: false
   },
   role:{
     type:Sequelize.STRING,
     allowNull: false
   },
   enabled:{
     type:Sequelize.BOOLEAN,
     allowNull: true
   }
 });

 const Orders = Conn.define('orders',{
   hours:{
     type:Sequelize.INTEGER,
     allowNull: false
   },
   objects_number:{
     type:Sequelize.INTEGER,
     allowNull: false
   },
   workers:{
     type:Sequelize.INTEGER,
     allowNull: true
   },
   salary:{
     type:Sequelize.INTEGER,
     allowNull: true
   }
 });

 const Orders_has_Objects = Conn.define('orders_has_objects',{
   start_date:{
     type:Sequelize.DATE, //DATE??
     allowNull: false
   },
   end_date:{
     type:Sequelize.DATE, //DATE??
     allowNull:true
   },
   determination:{
     type: Sequelize.BOOLEAN, // BOOLEAN??
     allowNull:true
   }
 });

 const Objects = Conn.define('objects',{
   status:{
     type:Sequelize.BOOLEAN, //BOOLEAN??
     allowNull:false
   },
   detalisation:{
     type:Sequelize.INTEGER,
     allowNull:false
   },
   software:{
     type:Sequelize.STRING,
     allowNull:true
   },
   hours:{
     type:Sequelize.INTEGER,
     allowNull:true
   }
 });
// const Person = Conn.define('person', {
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING,
//     allowNull: true
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true
//     }
//   }
// });
//
// const Post = Conn.define('post', {
//   title: {
//     type: Sequelize.STRING,
//     allowNull:false
//   },
//   content: {
//     type: Sequelize.STRING,
//     allowNull:false
//   }
// });

// Person.hasMany(Post);
// Post.belongsTo(Person);
Director.hasOne(Department);
Department.belongsTo(Director);
Orderer.hasOne(Department);
Department.belongsTo(Orderer);
Orderer.hasOne(Users);
Users.belongsTo(Orderer);
Architectors.hasOne(Users);
Users.belongsTo(Architectors);
Director.hasOne(Users);
Users.belongsTo(Director);
Objects.hasOne(Architectors);
Objects.belongsToMany(Orders, {through: Orders_has_Objects});//????
Orders.belongsToMany(Objects, {through: Orders_has_Objects});
Orders.hasOne(Orderer);
Orderer.belongsTo(Orders);

Conn.sync({force:true}).then(()=>{
  _.times(10, ()=>{
    return Director.create({
      pib: Faker.name.lastName(),
      address: Faker.address.city()
    }).then(director =>{
       return director.createUser({
         login:Faker.internet.email(),
         password:Faker.internet.password(),
         role: 'director'
       });
    });
  });
});

export default Conn;
