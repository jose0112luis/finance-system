import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { TypeMovement } from './typeMovement.entity';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  amount: number;

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

  // relación *-1 con Account
  @ManyToOne(() => Account, (account) => account.movements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  // relación *-1 con TypeMovement
  @ManyToOne(() => TypeMovement, (typeMovement) => typeMovement.movements)
  @JoinColumn()
  typeMovement: TypeMovement;
}
