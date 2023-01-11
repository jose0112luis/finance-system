import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { TypeAccount } from './typeAccount.entity';
import { Movement } from './movement.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'account_number',
    length: 50,
    unique: true,
  })
  accountNumber: string;

  @Column({ type: 'numeric', name: 'account_balance' })
  accountBalance: number;

  @Column({ type: 'boolean' })
  state: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  // relación *-1 con User
  @ManyToOne(() => User, (user) => user.accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // relación *-1 con TypeAccount
  @ManyToOne(() => TypeAccount, (typeAccount) => typeAccount.accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  typeAccount: TypeAccount;

  // relación 1-* con Movement[]
  @OneToMany(() => Movement, (movement) => movement.account)
  movements: Movement[];
}
