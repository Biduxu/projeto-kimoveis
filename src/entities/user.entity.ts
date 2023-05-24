import { getRounds, hashSync } from 'bcryptjs'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'
import Schedule from './schedule.entity'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ length: 45 })
    name: string

    @Column({ length: 120, unique: true })
    email: string

    @Column({ default: false })
    admin: boolean

    @Column({ length: 120 })
    password: string

    @CreateDateColumn({ type: 'date' })
    createdAt: string 

    @UpdateDateColumn({ type: 'date' })
    updatedAt: string 

    @DeleteDateColumn({ nullable: true })
    deletedAt: string | null | undefined | Date

    @OneToMany(() => Schedule, schedulesUser => schedulesUser.user)
    schedules: Schedule[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isEncrypted = getRounds(this.password)

        if(!isEncrypted){
            this.password = hashSync(this.password, 10)
        }
    }

}

export default User