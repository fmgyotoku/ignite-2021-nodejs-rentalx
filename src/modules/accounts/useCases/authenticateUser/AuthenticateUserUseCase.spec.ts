import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO"
import { UsersRepositoryMock } from "@modules/accounts/infra/mock/UsersRepositoryMock"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryMock: UsersRepositoryMock
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock)
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock)
  })

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123", 
      email: "user@test.com", 
      password: "1234",
      name: "Jane Citizen"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email, 
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it ("should not be able to authenticate a non existent user", () => {
    expect( async () => {
      await authenticateUserUseCase.execute({
        email: "jack@alltrades.com", 
        password: "abcde"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it ("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123", 
      email: "user@test.com", 
      password: "1234",
      name: "Jane Citizen"
    }

    await createUserUseCase.execute(user)

    expect( async () => {
      await authenticateUserUseCase.execute({
        email: "user@test.com", 
        password: "abcde"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})