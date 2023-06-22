import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }, 
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    // rocketseat-rentx
    const token = sign({}, "d2a93af0b18a43afdb7f3c1959d7eb25", {
      subject: user.id, 
      expiresIn: "1d"
    })

    return { user, token }
  }
}

export { AuthenticateUserUseCase }