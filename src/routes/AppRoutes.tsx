import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/auth/ProtectedRoute";

// Import all components
import { Desk as PlatformDesk } from "@/pages/PlatformDesk/Desk";
import { RecentActivities as PlatformRecentActivities } from "@/pages/PlatformDesk/RecentActivities";
import { Assessments as PlatformAssessment } from "@/pages/PlatformDesk/Assessment/Assessments";
import { Manage as PlatformAssessmentManage } from "@/pages/PlatformDesk/Assessment/Manage";
import { Question as PlatformQuestions } from "@/pages/PlatformDesk/Assessment/Question";
import { Sessions as PlatformSessions } from "@/pages/PlatformDesk/Sessions/Sessions";
import { default as PlatformCoachExpertise } from "@/pages/PlatformDesk/Sessions/CoachExpertise";
// export { SessionPool as PlatformSessionPool } from "@/pages/PlatformDesk/Sessions/SessionPool";
import { AimshalaSessionsPool } from "@/pages/PlatformDesk/Sessions/AimshalaExperties";
import { ViewSession as PlatformViewSession } from "@/pages/PlatformDesk/Sessions/ViewSession";
import { Masterclass as PlatformMasterclass } from "@/pages/PlatformDesk/Sessions/Masterclass";
import { Events as PlatformEvents } from "@/pages/PlatformDesk/Events";
import { Courses as PlatformCourses } from "@/pages/PlatformDesk/Courses";
import { Contribute as PlatformContribute } from "@/pages/PlatformDesk/Contribute";
import { AccessCode as PlatformAccessCode } from "@/pages/PlatformDesk/AccessCode";
import { ConsultantPremium as PlatformConsultantPremium } from "@/pages/PlatformDesk/Plans/ConsultantPremium";
import { FormTabsWrapper as PlatformForms } from "@/pages/PlatformDesk/Forms";
import { FormSubmissionsPage as PlatformFormSubmissions } from "@/pages/PlatformDesk/FormsWrapper/FormSubmissionsPage";
import { FormSubmissionDetailPage as PlatformFormSubmissionDetail } from "@/pages/PlatformDesk/FormsWrapper/FormSubmissionDetailPage";
import { CustomFormView } from "@/pages/PlatformDesk/FormsWrapper/CustomForm/CustomFormView";
import { DeskIAM as PlatformDeskIAM } from "@/pages/PlatformDesk/DeskIAM";
import { EditRoleWrapper as PlatformEditRoleWrapper } from "@/pages/PlatformDesk/underDeskIAM/EditRoleWrapper";
import { AddTeamMember as PlatformAddTeamMember } from "@/pages/PlatformDesk/underDeskIAM/AddDeskUser";
import { ManageRoles as PlatformManageRoles } from "@/pages/PlatformDesk/underDeskIAM/ManageRoles";
import { AddNewRole as PlatformAddNewRole } from "@/pages/PlatformDesk/underDeskIAM/AddNewRole";
import { Pay as PlatformPay } from "@/pages/PlatformDesk/Plans/Pay";
import { PayWrapper as PlatformPayWrapper } from "@/pages/PlatformDesk/Plans/PayWrapper";

// Review Desk Components
import { Desk as ReviewDesk } from "@/pages/ReviewDesk/Desk";
import { Pool as ReviewPool } from "@/pages/ReviewDesk/Pool";
import { ConsultantView as ReviewConsultantView } from "@/pages/ReviewDesk/Pages/ConsultantView";
import { ReviewFollowUps } from "@/pages/ReviewDesk/ReviewFollowUps";

