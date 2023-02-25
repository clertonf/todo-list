import { TaskDTO } from './TaskDTO';

export type UserDTO = {
	id: string;
	tasks: TaskDTO[];
};
