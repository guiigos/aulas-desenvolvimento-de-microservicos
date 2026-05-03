export const STUDENT_REF_REPOSITORY = Symbol("STUDENT_REF_REPOSITORY");

export interface StudentRefRepository {
  upsert(student: { id: string; name: string }): Promise<void>;
  deleteById(id: string): Promise<void>;
}
