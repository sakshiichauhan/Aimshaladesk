import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Import all dynamic components
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

// Helper component to wrap routes with Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
    {children}
  </Suspense>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      } />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Platform Desk Routes */}
        <Route path="platform/desk" element={
          <SuspenseWrapper>
            <PlatformDesk />
          </SuspenseWrapper>
        } />

        <Route
          path="platform/activities"
          element={
            <SuspenseWrapper>
              <PlatformRecentActivities />
            </SuspenseWrapper>
          }
        />
        <Route path="platform/assessment" element={
          <SuspenseWrapper>
            <PlatformAssessment />
          </SuspenseWrapper>
        } />
        <Route
          path="platform/assessment/manage"
          element={
            <SuspenseWrapper>
              <PlatformAssessmentManage />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/assessment/manage/:guid"
          element={
            <SuspenseWrapper>
              <PlatformQuestions />
            </SuspenseWrapper>
          }
        />

        <Route
          path="platform/products/sessions"
          element={
            <SuspenseWrapper>
              <PlatformSessions />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/products/sessions/coach-expertise"
          element={
            <SuspenseWrapper>
              <PlatformCoachExpertise />
            </SuspenseWrapper>
          }
        />
        {/* <Route
          path="platform/products/sessions/session-pool"
          element={
            <SuspenseWrapper>
              <PlatformSessionPool />
            </SuspenseWrapper>
          }
        /> */}
        <Route
          path="platform/products/sessions/aimshala-sessions-pool"
          element={
            <SuspenseWrapper>
              <AimshalaSessionsPool />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/products/sessions/view-session"
          element={
            <SuspenseWrapper>
              <PlatformViewSession session={null} />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/products/masterclasses"
          element={
            <SuspenseWrapper>
              <PlatformMasterclass />
            </SuspenseWrapper>
          }
        />
        <Route path="platform/events" element={
          <SuspenseWrapper>
            <PlatformEvents />
          </SuspenseWrapper>
        } />
        <Route path="platform/courses" element={
          <SuspenseWrapper>
            <PlatformCourses />
          </SuspenseWrapper>
        } />
        <Route path="platform/contribute" element={
          <SuspenseWrapper>
            <PlatformContribute />
          </SuspenseWrapper>
        } />
        <Route
          path="platform/plans/access-code"
          element={
            <SuspenseWrapper>
              <PlatformAccessCode />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/plans/consultants-premium"
          element={
            <SuspenseWrapper>
              <PlatformConsultantPremium />
            </SuspenseWrapper>
          }
        />
        <Route path="platform/forms" element={
          <SuspenseWrapper>
            <PlatformForms />
          </SuspenseWrapper>
        } />
        <Route path="platform/forms/:id/submissions" element={
          <SuspenseWrapper>
            <PlatformFormSubmissions />
          </SuspenseWrapper>
        } />
        <Route path="platform/forms/:id/submissions/:submissionId" element={
          <SuspenseWrapper>
            <PlatformFormSubmissionDetail />
          </SuspenseWrapper>
        } />
        <Route path="platform/forms/custom-form/:id" element={
          <SuspenseWrapper>
            <CustomFormView />
          </SuspenseWrapper>
        } />
        <Route path="platform/desk-iam" element={
          <SuspenseWrapper>
            <PlatformDeskIAM />
          </SuspenseWrapper>
        } />
        <Route
          path="platform/desk-iam/addTeamMember"
          element={
            <SuspenseWrapper>
              <PlatformAddTeamMember />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/desk-iam/manageRole"
          element={
            <SuspenseWrapper>
              <PlatformManageRoles />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/desk-iam/manageRole/editRole"
          element={
            <SuspenseWrapper>
              <PlatformEditRoleWrapper />
            </SuspenseWrapper>
          }
        />

        <Route
          path="platform/desk-iam/manageRole/addRole"
          element={
            <SuspenseWrapper>
              <PlatformAddNewRole />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/plans/access-code/pay/:code"
          element={
            <SuspenseWrapper>
              <PlatformPayWrapper />
            </SuspenseWrapper>
          }
        />
        <Route
          path="platform/plans/access-code/pay"
          element={
            <SuspenseWrapper>
              <PlatformPay code="all" />
            </SuspenseWrapper>
          }
        />

        {/* Review Desk Routes */}
        <Route path="review/desk" element={
          <SuspenseWrapper>
            <ReviewDesk />
          </SuspenseWrapper>
        } />
        <Route path="review/pool" element={
          <SuspenseWrapper>
            <ReviewPool />
          </SuspenseWrapper>
        } />
        <Route
          path="review/pool/consultant-view"
          element={
            <SuspenseWrapper>
              <ReviewConsultantView />
            </SuspenseWrapper>
          }
        />
        <Route path="review/follow-ups" element={
          <SuspenseWrapper>
            <ReviewFollowUps />
          </SuspenseWrapper>
        } />

        {/* Relations Desk Routes */}
        <Route path="relation/desk" element={
          <SuspenseWrapper>
            <RelationDesk />
          </SuspenseWrapper>
        } />
        <Route path="relation/pipeline" element={
          <SuspenseWrapper>
            <RelationPipeline />
          </SuspenseWrapper>
        } />
        <Route path="relation/pool" element={
          <SuspenseWrapper>
            <RelationPool />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/leads/explorers"
          element={
            <SuspenseWrapper>
              <RelationExplorers />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/leads/coaches" element={
          <SuspenseWrapper>
            <RelationCoaches />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/leads/organisations"
          element={
            <SuspenseWrapper>
              <RelationOrganisation />
            </SuspenseWrapper>
          }
        />
        <Route
          path="relation/leads/channel-partner"
          element={
            <SuspenseWrapper>
              <RelationChannelPartners />
            </SuspenseWrapper>
          }
        />
        <Route
          path="relation/leads/partnerships-requests"
          element={
            <SuspenseWrapper>
              <RelationPartnerships />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/cases/problems" element={
          <SuspenseWrapper>
            <RelationProblems />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/problems/view" element={
          <SuspenseWrapper>
            <RelationProblemView />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/problems/addNewProblem" element={
          <SuspenseWrapper>
            <RelationAddProblem />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/bugs/view" element={
          <SuspenseWrapper>
            <RelationBugsView />
          </SuspenseWrapper>
        } />  
        <Route path="relation/cases/bugs" element={
          <SuspenseWrapper>
            <RelationBugs />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/bugs/addNewBug" element={
          <SuspenseWrapper>
            <RelationAddBug />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/abuses" element={
          <SuspenseWrapper>
            <RelationAbuses />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/abuses/view" element={
          <SuspenseWrapper>
            <RelationAbusesView />
          </SuspenseWrapper>
        } />
        <Route path="relation/cases/abuses/addNewAbuse" element={
          <SuspenseWrapper>
            <RelationAddAbuse />
          </SuspenseWrapper>
        } />
        <Route path="relation/explorers" element={
          <SuspenseWrapper>
            <RelationExplorersList />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/explorers/view-profile"
          element={
            <SuspenseWrapper>
              <RelationViewProfile />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/coaches" element={
          <SuspenseWrapper>
            <RelationCoachesList />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/coaches/view-profile"
          element={
            <SuspenseWrapper>
              <RelationCoachesProfile />
            </SuspenseWrapper>
          }
        />
        <Route
          path="relation/organisations"
          element={
            <SuspenseWrapper>
              <RelationOuterOrganisation />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/my-accounts" element={
          <SuspenseWrapper>
            <MyAccounts />
          </SuspenseWrapper>
        } />
        <Route path="relation/my-accounts/case-details" element={
          <SuspenseWrapper>
            <CaseDetails />
          </SuspenseWrapper>
        } />
        <Route path="relation/leaderboard" element={
          <SuspenseWrapper>
            <RelationLeaderboard />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/leads/explorers/user-timeline/:id"
          element={
            <SuspenseWrapper>
              <RelationUserTimeline />
            </SuspenseWrapper>
          }
        />
        <Route
          path="relation/leads/explorers/view-explorer-lead/:id"
          element={
            <SuspenseWrapper>
              <RelationViewExplorerLead />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/user-message" element={
          <SuspenseWrapper>
            <RelationUserMessage />
          </SuspenseWrapper>
        } />
        <Route
          path="relation/next-follow-up-flow"
          element={
            <SuspenseWrapper>
              <RelationNextFollowUpFlow />
            </SuspenseWrapper>
          }
        />
        <Route path="relation/add-lead-flow" element={
          <SuspenseWrapper>
            <AddLeadFlow />
          </SuspenseWrapper>
        } />
        {/* Digital Desk Routes */}
        <Route path="digital/desk" element={
          <SuspenseWrapper>
            <DigitalDesk />
          </SuspenseWrapper>
        } />
        <Route path="digital/campaigns" element={
          <SuspenseWrapper>
            <DigitalCampaigns />
          </SuspenseWrapper>
        } />
        <Route path="digital/surveys" element={
          <SuspenseWrapper>
            <DigitalSurveys />
          </SuspenseWrapper>
        } />
        <Route
          path="digital/surveys/manage-question"
          element={
            <SuspenseWrapper>
              <DigitalManageQuestion />
            </SuspenseWrapper>
          }
        />
        <Route
          path="digital/surveys/manage-question/survey-question"
          element={
            <SuspenseWrapper>
              <DigitalSurveyQuestion />
            </SuspenseWrapper>
          }
        />
        <Route path="digital/cms/insights" element={
          <SuspenseWrapper>
            <DigitalInsights />
          </SuspenseWrapper>
        } />
        <Route path="digital/cms/video" element={
          <SuspenseWrapper>
            <DigitalVideo />
          </SuspenseWrapper>
        } />
        <Route path="digital/cms/faqs" element={
          <SuspenseWrapper>
            <DigitalFaq />
          </SuspenseWrapper>
        } />
        <Route path="digital/cms/faqs/:id" element={
          <SuspenseWrapper>
            <DigitalViewfaq />
          </SuspenseWrapper>
        } />
        <Route
          path="digital/cms/help-articles"
          element={
            <SuspenseWrapper>
              <DigitalHelpArticles />
            </SuspenseWrapper>
          }
        />
        <Route path="digital/cms/in-the-news" element={
          <SuspenseWrapper>
            <DigitalInTheNews />
          </SuspenseWrapper>
        } />
        <Route
          path="digital/cms/testimonials"
          element={
            <SuspenseWrapper>
              <DigitalTestimonials />
            </SuspenseWrapper>
          }
        />
        <Route
          path="digital/cms/teams-directory"
          element={
            <SuspenseWrapper>
              <DigitalTeamDirectory />
            </SuspenseWrapper>
          }
        />
        <Route path="digital/libraries/exams" element={
          <SuspenseWrapper>
            <DigitalExams />
          </SuspenseWrapper>
        } />
        <Route path="digital/libraries/careers" element={
          <SuspenseWrapper>
            <DigitalCareers />
          </SuspenseWrapper>
        } />
        <Route path="digital/libraries/degrees" element={
          <SuspenseWrapper>
            <DigitalDegrees />
          </SuspenseWrapper>
        } />
        <Route path="digital/libraries/courses" element={
          <SuspenseWrapper>
            <DigitalCourses />
          </SuspenseWrapper>
        } />
        <Route
          path="digital/libraries/scholarships"
          element={
            <SuspenseWrapper>
              <DigitalScholarships />
            </SuspenseWrapper>
          }
        />
        <Route path="digital/libraries/skills" element={
          <SuspenseWrapper>
            <DigitalSkills />
          </SuspenseWrapper>
        } />
        <Route path="digital/engage/review" element={
          <SuspenseWrapper>
            <DigitalReview />
          </SuspenseWrapper>
        } />
        <Route path="digital/engage/comments" element={
          <SuspenseWrapper>
            <DigitalComments />
          </SuspenseWrapper>
        } />
        <Route path="digital/engage/feedback" element={
          <SuspenseWrapper>
            <DigitalFeedback />
          </SuspenseWrapper>
        } />
        <Route path="digital/engage/helpful" element={
          <SuspenseWrapper>
            <DigitalHelpful />
          </SuspenseWrapper>
        } />
        <Route path="digital/file-manager" element={
          <SuspenseWrapper>
            <DigitalFileManager />
          </SuspenseWrapper>
        } />
        <Route
          path="digital/meta-information"
          element={
            <SuspenseWrapper>
              <DigitalMetaInformation />
            </SuspenseWrapper>
          }
        />

        {/* Finance Desk Routes */}
        <Route path="finance/desk" element={
          <SuspenseWrapper>
            <FinanceDesk />
          </SuspenseWrapper>
        } />
        <Route path="finance/payments" element={
          <SuspenseWrapper>
            <FinancePayments />
          </SuspenseWrapper>
        } />
        <Route path="finance/commissions" element={
          <SuspenseWrapper>
            <FinanceCommission />
          </SuspenseWrapper>
        } />
        <Route path="finance/withdrawal" element={
          <SuspenseWrapper>
            <FinanceWithdrawal />
          </SuspenseWrapper>
        } />
        <Route path="finance/payouts" element={
          <SuspenseWrapper>
            <FinancePayout />
          </SuspenseWrapper>
        } />
        <Route path="finance/platform" element={
          <SuspenseWrapper>
            <FinancePlatform />
          </SuspenseWrapper>
        } />
        <Route path="finance/earnings" element={
          <SuspenseWrapper>
            <FinanceEarning />
          </SuspenseWrapper>
        } />
        <Route path="finance/reports" element={
          <SuspenseWrapper>
            <FinanceReports />
          </SuspenseWrapper>
        } />
        <Route path="finance/payments/view/:id" element={
          <SuspenseWrapper>
            <FinanceViewPayment />
          </SuspenseWrapper>
        } />

        {/* DevOps Desk Routes */}
        <Route path="devops/desk" element={
          <SuspenseWrapper>
            <DevopsDesk />
          </SuspenseWrapper>
        } />
        <Route path="devops/my-cases" element={
          <SuspenseWrapper>
            <DevopsMycases />
          </SuspenseWrapper>
        } />
        <Route path="devops/cases" element={
          <SuspenseWrapper>
            <DevopsCases />
          </SuspenseWrapper>
        } />
        <Route path="devops/leaderboard" element={
          <SuspenseWrapper>
            <DevopsLeaderboard />
          </SuspenseWrapper>
        } />

        {/* HRMS Routes */}
        <Route path="hr/desk" element={
          <SuspenseWrapper>
            <HRMSDesk />
          </SuspenseWrapper>
        } />
        <Route path="hr/follow-ups" element={
          <SuspenseWrapper>
            <HRMSFollowUp />
          </SuspenseWrapper>
        } />
        <Route path="hr/job-application" element={
          <SuspenseWrapper>
            <HRMSJobApplication />
          </SuspenseWrapper>
        } />
        <Route path="hr/current-opening" element={
          <SuspenseWrapper>
            <HRMSCurrentOpening />
          </SuspenseWrapper>
        } />
      </Route>
    </Routes>
  );
}
