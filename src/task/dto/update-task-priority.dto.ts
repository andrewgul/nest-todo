import { PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskPriorityDto extends PickType(CreateTaskDto, [
  'priority',
] as const) {}
