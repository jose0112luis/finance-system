import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // TO-DO:
  // relación *-1 con User
  // relación *-1 con TypeAccount
  // relación 1-* con Movement[]
}
