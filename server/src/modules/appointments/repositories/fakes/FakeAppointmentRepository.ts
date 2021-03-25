import { isEqual, getMonth, getYear } from 'date-fns';

import { DeepPartial } from '~/@types';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import { factories } from '~/shared/factories';

import { IAppointment } from '../../domain';
import { FindAllInMonthFromProviderDto } from '../../dtos';

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

  async findAndCount(): Promise<[IAppointment[], number]> {
    return [this.appointments, this.appointments.length];
  }

  async findAllInMonthFromProvider({
    provider,
    month,
    year
  }: FindAllInMonthFromProviderDto): Promise<IAppointment[]> {
    const appointments = this.appointments.filter(appointment => {
      const appointmentMatchProvider = appointment.provider.id === provider.id;
      const appointmentMatchmonth = getMonth(appointment.date) + 1 === month;
      const appointmentMatchYear = getYear(appointment.date) === year;

      return (
        appointmentMatchProvider &&
        appointmentMatchmonth &&
        appointmentMatchYear
      );
    });

    return appointments;
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
