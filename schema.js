import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';

import Db from './db';
const Department = new GraphQLObjectType({
  name: 'Department',
  description: ' Terranova department',
  fields() {
    return{
      address:{
        type: GraphQLString,
        resolve(department){
          return department.address;
        }
      },
      email:{
        type:GraphQLString,
        resolve(department){
          return department.email;
        }
      },
      phonenumber:{
        type:GraphQLString,
        resolve(department){
          return department.phonenumber;
        }
      },
      director:{
        type:Director,
        resolve(department){
          return department.getDirector();
        }
      },
      orderers:{
        type: new GraphQLList(Orderer),
        resolve(department){
          return department.getOrderers();
        }
      }
    };
  }
});

const Orderer = new GraphQLObjectType({
  name: 'Orderer',
  description: 'Orderer information',
  fields(){
    return{
      pib:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.pib;
        }
      },
      company_name:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.company_name;
        }
      },
      phone_number:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.phone_number;
        }
      },
      passport_data:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.passport_data;
        }
      },
      email:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.email;
        }
      },
      address:{
        type:GraphQLString,
        resolve(orderer){
          return orderer.address;
        }
      },
      department:{
        type:Department,
        resolve(orderer){
          return orderer.getDepartment();
        }
      },
      user:{
        type:Users,
        resolve(orderer){
          return orderer.getUser();
        }
      },
      orders:{
        type: new GraphQLList(_Orders),
        resolve(orderer){
          return orderer.getOrders();
        }
      }
    };
  }
});
const _Orders = new GraphQLObjectType({
  name: 'Orders',
  description: 'Orders from Orderer',
  fields(){
    return{
      hours:{
        type: GraphQLInt,
        resolve(orders){
          return orders.hours;
        }
      },
      objects:{
        type: GraphQLInt,
        resolve(orders){
          return orders.objects;
        }
      },
      workers:{
        type:GraphQLInt,
        resolve(orders){
          return orders.workers;
        }
      },
      salary:{
        type:GraphQLInt, //???
        resolve(orders){
          return orders.salary;
        }
      },
      orderer:{
        type:Orderer,
        resolve(orders){
          return orders.getOrderer();
        }
      },
      objects:{
        type: new GraphQLList(Objects),
        resolve(orders){
          return orders.getObjects();
        }
      }
    };
  }
});

const Director = new GraphQLObjectType({
  name: 'Director',
  description: 'Director of department',
  fields(){
    return{
      pib:{
        type:GraphQLString,
        resolve(director){
          return director.pib;
        }
      },
      address:{
        type:GraphQLString,
        resolve(director){
          return director.address;
        }
      },
      marital_status:{
        type:GraphQLString,
        resolve(director){
          return director.marital_status;
        }
      },
      work_experience:{
        type:GraphQLInt, //???
        resolve(director){
          return director.work_experience;
        }
      },
      department:{
        type:Department,
        resolve(director){
          return director.getDepartment();
        }
      },
      user:{
        type:Users,
        resolve(director){
          return director.getUser();
        }
      }
    };
  }
});

const Architectors = new GraphQLObjectType({
  name:'Architectors',
  description: ' Architectors for orders',
  fields(){
    return{
      pib:{
        type:GraphQLString,
        resolve(architectors){
          return architectors.pib;
        }
      },
      hours:{
        type:GraphQLInt,
        resolve(architectors){
          return architectors.hours;
        }
      },
      work_experience:{
        type:GraphQLInt,
        resolve(architectors){
          return architectors.work_experience;
        }
      },
      email:{
        type:GraphQLString,
        resolve(architectors){
          return architectors.email;
        }
      },
      phone_number:{
        type:GraphQLString,
        resolve(architectors){
          return architectors.phone_number;
        }
      },
      user:{
        type:Users,
        resolve(architectors){
          return architectors.getUser();
        }
      },
      objects:{
        type: new GraphQLList(Objects),
        resolve(architectors){
          return architectors.getObjects();
        }
      }
    };
  }
});

