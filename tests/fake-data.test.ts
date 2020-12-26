import { ActivityType } from '../types';
import { ActivityModel } from '../models/ActivityModel';
import { AttendanceModel } from '../models/AttendanceModel';
import { EventModel } from '../models/EventModel';
import { UserModel } from '../models/UserModel';
import { DatabaseConnection, UserFactory, EventFactory, MerchFactory, PortalState } from './data';
import { OrderModel } from '../models/OrderModel';

beforeAll(async () => {
  await DatabaseConnection.connect();
});

beforeEach(async () => {
  await DatabaseConnection.clear();
});

afterAll(async () => {
  await DatabaseConnection.clear();
  await DatabaseConnection.close();
});

class FakeAttendanceModel {
  eventUuid: string;
  userUuid: string;
  timestamp: Date;
  asStaff: boolean;

  constructor(event: EventModel, user: UserModel, timestamp: Date) {
    this.userUuid = user.uuid;
    this.eventUuid = event.uuid;
    this.timestamp = timestamp;
    this.asStaff = false;
  }
}

class FakeData {
  users: UserModel[];
  events: EventModel[];
  attendances: FakeAttendanceModel[] = [];

  constructor(numUsers: number, numEvents: number) {
    this.users = UserFactory.create(numUsers);
    this.events = EventFactory.create(numEvents);

    for (const event of this.events) {
      const attendanceProbability = (0.9 * Math.random()) + 0.1;

      for (const user of this.users) {
        if (Math.random() < attendanceProbability) {
          this.attendances.push(
            new FakeAttendanceModel(event, user, event.start)
          );
        }
      }
    }
  }
}

describe('sample test', () => {
  test('database is empty', async () => {
    console.log(JSON.stringify(new FakeData(100, 100), null, 2));
  });
});
