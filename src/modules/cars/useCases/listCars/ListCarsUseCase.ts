import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsRepository, IListCars } from "@modules/cars/repositories/ICarsRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository:ICarsRepository
  ) {}

  async execute({ category_id, maker, name }: IListCars): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({ category_id, maker, name })
    return cars
  }
}

export { ListCarsUseCase }