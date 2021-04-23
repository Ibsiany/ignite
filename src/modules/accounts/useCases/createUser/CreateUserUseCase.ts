import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs"
import {AppError} from '@errors/AppError'
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({
        name, 
        email, 
        password, 
        driver_license
    }:ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("Users already exists!")
        }

        const salt = bcrypt.genSaltSync(8); 
        const hash = bcrypt.hashSync(password, salt);

        await this.usersRepository.create({
            name, 
            email, 
            password: hash, 
            driver_license
        })
    }
}

export {CreateUserUseCase}