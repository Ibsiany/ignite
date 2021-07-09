import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../../../modules/accounts/repositories/IUsersTokensRepository';
import { IUsersRepository } from '../../../../modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ){}
    async execute({token, password}:IRequest): Promise<void>{
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)

        if(!userToken){
            throw new AppError("Token invalid!")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError("Token expired!")
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        const salt = bcrypt.genSaltSync(8); 

        user.password = await bcrypt.hashSync(password, salt);

        await this.usersRepository.create(user)

        await this.usersTokensRepository.deleteById(userToken.id)
    }
}

export {ResetPasswordUserUseCase}