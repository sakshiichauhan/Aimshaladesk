// Direct imports for all routes
// Platform Desk Components
export { Desk as PlatformDesk } from "@/pages/PlatformDesk/Desk";
export { RecentActivities as PlatformRecentActivities } from "@/pages/PlatformDesk/RecentActivities";
export { Assessments as PlatformAssessment } from "@/pages/PlatformDesk/Assessment/Assessments";
export { Manage as PlatformAssessmentManage } from "@/pages/PlatformDesk/Assessment/Manage";
export { Question as PlatformQuestions } from "@/pages/PlatformDesk/Assessment/Question";
export { Sessions as PlatformSessions } from "@/pages/PlatformDesk/Sessions/Sessions";
export { default as PlatformCoachExpertise } from "@/pages/PlatformDesk/Sessions/CoachExpertise";
// export { SessionPool as PlatformSessionPool } from "@/pages/PlatformDesk/Sessions/SessionPool";
export { AimshalaSessionsPool } from "@/pages/PlatformDesk/Sessions/AimshalaExperties";
export { ViewSession as PlatformViewSession } from "@/pages/PlatformDesk/Sessions/ViewSession";
export { Masterclass as PlatformMasterclass } from "@/pages/PlatformDesk/Sessions/Masterclass";
export { Events as PlatformEvents } from "@/pages/PlatformDesk/Events";
export { Courses as PlatformCourses } from "@/pages/PlatformDesk/Courses";
export { Contribute as PlatformContribute } from "@/pages/PlatformDesk/Contribute";
export { AccessCode as PlatformAccessCode } from "@/pages/PlatformDesk/AccessCode";
export { ConsultantPremium as PlatformConsultantPremium } from "@/pages/PlatformDesk/Plans/ConsultantPremium";
export { FormTabsWrapper as PlatformForms } from "@/pages/PlatformDesk/Forms";
export { FormSubmissionsPage as PlatformFormSubmissions } from "@/pages/PlatformDesk/FormsWrapper/FormSubmissionsPage";
export { FormSubmissionDetailPage as PlatformFormSubmissionDetail } from "@/pages/PlatformDesk/FormsWrapper/FormSubmissionDetailPage";
export { CustomFormView } from "@/pages/PlatformDesk/FormsWrapper/CustomForm/CustomFormView";
export { DeskIAM as PlatformDeskIAM } from "@/pages/PlatformDesk/DeskIAM";
export { EditRoleWrapper as PlatformEditRoleWrapper } from "@/pages/PlatformDesk/underDeskIAM/EditRoleWrapper";
export { AddTeamMember as PlatformAddTeamMember } from "@/pages/PlatformDesk/underDeskIAM/AddDeskUser";
export { ManageRoles as PlatformManageRoles } from "@/pages/PlatformDesk/underDeskIAM/ManageRoles";
export { AddNewRole as PlatformAddNewRole } from "@/pages/PlatformDesk/underDeskIAM/AddNewRole";
export { Pay as PlatformPay } from "@/pages/PlatformDesk/Plans/Pay";
export { PayWrapper as PlatformPayWrapper } from "@/pages/PlatformDesk/Plans/PayWrapper";

// Review Desk Components
export { Desk as ReviewDesk } from "@/pages/ReviewDesk/Desk";
export { Pool as ReviewPool } from "@/pages/ReviewDesk/Pool";
export { ConsultantView as ReviewConsultantView } from "@/pages/ReviewDesk/Pages/ConsultantView";
export { ReviewFollowUps } from "@/pages/ReviewDesk/ReviewFollowUps";

