import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { pick } from 'underscore';
import { ActivityType, PublicActivity, Uuid } from '../types';
import { UserModel } from './UserModel';

@Entity('Activities')
@Index('sliding_leaderboard_index', ['timestamp', 'pointsEarned'], { where: '"pointsEarned" > 0' })
export class ActivityModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: Uuid;

  @ManyToOne((type) => UserModel, (user) => user.activities, { nullable: false })
  @JoinColumn({ name: 'user' })
  @Index('public_activities_by_user_index', { where: 'public IS true' })
  user: UserModel;

  @Column('varchar')
  type: ActivityType;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: 0 })
  pointsEarned: number;

  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP(6)' })
  timestamp: Date;

  @Column()
  public: boolean;

  public getPublicActivity(): PublicActivity {
    return pick(this, [
      'type',
      'description',
      'pointsEarned',
      'timestamp',
    ]);
  }
}
