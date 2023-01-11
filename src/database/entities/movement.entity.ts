import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // TO-DO:
  // relación *-1 con Account
  // relación *-1 con TypeMovement
}
