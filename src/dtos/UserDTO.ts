import { TaskDTO } from './TaskDTO';

export type UserDTO = {
	id: string;
	name: string;
	tasks: TaskDTO;
};
