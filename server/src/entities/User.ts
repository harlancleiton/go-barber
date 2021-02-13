import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @Column({ unique: true, length: 70 })
  email: string;

  @Column({ unique: true, length: 254 })
  password: string;

  @Column({ unique: true, nullable: true })
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
