import { ICarsRepository, IListCars } from "@modules/cars/repositories/ICarsRepository"
import { Car } from "../entities/Car"
import { Repository, getRepository } from "typeorm"
import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO"
import { FileWatcherEventKind } from "typescript"

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  
  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name, 
    description, 
    daily_rate, 
    fine_amount, 
    license_plate, 
    maker, 
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name, 
      description, 
      daily_rate, 
      fine_amount, 
      license_plate, 
      maker, 
      category_id
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    })

    return car
  }

  async findAvailable({ maker, category_id, name }: IListCars): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder("c")
      .where("c.available = :available", { available: true })

    if (maker)
      carsQuery.andWhere("c.maker = :maker", { maker })

    if (category_id)
      carsQuery.andWhere("c.category_id = :category_id", { category_id })

    if (name)
      carsQuery.andWhere("c.name = :name", { name })

    const cars = await carsQuery.getMany()

    return cars
  }

  /*
  My original version
  async findAvailable({ maker, category_id, name }: IListCars): Promise<Car[]> {
    let whereFilter = []

    whereFilter.push({ available: true })

    if (maker)
      whereFilter.push({ maker })

    if (category_id)
      whereFilter.push({ category_id })

    if (name)
      whereFilter.push({ name })

    const cars = await this.repository.find({
      where: whereFilter
    })

    return cars
  }
  */
}

export { CarsRepository }