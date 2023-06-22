import { CarsRepositoryMock } from "@modules/cars/infra/mock/CarsRepositoryMock"
import { ListCarsUseCase } from "./ListCarsUseCase"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CreateCarUseCase } from "../createCar/CreateCarUseCase"

let carsRepositoryMock: ICarsRepository
let listCarsUseCase: ListCarsUseCase
let createCarUseCase: CreateCarUseCase

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock()
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock)
    listCarsUseCase = new ListCarsUseCase(carsRepositoryMock)
  })

  it("should be able to list all available cars", async () => {
    await createCarUseCase.execute({
      name: "i30",
      description: "i30 Hatchback 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1235",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    await createCarUseCase.execute({
      name: "Elantra",
      description: "Elantra sedan 4 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1236",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars.length).toBe(2)
  })

  it("should be able to list all available cars by name", async () => {
    await createCarUseCase.execute({
      name: "i30",
      description: "i30 Hatchback 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1235",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    await createCarUseCase.execute({
      name: "Elantra",
      description: "Elantra sedan 4 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1236",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    const cars = await listCarsUseCase.execute({ name: "Elantra" })

    expect(cars.length).toBe(1)
    expect(cars[0].name).toBe("Elantra")
  })

  it("should be able to list all available cars by maker", async () => {
    await createCarUseCase.execute({
      name: "i30",
      description: "i30 Hatchback 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1235",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    await createCarUseCase.execute({
      name: "Parati",
      description: "Parati wagon 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1236",
      fine_amount: 20.00,
      maker: "Volkswagen",
      category_id: "abcde"
    })
    const cars = await listCarsUseCase.execute({ maker: "Volkswagen" })

    expect(cars.length).toBe(1)
    expect(cars[0].maker).toBe("Volkswagen")
  })

  it("should be able to list all available cars by category", async () => {
    await createCarUseCase.execute({
      name: "i30",
      description: "i30 Hatchback 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1235",
      fine_amount: 20.00,
      maker: "Hyundai",
      category_id: "abcde"
    })

    await createCarUseCase.execute({
      name: "Jazz",
      description: "Jazz hatch 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1236",
      fine_amount: 20.00,
      maker: "Honda",
      category_id: "abcde"
    })

    await createCarUseCase.execute({
      name: "Parati",
      description: "Parati wagon 5 doors",
      daily_rate: 70.00,
      license_plate: "ABC-1237",
      fine_amount: 20.00,
      maker: "Volkswagen",
      category_id: "abcdf"
    })
    const cars = await listCarsUseCase.execute({ category_id: "abcde" })

    expect(cars.length).toBe(2)
    expect(cars[0].category_id).toBe("abcde")
  })
})