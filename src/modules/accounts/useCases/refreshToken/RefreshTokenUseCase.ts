import { inject, injectable } from 'tsyringe';
import {sign, verify} from 'jsonwebtoken';
import { IUsersTokensRepository } from '../../../../modules/accounts/repositories/IUsersTokensRepository';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from 'shared/container/providers/DateProvider/IDateProvider';

interface IPaylood {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase{
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute(token:string): Promise<ITokenResponse> {
        const {
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days
        } = auth
        const {email, sub} = verify(token, secret_refresh_token) as IPaylood;
        const user_id = sub;

        const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userTokens){
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userTokens.id);

        const refresh_token = sign({email}, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token
        })

        const expires_date = this.dateProvider.addDays(
            expires_refresh_token_days
        )

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        })

        return {
            token: newToken, 
            refresh_token
        };
    }
}

export {RefreshTokenUseCase}