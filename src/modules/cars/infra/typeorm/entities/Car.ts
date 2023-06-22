import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { Category } from "./Category"

@Entity("cars")
class Car {
  @PrimaryColumn({type: "uuid"})
  id: string

  @Column({type: "text"})
  name: string

  @Column({type: "text"})
  description: string

  @Column({type: "numeric"})
  daily_rate: number
  
  @Column({type: "boolean", default: true})
  available: boolean
  
  @Column({type: "text"})
  license_plate: string
  
  @Column({type: "numeric"})
  fine_amount: number
  
  @Column({type: "text"})
  maker: string
  
  @Column({type: "text"})
  category_id: string
  
  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category

  constructor() {
    if (!this.id)
      this.id = uuidv4()
  }
}

export { Car }