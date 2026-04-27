export type ClassOfferingRefStatus = "active" | "inactive";

export const CLASS_OFFERING_REF_REPOSITORY = Symbol(
  "CLASS_OFFERING_REF_REPOSITORY",
);

export interface ClassOfferingRefRepository {
  upsert(classOffering: {
    id: string;
    status: ClassOfferingRefStatus;
  }): Promise<void>;
  cancelById(id: string): Promise<void>;
}
