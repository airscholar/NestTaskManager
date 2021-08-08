import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: 'OPEN' })
  status: TaskStatus;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  ALL = 'ALL',
}
