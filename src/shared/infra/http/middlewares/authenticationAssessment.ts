import { AppError } from "@shared/errors/AppError"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export async function authenticationAssessment(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Missing token", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "d2a93af0b18a43afdb7f3c1959d7eb25") as IPayload
    
    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exist", 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch (err) {
    throw new AppError("Invalid token!", 401)
  }
}