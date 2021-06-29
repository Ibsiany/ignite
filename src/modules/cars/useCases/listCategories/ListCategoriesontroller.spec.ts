import {Connection} from 'typeorm';
import bcrypt from "bcryptjs";
import request from 'supertest';
import {v4 as uuidv4} from 'uuid';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

let connection:Connection;
describe('List categories', () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations()

        const id = uuidv4();
        const salt = bcrypt.genSaltSync(8); 
        const password = bcrypt.hashSync("admin", salt);
    
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXX')
            `
        );
    })
    
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close()
    })
    
    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@admin.com.br",
                password: "admin",
            })

        const {refresh_token} = responseToken.body;

        await request(app)
        .post("/categories")
        .send({
          name: "Category Supertest",
          description: "Category Supertest",
        })
        .set({
          Authorization: `Bearer ${refresh_token}`,
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");

    })
})