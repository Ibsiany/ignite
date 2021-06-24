import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import {inject, injectable} from 'tsyringe';


interface IRequest {
    name:string;
    description:string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRespository: ICategoriesRepository){}

    async execute({description, name}: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRespository.findByName(name);
        if(categoryAlreadyExists){
            throw new AppError("Category already exists!");
        }

        this.categoriesRespository.create({name, description})
    }
}

export {CreateCategoryUseCase};