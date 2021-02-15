import { isEqual } from 'date-fns';

import { DeepPartial } from '~/@types';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import { factories } from '~/shared/factories';

import { IAppointment } from '../../domain';

export class FakeAppointmentRepository implements IAppointmentRepository {
  private readonly appointments: IAppointment[] = [];

  async save(appointment: IAppointment): Promise<IAppointment> {
    const findIndex = this.appointments.findIndex(
      ({ id }) => id === appointment.id
    );

    if (findIndex >= 0) {
      this.appointments[findIndex] = appointment;
      return appointment;
    }

    this.appointments.push(appointment);
    return appointment;
  }

  async create(partial: DeepPartial<IAppointment>): Promise<IAppointment> {
    const appointment = factories.appointment.build(partial);

    this.appointments.push(appointment);

    return appointment;
  }

  async find(): Promise<IAppointment[]> {
    return this.appointments;
  }

  async findByDate(date: Date): Promise<IAppointment[]> {
    const appointmentsInSameDate = this.appointments.filter(appointment =>
      isEqual(appointment.date, date)
    );

    return appointmentsInSameDate;
  }

  async findOneByDate(date: Date): Promise<IAppointment | undefined> {
    const appointmentInSameDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

    return appointmentInSameDate;
  }
}
