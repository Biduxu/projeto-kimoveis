import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import RealEstate from './realEstate.entity'

@Entity('categories')
class Category {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ unique: true })
    name: string

    @OneToMany(() => RealEstate, realEstate => realEstate.category)
    realEstate: RealEstate[]

}

export default Category