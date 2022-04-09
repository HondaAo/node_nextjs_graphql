import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn"
import { Connection } from "typeorm";
import { User } from "../entities/User";

let conn: Connection;
beforeAll(async() => {
    conn = await testConn();
})

afterAll(() => {
    conn.close()
})

const registerMutation = `
mutation Register($data: UsernamePasswordInput!) {
    register(options: $data){
     errors {
       field
       message
     }
     user {
       username
       email
     }
   }
}
`

describe('Register', () => {
    it('create user', async() => {
      const user = {
          username: "aaa",
          email: "a@a.com",
          password: "test123"
      }
      const res = await gCall({
          source: registerMutation,
          variableValues: {
              data: {
                  username: user.username,
                  email: user.email,
                  password: user.password
              }
          }
      })

      console.log(res)
      expect(res).toMatchObject({
          data: {
              register: {
                  errors: null,
                  user: {                  
                   username: user.username,
                   email: user.email
                  }
              } 
          }
      })
      const dbUser = await User.findOne({ where: { email: user.email}})
      expect(dbUser).toBeDefined();
      expect(dbUser!.username).toBe(user.username)
    } )
})