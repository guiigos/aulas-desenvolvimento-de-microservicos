export const EXCHANGE_TYPE = "direct" as const;

export const PUBLISHER_EXCHANGES = {
  ATTENDANCE_REGISTERED: "attendance.registered.exchange",
} as const;

export const PUBLISHER_ROUTING_KEYS = {
  ATTENDANCE_REGISTERED: "attendance.registered",
} as const;

export const EXTERNAL_EXCHANGES = {
  ACADEMIC_STUDENTS_CREATED: "academic.students.created.exchange",
  ACADEMIC_STUDENTS_UPDATED: "academic.students.updated.exchange",
  ACADEMIC_STUDENTS_DELETED: "academic.students.deleted.exchange",
  CLASS_OFFERING_CREATED: "class-offering.created.exchange",
  CLASS_OFFERING_UPDATED: "class-offering.updated.exchange",
  CLASS_OFFERING_CANCELED: "class-offering.canceled.exchange",
  ENROLLMENT_CREATED: "enrollment.created.exchange",
  ENROLLMENT_CANCELED: "enrollment.canceled.exchange",
} as const;

export const CONSUMER_ROUTING_KEYS = {
  STUDENT_CREATED: "student.created",
  STUDENT_UPDATED: "student.updated",
  STUDENT_DELETED: "student.deleted",
  CLASS_OFFERING_CREATED: "class-offering.created",
  CLASS_OFFERING_UPDATED: "class-offering.updated",
  CLASS_OFFERING_CANCELED: "class-offering.canceled",
  ENROLLMENT_CREATED: "enrollment.created",
  ENROLLMENT_CANCELED: "enrollment.canceled",
} as const;

export const CONSUMER_QUEUES = {
  STUDENT_CREATED: "attendance.academic-students.created.queue",
  STUDENT_UPDATED: "attendance.academic-students.updated.queue",
  STUDENT_DELETED: "attendance.academic-students.deleted.queue",
  CLASS_OFFERING_CREATED: "attendance.class-offering.created.queue",
  CLASS_OFFERING_UPDATED: "attendance.class-offering.updated.queue",
  CLASS_OFFERING_CANCELED: "attendance.class-offering.canceled.queue",
  ENROLLMENT_CREATED: "attendance.enrollment.created.queue",
  ENROLLMENT_CANCELED: "attendance.enrollment.canceled.queue",
} as const;

export const QUEUE_BINDINGS: ReadonlyArray<{
  queue: string;
  exchange: string;
  routingKey: string;
}> = [
  {
    queue: CONSUMER_QUEUES.STUDENT_CREATED,
    exchange: EXTERNAL_EXCHANGES.ACADEMIC_STUDENTS_CREATED,
    routingKey: CONSUMER_ROUTING_KEYS.STUDENT_CREATED,
  },
  {
    queue: CONSUMER_QUEUES.STUDENT_UPDATED,
    exchange: EXTERNAL_EXCHANGES.ACADEMIC_STUDENTS_UPDATED,
    routingKey: CONSUMER_ROUTING_KEYS.STUDENT_UPDATED,
  },
  {
    queue: CONSUMER_QUEUES.STUDENT_DELETED,
    exchange: EXTERNAL_EXCHANGES.ACADEMIC_STUDENTS_DELETED,
    routingKey: CONSUMER_ROUTING_KEYS.STUDENT_DELETED,
  },
  {
    queue: CONSUMER_QUEUES.CLASS_OFFERING_CREATED,
    exchange: EXTERNAL_EXCHANGES.CLASS_OFFERING_CREATED,
    routingKey: CONSUMER_ROUTING_KEYS.CLASS_OFFERING_CREATED,
  },
  {
    queue: CONSUMER_QUEUES.CLASS_OFFERING_UPDATED,
    exchange: EXTERNAL_EXCHANGES.CLASS_OFFERING_UPDATED,
    routingKey: CONSUMER_ROUTING_KEYS.CLASS_OFFERING_UPDATED,
  },
  {
    queue: CONSUMER_QUEUES.CLASS_OFFERING_CANCELED,
    exchange: EXTERNAL_EXCHANGES.CLASS_OFFERING_CANCELED,
    routingKey: CONSUMER_ROUTING_KEYS.CLASS_OFFERING_CANCELED,
  },
  {
    queue: CONSUMER_QUEUES.ENROLLMENT_CREATED,
    exchange: EXTERNAL_EXCHANGES.ENROLLMENT_CREATED,
    routingKey: CONSUMER_ROUTING_KEYS.ENROLLMENT_CREATED,
  },
  {
    queue: CONSUMER_QUEUES.ENROLLMENT_CANCELED,
    exchange: EXTERNAL_EXCHANGES.ENROLLMENT_CANCELED,
    routingKey: CONSUMER_ROUTING_KEYS.ENROLLMENT_CANCELED,
  },
];
