export class CreateAppointmentDto {
  provider: string;

  date: Date;

  constructor(partial: Partial<CreateAppointmentDto>) {
    Object.assign(this, partial);
  }
}
