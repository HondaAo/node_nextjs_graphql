import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        database: "lireddit12-test",
        username: "postgres",
        password: "postgres",
        host: 'localhost',
        port: 5432,
        dropSchema: drop,
        synchronize: drop,
        entities: [ __dirname + "../entity/*.*"]
    })
}