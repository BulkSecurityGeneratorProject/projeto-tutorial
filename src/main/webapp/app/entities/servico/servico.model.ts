import { BaseEntity } from './../../shared';

export class Servico implements BaseEntity {
    constructor(
        public id?: number,
        public servico?: string,
        public agendamento?: BaseEntity,
    ) {
    }
}
