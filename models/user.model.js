const db = require('../database/mysql')
const queries = require('../database/mysql/queries/user')
const { createUser } = queries;

class UserModel {
  constructor(options) {
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.phonenumber = options.phonenumber;
    this.email = options.email;
    this.password = options.password;
    this.role = options.role;
    this.isverified = options.isverified;
  }


  async save(){
    try{
      const [user] = await db.execute(createUser, [
        this.firstname,
        thislastname,
        this.phonenumber,
        this.email,
        this.password,
        this.role,
        this.isverified
      ])
      return user
    }catch(error){
      console.log(error);
    }
  } 
}