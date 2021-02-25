import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated
} from 'typeorm';

import { IUserToken, UserTokenType } from '~/modules/users/domain';

import { User } from './User';

@Entity({ name: 'users_token' })
export class UserToken implements IUserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  token: string;

  @Column({ type: 'enum', enum: UserTokenType })
  type: UserTokenType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
