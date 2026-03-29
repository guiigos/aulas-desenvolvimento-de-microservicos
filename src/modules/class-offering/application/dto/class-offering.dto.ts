import type { ClassOffering } from "@class-offering/domain/models/class-offering.entity";

export class ClassOfferingDto {
  private constructor(
    public id: string | undefined,
    public subjectId: string,
    public teacherId: string,
    public startDate: Date,
    public endDate: Date,
    public status: string,
  ) {}

  public static from(
    classOffering: ClassOffering | null,
  ): ClassOfferingDto | null {
    if (!classOffering) return null;
    return new ClassOfferingDto(
      classOffering.id,
      classOffering.subjectId,
      classOffering.teacherId,
      classOffering.startDate,
      classOffering.endDate,
      classOffering.status,
    );
  }
}
