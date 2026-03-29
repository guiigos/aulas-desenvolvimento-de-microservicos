import type { Subject } from "@academic/subjects/domain/models/subject.entity";

export const SUBJECT_REPOSITORY = Symbol("SUBJECT_REPOSITORY");

export interface SubjectRepository {
  create(subject: Subject): Promise<void>;
  update(subject: Subject): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Subject[]>;
  findById(id: string): Promise<Subject | null>;
  findByCode(code: string): Promise<Subject | null>;
}
