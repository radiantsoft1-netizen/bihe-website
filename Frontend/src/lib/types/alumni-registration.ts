export type AlumniRegistrationSubmitResult = {
  trackingId: string;
  notificationSent: boolean;
  notificationLogged?: boolean;
  notificationError?: string | null;
  activeStep: number;
};

export type AlumniRegistrationStatus = {
  trackingId: string;
  name: string;
  program: string;
  passoutYear: number | null;
  approvalStatus: "pending" | "approved" | "rejected";
  submittedAt: string | null;
  approvedAt: string | null;
  rejectionNote: string | null;
  published: boolean;
  activeStep: number;
};
