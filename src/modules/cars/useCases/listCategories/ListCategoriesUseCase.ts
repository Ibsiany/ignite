import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRespository: ICategoriesRepository
    ){}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRespository.list()

        return categories;
    }
}

export {ListCategoriesUseCase}