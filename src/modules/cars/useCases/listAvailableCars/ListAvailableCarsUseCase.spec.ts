import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listAvailableCars: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCars = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })
    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1", 
            description: "Car description", 
            daily_rate: 140, 
            license_plate: "ABC-1235", 
            fine_amount: 100, 
            brand: "Car_brand", 
            category_id: "category_id"
        });

        const cars = await listAvailableCars.execute({})

        expect(cars).toEqual([car])
    });

    it("should be able to list available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2", 
            description: "Car description", 
            daily_rate: 140, 
            license_plate: "ABC-1235", 
            fine_amount: 100, 
            brand: "Car_brand_test", 
            category_id: "category_id"
        });

        const cars = await listAvailableCars.execute({
            brand: "Car_brand",
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3", 
            description: "Car description", 
            daily_rate: 140, 
            license_plate: "ABC-1232", 
            fine_amount: 100, 
            brand: "Car_brand_test", 
            category_id: "category_id"
        });

        const cars = await listAvailableCars.execute({
            name: "Car3",
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3", 
            description: "Car description", 
            daily_rate: 140, 
            license_plate: "ABC-1232", 
            fine_amount: 100, 
            brand: "Car_brand_test", 
            category_id: "12345"
        });

        const cars = await listAvailableCars.execute({
            category_id: "12345",
        })

        expect(cars).toEqual([car])
    })    
})