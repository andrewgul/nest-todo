import { IsInt, IsString, Max, Min } from "class-validator";

export class TaskDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1)
  @Max(3)
  priority: number;
}