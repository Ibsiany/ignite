import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcryptjs"
import createConnection from '../index'

async function create(){
    const connection = await createConnection("localhost")

    const id = uuidv4();
    const salt = bcrypt.genSaltSync(8); 
    const password = bcrypt.hashSync("admin", salt);
    
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXX')
        `
    );
    
    await connection.close;
}
create().then(() => console.log('User admin created!'))