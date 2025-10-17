import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/auth/ProtectedRoute";

// Import all components
import {
  // Platform Desk Components
  PlatformDesk,
  PlatformRecentActivities,
  PlatformAssessment,
  PlatformAssessmentManage,
  PlatformQuestions,
  PlatformSessions,
  PlatformCoachExpertise,
  // PlatformSessionPool,
  AimshalaSessionsPool,
  PlatformViewSession,
  PlatformMasterclass,
  PlatformEvents,
  PlatformCourses,
  PlatformContribute,
  PlatformAccessCode,
  PlatformConsultantPremium,
  PlatformForms,
  PlatformFormSubmissions,
  PlatformFormSubmissionDetail,
  CustomFormView,
  PlatformDeskIAM,
  PlatformEditRoleWrapper,
  PlatformAddTeamMember,
  PlatformManageRoles,
  PlatformAddNewRole,
  PlatformPay,
  PlatformPayWrapper,

  // Review Desk Components
  ReviewDesk,
  ReviewPool,
  ReviewConsultantView,
  ReviewFollowUps,

  // Relations Desk Components
  RelationOuterOrganisation,
  RelationDesk,
  RelationPipeline,
  RelationPool,
  RelationExplorers,
  RelationCoaches,
  RelationOrganisation,
  RelationChannelPartners,
  RelationPartnerships,
  RelationProblems,
  RelationBugs,
  RelationBugsView,
  RelationAbuses,
  RelationAbusesView,
  RelationExplorersList,
  RelationCoachesProfile,
  RelationCoachesList,
  RelationUserTimeline,
  RelationViewExplorerLead,
  RelationUserMessage,
  RelationNextFollowUpFlow,
  AddLeadFlow,
  MyAccounts,
  CaseDetails,
  RelationLeaderboard,
  RelationViewProfile,
  RelationAddProblem,
  RelationProblemView,
  RelationAddBug,
  RelationAddAbuse,
  // Digital Desk Components
  DigitalDesk,
  DigitalCampaigns,
  DigitalSurveys,
  DigitalManageQuestion,
  DigitalSurveyQuestion,
  DigitalInsights,
  DigitalVideo,
  DigitalViewfaq,
  DigitalFaq,
  DigitalHelpArticles,
  DigitalInTheNews,
  DigitalTestimonials,
  DigitalTeamDirectory,
  DigitalExams,
  DigitalCareers,
  DigitalDegrees,
  DigitalCourses,
  DigitalScholarships,
  DigitalSkills,
  DigitalReview,
  DigitalComments,
  DigitalFeedback,
  DigitalHelpful,
  DigitalFileManager,
  DigitalMetaInformation,

  // Finance Desk Components
  FinanceDesk,
  FinancePayments,
  FinanceCommission,
  FinancePayout,
  FinancePlatform,
  FinanceEarning,
  FinanceReports,
  FinanceWithdrawal,
  FinanceViewPayment,

  // DevOps Desk Components
  DevopsDesk,
  DevopsMycases,
  DevopsCases,
  DevopsLeaderboard,

  // HRMS Desk Components
  HRMSDesk,
  HRMSFollowUp,
  HRMSCurrentOpening,
  HRMSJobApplication,

  // Common components
  Login
} from "./DynamicRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Platform Desk Routes */}
        <Route path="platform/desk" element={<PlatformDesk />} />
        <Route path="platform/activities" element={<PlatformRecentActivities />} />
        <Route path="platform/assessment" element={<PlatformAssessment />} />
        <Route path="platform/assessment/manage" element={<PlatformAssessmentManage />} />
        <Route path="platform/assessment/manage/:guid" element={<PlatformQuestions />} />

        <Route path="platform/products/sessions" element={<PlatformSessions />} />
        <Route path="platform/products/sessions/coach-expertise" element={<PlatformCoachExpertise />} />
        {/* <Route path="platform/products/sessions/session-pool" element={<PlatformSessionPool />} /> */}
        <Route path="platform/products/sessions/aimshala-sessions-pool" element={<AimshalaSessionsPool />} />
        <Route path="platform/products/sessions/view-session" element={<PlatformViewSession />} />
        <Route path="platform/products/masterclasses" element={<PlatformMasterclass />} />
        <Route path="platform/events" element={<PlatformEvents />} />
        <Route path="platform/courses" element={<PlatformCourses />} />
        <Route path="platform/contribute" element={<PlatformContribute />} />
        <Route path="platform/plans/access-code" element={<PlatformAccessCode />} />
        <Route path="platform/plans/consultants-premium" element={<PlatformConsultantPremium />} />
        <Route path="platform/forms" element={<PlatformForms />} />
        <Route path="platform/forms/:id/submissions" element={<PlatformFormSubmissions />} />
        <Route path="platform/forms/:id/submissions/:submissionId" element={<PlatformFormSubmissionDetail />} />
        <Route path="platform/forms/custom-form/:id" element={<CustomFormView />} />
        <Route path="platform/desk-iam" element={<PlatformDeskIAM />} />
        <Route path="platform/desk-iam/addTeamMember" element={<PlatformAddTeamMember />} />
        <Route path="platform/desk-iam/manageRole" element={<PlatformManageRoles />} />
        <Route path="platform/desk-iam/manageRole/editRole" element={<PlatformEditRoleWrapper />} />
        <Route path="platform/desk-iam/manageRole/addRole" element={<PlatformAddNewRole />} />
        <Route path="platform/plans/access-code/pay/:code" element={<PlatformPayWrapper />} />
        <Route path="platform/plans/access-code/pay" element={<PlatformPay code="all" />} />

        {/* Review Desk Routes */}
        <Route path="review/desk" element={<ReviewDesk />} />
        <Route path="review/pool" element={<ReviewPool />} />
        <Route path="review/pool/consultant-view" element={<ReviewConsultantView />} />
        <Route path="review/follow-ups" element={<ReviewFollowUps />} />

        {/* Relations Desk Routes */}
        <Route path="relation/desk" element={<RelationDesk />} />
        <Route path="relation/pipeline" element={<RelationPipeline />} />
        <Route path="relation/pool" element={<RelationPool />} />
        <Route path="relation/leads/explorers" element={<RelationExplorers />} />
        <Route path="relation/leads/coaches" element={<RelationCoaches />} />
        <Route path="relation/leads/organisations" element={<RelationOrganisation />} />
        <Route path="relation/leads/channel-partner" element={<RelationChannelPartners />} />
        <Route path="relation/leads/partnerships-requests" element={<RelationPartnerships />} />
        <Route path="relation/cases/problems" element={<RelationProblems />} />
        <Route path="relation/cases/problems/view" element={<RelationProblemView />} />
        <Route path="relation/cases/problems/addNewProblem" element={<RelationAddProblem />} />
        <Route path="relation/cases/bugs/view" element={<RelationBugsView />} />  
        <Route path="relation/cases/bugs" element={<RelationBugs />} />
        <Route path="relation/cases/bugs/addNewBug" element={<RelationAddBug />} />
        <Route path="relation/cases/abuses" element={<RelationAbuses />} />
        <Route path="relation/cases/abuses/view" element={<RelationAbusesView />} />
        <Route path="relation/cases/abuses/addNewAbuse" element={<RelationAddAbuse />} />
        <Route path="relation/explorers" element={<RelationExplorersList />} />
        <Route path="relation/explorers/view-profile" element={<RelationViewProfile />} />
        <Route path="relation/coaches" element={<RelationCoachesList />} />
        <Route path="relation/coaches/view-profile" element={<RelationCoachesProfile />} />
        <Route path="relation/organisations" element={<RelationOuterOrganisation />} />
        <Route path="relation/my-accounts" element={<MyAccounts />} />
        <Route path="relation/my-accounts/case-details" element={<CaseDetails />} />
        <Route path="relation/leaderboard" element={<RelationLeaderboard />} />
        <Route path="relation/leads/explorers/user-timeline/:id" element={<RelationUserTimeline />} />
        <Route path="relation/leads/explorers/view-explorer-lead/:id" element={<RelationViewExplorerLead />} />
        <Route path="relation/user-message" element={<RelationUserMessage />} />
        <Route path="relation/next-follow-up-flow" element={<RelationNextFollowUpFlow />} />
        <Route path="relation/add-lead-flow" element={<AddLeadFlow />} />
        {/* Digital Desk Routes */}
        <Route path="digital/desk" element={<DigitalDesk />} />
        <Route path="digital/campaigns" element={<DigitalCampaigns />} />
        <Route path="digital/surveys" element={<DigitalSurveys />} />
        <Route path="digital/surveys/manage-question" element={<DigitalManageQuestion />} />
        <Route path="digital/surveys/manage-question/survey-question" element={<DigitalSurveyQuestion />} />
        <Route path="digital/cms/insights" element={<DigitalInsights />} />
        <Route path="digital/cms/video" element={<DigitalVideo />} />
        <Route path="digital/cms/faqs" element={<DigitalFaq />} />
        <Route path="digital/cms/faqs/:id" element={<DigitalViewfaq />} />
        <Route path="digital/cms/help-articles" element={<DigitalHelpArticles />} />
        <Route path="digital/cms/in-the-news" element={<DigitalInTheNews />} />
        <Route path="digital/cms/testimonials" element={<DigitalTestimonials />} />
        <Route path="digital/cms/teams-directory" element={<DigitalTeamDirectory />} />
        <Route path="digital/libraries/exams" element={<DigitalExams />} />
        <Route path="digital/libraries/careers" element={<DigitalCareers />} />
        <Route path="digital/libraries/degrees" element={<DigitalDegrees />} />
        <Route path="digital/libraries/courses" element={<DigitalCourses />} />
        <Route path="digital/libraries/scholarships" element={<DigitalScholarships />} />
        <Route path="digital/libraries/skills" element={<DigitalSkills />} />
        <Route path="digital/engage/review" element={<DigitalReview />} />
        <Route path="digital/engage/comments" element={<DigitalComments />} />
        <Route path="digital/engage/feedback" element={<DigitalFeedback />} />
        <Route path="digital/engage/helpful" element={<DigitalHelpful />} />
        <Route path="digital/file-manager" element={<DigitalFileManager />} />
        <Route path="digital/meta-information" element={<DigitalMetaInformation />} />

        {/* Finance Desk Routes */}
        <Route path="finance/desk" element={<FinanceDesk />} />
        <Route path="finance/payments" element={<FinancePayments />} />
        <Route path="finance/commissions" element={<FinanceCommission />} />
        <Route path="finance/withdrawal" element={<FinanceWithdrawal />} />
        <Route path="finance/payouts" element={<FinancePayout />} />
        <Route path="finance/platform" element={<FinancePlatform />} />
        <Route path="finance/earnings" element={<FinanceEarning />} />
        <Route path="finance/reports" element={<FinanceReports />} />
        <Route path="finance/payments/view/:id" element={<FinanceViewPayment />} />

        {/* DevOps Desk Routes */}
        <Route path="devops/desk" element={<DevopsDesk />} />
        <Route path="devops/my-cases" element={<DevopsMycases />} />
        <Route path="devops/cases" element={<DevopsCases />} />
        <Route path="devops/leaderboard" element={<DevopsLeaderboard />} />

        {/* HRMS Routes */}
        <Route path="hr/desk" element={<HRMSDesk />} />
        <Route path="hr/follow-ups" element={<HRMSFollowUp />} />
        <Route path="hr/job-application" element={<HRMSJobApplication />} />
        <Route path="hr/current-opening" element={<HRMSCurrentOpening />} />
      </Route>
    </Routes>
  );
}
