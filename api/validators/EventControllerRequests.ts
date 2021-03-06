import { Allow, IsNotEmpty, IsDateString, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  EventSearchOptions as IEventSearchOptions,
  OptionalEventProperties as IOptionalEventProperties,
  CreateEventRequest as ICreateEventRequest,
  PatchEventRequest as IPatchEventRequest,
  Event as IEvent,
} from '../../types';

export class OptionalEventProperties implements IOptionalEventProperties {
  @IsNotEmpty()
  organization?: string;

  @IsNotEmpty()
  committee?: string;

  @IsNotEmpty()
  thumbnail?: string;

  @IsNotEmpty()
  eventLink?: string;

  @Allow()
  requiresStaff?: boolean;

  @Allow()
  staffPointBonus?: number;
}

export class Event extends OptionalEventProperties implements IEvent {
  @IsNotEmpty()
  cover: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsDefined()
  @IsDateString()
  start: Date;

  @IsDefined()
  @IsDateString()
  end: Date;

  @IsNotEmpty()
  attendanceCode: string;

  @IsDefined()
  pointValue: number;
}

export class EventPatches extends OptionalEventProperties implements IEvent {
  @IsNotEmpty()
  cover: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsNotEmpty()
  attendanceCode: string;

  @Allow()
  pointValue: number;
}

export class EventSearchOptions implements IEventSearchOptions {
  @Allow()
  committee?: string;

  @Allow()
  offset?: number;

  @Allow()
  limit?: number;
}

export class CreateEventRequest implements ICreateEventRequest {
  @Type(() => Event)
  @ValidateNested()
  @IsDefined()
  event: Event;
}

export class PatchEventRequest implements IPatchEventRequest {
  @Type(() => EventPatches)
  @ValidateNested()
  @IsDefined()
  event: EventPatches;
}