const Users = new GraphQLObjectType({
  name:'Users',
  description: 'Users information',
  fields(){
    return{
      login:{
        type:GraphQLString,
        resolve(users){
          return users.login;
        }
      },
      password:{
        type:GraphQLString,
        resolve(users){
          return users.password;
        }
      },
      role:{
        type:GraphQLString,
        resolve(users){
          return users.role;
        }
      },
      enabled:{
        type:GraphQLBoolean,
        resolve(users){
          return users.enabled;
        }
      },
      architector:{
        type:Architectors,
        return(users){
          return users.getArchitector();
        }
      },
      director:{
        type:Director,
        return(users){
          return users.getDirector();
        }
      },
      orderer:{
        type:Orderer,
        return(users){
          return users.getOrderer();
        }
      }
    };
  }
});
const Objects = new GraphQLObjectType({
  name:'Objects',
  description: ' Objects for orders',
  fields(){
    return{
      status:{
        type:GraphQLBoolean,
        resolve(objects){
          return objects.status;
        }
      },
      detalisation:{
        type:GraphQLInt,
        resolve(objects){
          return objects.detalisation;
        }
      },
      software:{
        type:GraphQLString,
        resolve(objects){
          return objects.software;
        }
      },
      hours:{
        type:GraphQLInt,
        resolve(objects){
          return objects.hours;
        }
      },
      architector:{
        type:Architectors,
        resolve(objects){
          return objects.getArchitector();
        }
      },
      orders:{
        type: new GraphQLList(_Orders),
        resolve(objects){
          return objects.getOrders();
        }
      }
    };
  }
});
const Orders_has_Objects = new GraphQLObjectType({
  name:'Orders_has_Objects',
  description:'Orders-objects many-to-many table',
  fields(){
    return{
      start_date:{
        type:GraphQLString, //????
        resolve(orders_has_objects){
          return orders_has_objects.start_date;
        }
      },
      end_date:{
        type:GraphQLString, //????
        resolve(orders_has_objects){
          return orders_has_objects.end_date;
        }
      },
      determination:{
        type:GraphQLBoolean,
        resolve(orders_has_objects){
          return orders_has_objects.determination;
        }
      }
    };
  }
});
// const Post = new GraphQLObjectType({
//   name: 'Post',
//   description: 'Blog post',
//   fields () {
//     return {
//       title: {
//         type: GraphQLString,
//         resolve (post) {
//           return post.title;
//         }
//       },
//       content: {
//         type: GraphQLString,
//         resolve (post) {
//           return post.content;
//         }
//       },
//       person: {
//         type: Person,
//         resolve (post) {
//           return post.getPerson();
//         }
//       }
//     };
//   }
// });
//
// const Person = new GraphQLObjectType({
//   name: 'Person',
//   description: 'This represents a Person',
//   fields: () => {
//     return {
//       id: {
//         type: GraphQLInt,
//         resolve (person) {
//           return person.id;
//         }
//       },
//       firstName: {
//         type: GraphQLString,
//         resolve (person) {
//           return person.firstName;
//         }
//       },
//       lastName: {
//         type: GraphQLString,
//         resolve (person) {
//           return person.lastName;
//         }
//       },
//       email: {
//         type: GraphQLString,
//         resolve (person) {
//           return person.email;
//         }
//       },
//       posts: {
//         type: new GraphQLList(Post),
//         resolve (person) {
//           return person.getPosts();
//         }
// //       }
// //     };
// //   }
// // });
//
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      department: {
        type: new GraphQLList(Department),
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve (root, args) {
          return Db.models.department.findAll({ where: args });
        }
      },
      users: {
        type: new GraphQLList(Users),
        resolve (root, args) {
          return Db.models.users.findAll({ where: args });
        }
      }
    };
  }
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutations',
//   description: 'Functions to set stuff',
//   fields () {
//     return {
//       addPerson: {
//         type: Person,
//         args: {
//           firstName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           lastName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           email: {
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve (source, args) {
//           return Db.models.person.create({
//             firstName: args.firstName,
//             lastName: args.lastName,
//             email: args.email.toLowerCase()
//           });
//         }
//       }
//     };
//   }
// });

const Schema = new GraphQLSchema({
  query: Query
  // mutation: Mutation
});

export default Schema;
//.\node_modules\.bin\babel-node server.js
