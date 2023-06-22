import { User } from "../typeorm/entities/User"
import { ICreateUserDTO, IUsersRepository } from "@modules/accounts/repositories/IUserRepository"

class UsersRepositoryMock implements IUsersRepository {
  users: User[] = []

  async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      driver_license, 
      email, 
      name, 
      password
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)

    return user
  }

}

export { UsersRepositoryMock }