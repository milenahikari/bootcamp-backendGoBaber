import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments') // Decorator
class Appointment {
  @PrimaryGeneratedColumn('uuid') // gera IDs dinamicos
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Relacionamento do agendamento com o usuario
  @JoinColumn({ name: 'provider_id' }) // Relaciona a coluna provider_id com o id do usuario
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