// Relations Desk Components
export { Organisation as RelationOuterOrganisation } from "@/pages/RelationDesk/Organisation";
export { Desk as RelationDesk } from "@/pages/RelationDesk/Desk";
export { MyPipeline as RelationPipeline } from "@/pages/RelationDesk/MyPipeline";
export { Pool as RelationPool } from "@/pages/RelationDesk/Pool";
export { Explorers as RelationExplorers } from "@/pages/RelationDesk/Leads/LeadExplorer/Explorers";
export { Coaches as RelationCoaches } from "@/pages/RelationDesk/Leads/Coaches";
export { Organisation as RelationOrganisation } from "@/pages/RelationDesk/Leads/Organisation";
export { ChannelPartners as RelationChannelPartners } from "@/pages/RelationDesk/Leads/ChannelPartners";
export { Partnerships as RelationPartnerships } from "@/pages/RelationDesk/Leads/Partnerships";
export { Problems as RelationProblems } from "@/pages/RelationDesk/Cases/Problems/Problems";
export { Bugs as RelationBugs } from "@/pages/RelationDesk/Cases/Bugs/Bugs";
export { BugsView as RelationBugsView } from "@/pages/RelationDesk/Cases/Bugs/BugsView";
export { Abuses as RelationAbuses } from "@/pages/RelationDesk/Cases/Abuse/Abuses";
export { AbusesView as RelationAbusesView } from "@/pages/RelationDesk/Cases/Abuse/AbusesView";
export { Explorers as RelationExplorersList } from "@/pages/RelationDesk/Explorers";
export { CoachesProfile as RelationCoachesProfile } from "@/pages/RelationDesk/CoachesViewProfile";
export { Coaches as RelationCoachesList } from "@/pages/RelationDesk/Coaches";
export { UserTimeline as RelationUserTimeline } from "@/pages/RelationDesk/Leads/LeadExplorer/UserTimeline";
export { ViewExplorerLead as RelationViewExplorerLead } from "@/pages/RelationDesk/Leads/LeadExplorer/viewExplorerLead";
export { UserMessage as RelationUserMessage } from "@/pages/RelationDesk/UserMessage";
export { NextFollowUpFlow as RelationNextFollowUpFlow } from "@/pages/RelationDesk/nextFollowUpFlow";
export { AddLeadFlow } from "@/pages/RelationDesk/addLeadFlow";
export { MyAccounts } from "@/pages/RelationDesk/MyAcount/MyAccount";
export { CaseDetails } from "@/pages/RelationDesk/MyAcount/CaseDetails";
export { Leaderboard as RelationLeaderboard } from "@/pages/RelationDesk/Leaderboard";
export { ViewProfile as RelationViewProfile } from "@/pages/RelationDesk/ExplorersViewProfile";
export { AddProblem as RelationAddProblem } from "@/pages/RelationDesk/Cases/Problems/AddProblem";
export { ProblemView as RelationProblemView } from "@/pages/RelationDesk/Cases/Problems/ProblemView";
export { AddBug as RelationAddBug } from "@/pages/RelationDesk/Cases/Bugs/AddBug";
export { AddAbuse as RelationAddAbuse } from "@/pages/RelationDesk/Cases/Abuse/AddAbuse";
// Digital Desk Components
export { Desk as DigitalDesk } from "@/pages/DigitalDesk/Desk";
export { Campaigns as DigitalCampaigns } from "@/pages/DigitalDesk/Campaigns";
export { Surveys as DigitalSurveys } from "@/pages/DigitalDesk/Survey/Surveys";
export { ManageQuestion as DigitalManageQuestion } from "@/pages/DigitalDesk/Survey/ManageQuestion";
export { SurveyQuestion as DigitalSurveyQuestion } from "@/pages/DigitalDesk/Survey/SurveyQuestion";
export { Insights as DigitalInsights } from "@/pages/DigitalDesk/CMS/Insights";
export { VideoLibraries as DigitalVideo } from "@/pages/DigitalDesk/CMS/Video";
export { Viewfaq as DigitalViewfaq } from "@/pages/DigitalDesk/CMS/Viewfaq";
export { Faq as DigitalFaq } from "@/pages/DigitalDesk/CMS/Faq";
export { HelpArticles as DigitalHelpArticles } from "@/pages/DigitalDesk/CMS/HelpArticles";
export { InTheNews as DigitalInTheNews } from "@/pages/DigitalDesk/CMS/InTheNews";
export { Testimonials as DigitalTestimonials } from "@/pages/DigitalDesk/CMS/Testimonials";
export { TeamDirectory as DigitalTeamDirectory } from "@/pages/DigitalDesk/CMS/TeamDirectory";
export { Exams as DigitalExams } from "@/pages/DigitalDesk/Libraries/Exams";
export { Careers as DigitalCareers } from "@/pages/DigitalDesk/Libraries/Careers";
export { Degrees as DigitalDegrees } from "@/pages/DigitalDesk/Libraries/Degrees";
export { Courses as DigitalCourses } from "@/pages/DigitalDesk/Libraries/Courses";
export { Scholarships as DigitalScholarships } from "@/pages/DigitalDesk/Libraries/Scholarships";
export { Skills as DigitalSkills } from "@/pages/DigitalDesk/Libraries/Skills";
export { Review as DigitalReview } from "@/pages/DigitalDesk/Engage/Review";
export { Comments as DigitalComments } from "@/pages/DigitalDesk/Engage/Comments";
export { Feedback as DigitalFeedback } from "@/pages/DigitalDesk/Engage/Feedback";
export { Helpful as DigitalHelpful } from "@/pages/DigitalDesk/Engage/Helpful";
export { FileManager as DigitalFileManager } from "@/pages/DigitalDesk/FileManager";
export { MetaInformation as DigitalMetaInformation } from "@/pages/DigitalDesk/MetaInformation";

// Finance Desk Components
export { Finance as FinanceDesk } from "@/pages/FinanceDesk/Finance";
export { Payments as FinancePayments } from "@/pages/FinanceDesk/Payments";
export { Commission as FinanceCommission } from "@/pages/FinanceDesk/Commission";
export { Payout as FinancePayout } from "@/pages/FinanceDesk/Payout";
export { Platform as FinancePlatform } from "@/pages/FinanceDesk/Platform";
export { Earning as FinanceEarning } from "@/pages/FinanceDesk/Earning";
export { Reports as FinanceReports } from "@/pages/FinanceDesk/Reports";
export { Withdrawal as FinanceWithdrawal } from "@/pages/FinanceDesk/Withdrawal";
export { ViewPayment as FinanceViewPayment } from "@/pages/FinanceDesk/ViewPayment";

// DevOps Desk Components
export { DevopsDesk } from "@/pages/DevopsDesk/DevopsDesk";
export { MyCase as DevopsMycases } from "@/pages/DevopsDesk/Mycases";
export { Cases as DevopsCases } from "@/pages/DevopsDesk/Cases";
export { Leaderboard as DevopsLeaderboard } from "@/pages/DevopsDesk/Leaderboard";

// HRMS Desk Components
export { Desk as HRMSDesk } from "@/pages/HRMS/Desk";
export { FollowUp as HRMSFollowUp } from "@/pages/HRMS/FollowUp";
export { CurrenOpenings as HRMSCurrentOpening } from "@/pages/HRMS/CurrenOpenings";
export { JobApplication as HRMSJobApplication } from "@/pages/HRMS/JobApplication";

// Common components
export { default as Login } from "@/pages/Login";