// Relations Desk Components
import { Organisation as RelationOuterOrganisation } from "@/pages/RelationDesk/Organisation";
import { Desk as RelationDesk } from "@/pages/RelationDesk/Desk";
import { MyPipeline as RelationPipeline } from "@/pages/RelationDesk/MyPipeline";
import { Pool as RelationPool } from "@/pages/RelationDesk/Pool";
import { Explorers as RelationExplorers } from "@/pages/RelationDesk/Leads/LeadExplorer/Explorers";
import { Coaches as RelationCoaches } from "@/pages/RelationDesk/Leads/Coaches";
import { Organisation as RelationOrganisation } from "@/pages/RelationDesk/Leads/Organisation";
import { ChannelPartners as RelationChannelPartners } from "@/pages/RelationDesk/Leads/ChannelPartners";
import { Partnerships as RelationPartnerships } from "@/pages/RelationDesk/Leads/Partnerships";
import { Problems as RelationProblems } from "@/pages/RelationDesk/Cases/Problems/Problems";
import { Bugs as RelationBugs } from "@/pages/RelationDesk/Cases/Bugs/Bugs";
import { BugsView as RelationBugsView } from "@/pages/RelationDesk/Cases/Bugs/BugsView";
import { Abuses as RelationAbuses } from "@/pages/RelationDesk/Cases/Abuse/Abuses";
import { AbusesView as RelationAbusesView } from "@/pages/RelationDesk/Cases/Abuse/AbusesView";
import { Explorers as RelationExplorersList } from "@/pages/RelationDesk/Explorers";
import { CoachesProfile as RelationCoachesProfile } from "@/pages/RelationDesk/CoachesViewProfile";
import { Coaches as RelationCoachesList } from "@/pages/RelationDesk/Coaches";
import { UserTimeline as RelationUserTimeline } from "@/pages/RelationDesk/Leads/LeadExplorer/UserTimeline";
import { ViewExplorerLead as RelationViewExplorerLead } from "@/pages/RelationDesk/Leads/LeadExplorer/viewExplorerLead";
import { UserMessage as RelationUserMessage } from "@/pages/RelationDesk/UserMessage";
import { NextFollowUpFlow as RelationNextFollowUpFlow } from "@/pages/RelationDesk/nextFollowUpFlow";
import { AddLeadFlow } from "@/pages/RelationDesk/addLeadFlow";
import { MyAccounts } from "@/pages/RelationDesk/MyAcount/MyAccount";
import { CaseDetails } from "@/pages/RelationDesk/MyAcount/CaseDetails";
import { Leaderboard as RelationLeaderboard } from "@/pages/RelationDesk/Leaderboard";
import { ViewProfile as RelationViewProfile } from "@/pages/RelationDesk/ExplorersViewProfile";
import { AddProblem as RelationAddProblem } from "@/pages/RelationDesk/Cases/Problems/AddProblem";
import { ProblemView as RelationProblemView } from "@/pages/RelationDesk/Cases/Problems/ProblemView";
import { AddBug as RelationAddBug } from "@/pages/RelationDesk/Cases/Bugs/AddBug";
import { AddAbuse as RelationAddAbuse } from "@/pages/RelationDesk/Cases/Abuse/AddAbuse";
// Digital Desk Components
import { Desk as DigitalDesk } from "@/pages/DigitalDesk/Desk";
import { Campaigns as DigitalCampaigns } from "@/pages/DigitalDesk/Campaigns";
import { Surveys as DigitalSurveys } from "@/pages/DigitalDesk/Survey/Surveys";
import { ManageQuestion as DigitalManageQuestion } from "@/pages/DigitalDesk/Survey/ManageQuestion";
import { SurveyQuestion as DigitalSurveyQuestion } from "@/pages/DigitalDesk/Survey/SurveyQuestion";
import { Insights as DigitalInsights } from "@/pages/DigitalDesk/CMS/Insights";
import { VideoLibraries as DigitalVideo } from "@/pages/DigitalDesk/CMS/Video";
import { Viewfaq as DigitalViewfaq } from "@/pages/DigitalDesk/CMS/Viewfaq";
import { Faq as DigitalFaq } from "@/pages/DigitalDesk/CMS/Faq";
import { HelpArticles as DigitalHelpArticles } from "@/pages/DigitalDesk/CMS/HelpArticles";
import { InTheNews as DigitalInTheNews } from "@/pages/DigitalDesk/CMS/InTheNews";
import { Testimonials as DigitalTestimonials } from "@/pages/DigitalDesk/CMS/Testimonials";
import { TeamDirectory as DigitalTeamDirectory } from "@/pages/DigitalDesk/CMS/TeamDirectory";
import { Exams as DigitalExams } from "@/pages/DigitalDesk/Libraries/Exams";
import { Careers as DigitalCareers } from "@/pages/DigitalDesk/Libraries/Careers";
import { Degrees as DigitalDegrees } from "@/pages/DigitalDesk/Libraries/Degrees";
import { Courses as DigitalCourses } from "@/pages/DigitalDesk/Libraries/Courses";
import { Scholarships as DigitalScholarships } from "@/pages/DigitalDesk/Libraries/Scholarships";
import { Skills as DigitalSkills } from "@/pages/DigitalDesk/Libraries/Skills";
import { Review as DigitalReview } from "@/pages/DigitalDesk/Engage/Review";
import { Comments as DigitalComments } from "@/pages/DigitalDesk/Engage/Comments";
import { Feedback as DigitalFeedback } from "@/pages/DigitalDesk/Engage/Feedback";
import { Helpful as DigitalHelpful } from "@/pages/DigitalDesk/Engage/Helpful";
import { FileManager as DigitalFileManager } from "@/pages/DigitalDesk/FileManager";
import { MetaInformation as DigitalMetaInformation } from "@/pages/DigitalDesk/MetaInformation";

// Finance Desk Components
import { Finance as FinanceDesk } from "@/pages/FinanceDesk/Finance";
import { Payments as FinancePayments } from "@/pages/FinanceDesk/Payments";
import { Commission as FinanceCommission } from "@/pages/FinanceDesk/Commission";
import { Payout as FinancePayout } from "@/pages/FinanceDesk/Payout";
import { Platform as FinancePlatform } from "@/pages/FinanceDesk/Platform";
import { Earning as FinanceEarning } from "@/pages/FinanceDesk/Earning";
import { Reports as FinanceReports } from "@/pages/FinanceDesk/Reports";
import { Withdrawal as FinanceWithdrawal } from "@/pages/FinanceDesk/Withdrawal";
import { ViewPayment as FinanceViewPayment } from "@/pages/FinanceDesk/ViewPayment";

// DevOps Desk Components
import { DevopsDesk } from "@/pages/DevopsDesk/DevopsDesk";
import { MyCase as DevopsMycases } from "@/pages/DevopsDesk/Mycases";
import { Cases as DevopsCases } from "@/pages/DevopsDesk/Cases";
import { Leaderboard as DevopsLeaderboard } from "@/pages/DevopsDesk/Leaderboard";

// HRMS Desk Components
import { Desk as HRMSDesk } from "@/pages/HRMS/Desk";
import { FollowUp as HRMSFollowUp } from "@/pages/HRMS/FollowUp";
import { CurrenOpenings as HRMSCurrentOpening } from "@/pages/HRMS/CurrenOpenings";
import { JobApplication as HRMSJobApplication } from "@/pages/HRMS/JobApplication";

// Common components
import { default as Login } from "@/pages/Login";

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
