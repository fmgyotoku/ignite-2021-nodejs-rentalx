import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO"
import { ICarsRepository, IListCars } from "@modules/cars/repositories/ICarsRepository"
import { Car } from "../typeorm/entities/Car"
import { v4 as uuidv4 } from "uuid"

class CarsRepositoryMock implements ICarsRepository {
  private cars:Car[] = []

  async create({ 
    name, description, daily_rate, license_plate, fine_amount, maker, category_id 
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    
    Object.assign(car, {
      id: uuidv4(), 
      name, 
      description, 
      daily_rate, 
      available: true, 
      license_plate, 
      fine_amount, 
      maker, 
      category_id, 
      created_at: new Date()
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate)

    return car
  }

  async findAvailable({ maker, category_id, name }: IListCars): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      let isValid = true
      if (car.available) {
        if (maker && car.maker !== maker)
          isValid = false

        if (category_id && car.category_id !== category_id)
          isValid = false

        if (name && car.name !== name)
          isValid = false

        if (isValid)
          return car
      }

      return null
    })

    return cars
  }
}

export { CarsRepositoryMock }