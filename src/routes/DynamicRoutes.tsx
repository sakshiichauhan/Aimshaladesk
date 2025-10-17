import { lazy } from "react";

// Create lazy-loaded components for all routes
// Platform Desk Components
export const PlatformDesk = lazy(() => import("@/pages/PlatformDesk/Desk").then(m => ({ default: m.Desk })));
export const PlatformRecentActivities = lazy(() => import("@/pages/PlatformDesk/RecentActivities").then(m => ({ default: m.RecentActivities })));
export const PlatformAssessment = lazy(() => import("@/pages/PlatformDesk/Assessment/Assessments").then(m => ({ default: m.Assessments })));
export const PlatformAssessmentManage = lazy(() => import("@/pages/PlatformDesk/Assessment/Manage").then(m => ({ default: m.Manage })));
export const PlatformQuestions = lazy(() => import("@/pages/PlatformDesk/Assessment/Question").then(m => ({ default: m.Question })));
export const PlatformSessions = lazy(() => import("@/pages/PlatformDesk/Sessions/Sessions").then(m => ({ default: m.Sessions })));
export const PlatformCoachExpertise = lazy(() => import("@/pages/PlatformDesk/Sessions/CoachExpertise"));
// export const PlatformSessionPool = lazy(() => import("@/pages/PlatformDesk/Sessions/SessionPool").then(m => ({ default: m.SessionPool })));
export const AimshalaSessionsPool = lazy(() => import("@/pages/PlatformDesk/Sessions/AimshalaExperties").then(m => ({ default: m.AimshalaSessionsPool })));
export const PlatformViewSession = lazy(() => import("@/pages/PlatformDesk/Sessions/ViewSession").then(m => ({ default: m.ViewSession })));
export const PlatformMasterclass = lazy(() => import("@/pages/PlatformDesk/Sessions/Masterclass").then(m => ({ default: m.Masterclass })));
export const PlatformEvents = lazy(() => import("@/pages/PlatformDesk/Events").then(m => ({ default: m.Events })));
export const PlatformCourses = lazy(() => import("@/pages/PlatformDesk/Courses").then(m => ({ default: m.Courses })));
export const PlatformContribute = lazy(() => import("@/pages/PlatformDesk/Contribute").then(m => ({ default: m.Contribute })));
export const PlatformAccessCode = lazy(() => import("@/pages/PlatformDesk/AccessCode").then(m => ({ default: m.AccessCode })));
export const PlatformConsultantPremium = lazy(() => import("@/pages/PlatformDesk/Plans/ConsultantPremium").then(m => ({ default: m.ConsultantPremium })));
export const PlatformForms = lazy(() => import("@/pages/PlatformDesk/Forms").then(m => ({ default: m.FormTabsWrapper })));
export const PlatformFormSubmissions = lazy(() => import("@/pages/PlatformDesk/FormsWrapper/FormSubmissionsPage").then(m => ({ default: m.FormSubmissionsPage })));
export const PlatformFormSubmissionDetail = lazy(() => import("@/pages/PlatformDesk/FormsWrapper/FormSubmissionDetailPage").then(m => ({ default: m.FormSubmissionDetailPage })));
export const CustomFormView = lazy(() => import("@/pages/PlatformDesk/FormsWrapper/CustomForm/CustomFormView").then(m => ({ default: m.CustomFormView })));
export const PlatformDeskIAM = lazy(() => import("@/pages/PlatformDesk/DeskIAM").then(m => ({ default: m.DeskIAM })));
export const PlatformEditRoleWrapper = lazy(() => import("@/pages/PlatformDesk/underDeskIAM/EditRoleWrapper").then(m => ({ default: m.EditRoleWrapper })));
export const PlatformAddTeamMember = lazy(() => import("@/pages/PlatformDesk/underDeskIAM/AddDeskUser").then(m => ({ default: m.AddTeamMember })));
export const PlatformManageRoles = lazy(() => import("@/pages/PlatformDesk/underDeskIAM/ManageRoles").then(m => ({ default: m.ManageRoles })));
export const PlatformAddNewRole = lazy(() => import("@/pages/PlatformDesk/underDeskIAM/AddNewRole").then(m => ({ default: m.AddNewRole })));
export const PlatformPay = lazy(() => import("@/pages/PlatformDesk/Plans/Pay").then(m => ({ default: m.Pay })));
export const PlatformPayWrapper = lazy(() => import("@/pages/PlatformDesk/Plans/PayWrapper").then(m => ({ default: m.PayWrapper })));

// Review Desk Components
export const ReviewDesk = lazy(() => import("@/pages/ReviewDesk/Desk").then(m => ({ default: m.Desk })));
export const ReviewPool = lazy(() => import("@/pages/ReviewDesk/Pool").then(m => ({ default: m.Pool })));
export const ReviewConsultantView = lazy(() => import("@/pages/ReviewDesk/Pages/ConsultantView").then(m => ({ default: m.ConsultantView })));
export const ReviewFollowUps = lazy(() => import("@/pages/ReviewDesk/ReviewFollowUps").then(m => ({ default: m.ReviewFollowUps })));

// Relations Desk Components
export const RelationOuterOrganisation = lazy(() => import("@/pages/RelationDesk/Organisation").then(m => ({ default: m.Organisation })));
export const RelationDesk = lazy(() => import("@/pages/RelationDesk/Desk").then(m => ({ default: m.Desk })));
export const RelationPipeline = lazy(() => import("@/pages/RelationDesk/MyPipeline").then(m => ({ default: m.MyPipeline })));
export const RelationPool = lazy(() => import("@/pages/RelationDesk/Pool").then(m => ({ default: m.Pool })));
export const RelationExplorers = lazy(() => import("@/pages/RelationDesk/Leads/LeadExplorer/Explorers").then(m => ({ default: m.Explorers })));
export const RelationCoaches = lazy(() => import("@/pages/RelationDesk/Leads/Coaches").then(m => ({ default: m.Coaches })));
export const RelationOrganisation = lazy(() => import("@/pages/RelationDesk/Leads/Organisation").then(m => ({ default: m.Organisation })));
export const RelationChannelPartners = lazy(() => import("@/pages/RelationDesk/Leads/ChannelPartners").then(m => ({ default: m.ChannelPartners })));
export const RelationPartnerships = lazy(() => import("@/pages/RelationDesk/Leads/Partnerships").then(m => ({ default: m.Partnerships })));
export const RelationProblems = lazy(() => import("@/pages/RelationDesk/Cases/Problems/Problems").then(m => ({ default: m.Problems })));
export const RelationBugs = lazy(() => import("@/pages/RelationDesk/Cases/Bugs/Bugs").then(m => ({ default: m.Bugs })));
export const RelationBugsView = lazy(() => import("@/pages/RelationDesk/Cases/Bugs/BugsView").then(m => ({ default: m.BugsView })));
export const RelationAbuses = lazy(() => import("@/pages/RelationDesk/Cases/Abuse/Abuses").then(m => ({ default: m.Abuses })));
export const RelationAbusesView = lazy(() => import("@/pages/RelationDesk/Cases/Abuse/AbusesView").then(m => ({ default: m.AbusesView })));
export const RelationExplorersList = lazy(() => import("@/pages/RelationDesk/Explorers").then(m => ({ default: m.Explorers })));
export const RelationCoachesProfile = lazy(() => import("@/pages/RelationDesk/CoachesViewProfile").then(m => ({ default: m.CoachesProfile })));
export const RelationCoachesList = lazy(() => import("@/pages/RelationDesk/Coaches").then(m => ({ default: m.Coaches })));
export const RelationUserTimeline = lazy(() => import("@/pages/RelationDesk/Leads/LeadExplorer/UserTimeline").then(m => ({ default: m.UserTimeline })));
export const RelationViewExplorerLead = lazy(() => import("@/pages/RelationDesk/Leads/LeadExplorer/viewExplorerLead").then(m => ({ default: m.ViewExplorerLead })));
export const RelationUserMessage = lazy(() => import("@/pages/RelationDesk/UserMessage").then(m => ({ default: m.UserMessage })));
export const RelationNextFollowUpFlow = lazy(() => import("@/pages/RelationDesk/nextFollowUpFlow").then(m => ({ default: m.NextFollowUpFlow })));
export const AddLeadFlow = lazy(() => import("@/pages/RelationDesk/addLeadFlow").then(m => ({ default: m.AddLeadFlow })));
export const MyAccounts = lazy(() => import("@/pages/RelationDesk/MyAcount/MyAccount").then(m => ({ default: m.MyAccounts })));
export const CaseDetails = lazy(() => import("@/pages/RelationDesk/MyAcount/CaseDetails").then(m => ({ default: m.CaseDetails })));
export const RelationLeaderboard = lazy(() => import("@/pages/RelationDesk/Leaderboard").then(m => ({ default: m.Leaderboard })));
export const RelationViewProfile = lazy(() => import("@/pages/RelationDesk/ExplorersViewProfile").then(m => ({ default: m.ViewProfile })));
export const RelationAddProblem = lazy(() => import("@/pages/RelationDesk/Cases/Problems/AddProblem").then(m => ({ default: m.AddProblem })));
export const RelationProblemView = lazy(() => import("@/pages/RelationDesk/Cases/Problems/ProblemView").then(m => ({ default: m.ProblemView })));
export const RelationAddBug = lazy(() => import("@/pages/RelationDesk/Cases/Bugs/AddBug").then(m => ({ default: m.AddBug })));
export const RelationAddAbuse = lazy(() => import("@/pages/RelationDesk/Cases/Abuse/AddAbuse").then(m => ({ default: m.AddAbuse })));
// Digital Desk Components
export const DigitalDesk = lazy(() => import("@/pages/DigitalDesk/Desk").then(m => ({ default: m.Desk })));
export const DigitalCampaigns = lazy(() => import("@/pages/DigitalDesk/Campaigns").then(m => ({ default: m.Campaigns })));
export const DigitalSurveys = lazy(() => import("@/pages/DigitalDesk/Survey/Surveys").then(m => ({ default: m.Surveys })));
export const DigitalManageQuestion = lazy(() => import("@/pages/DigitalDesk/Survey/ManageQuestion").then(m => ({ default: m.ManageQuestion })));
export const DigitalSurveyQuestion = lazy(() => import("@/pages/DigitalDesk/Survey/SurveyQuestion").then(m => ({ default: m.SurveyQuestion })));
export const DigitalInsights = lazy(() => import("@/pages/DigitalDesk/CMS/Insights").then(m => ({ default: m.Insights })));
export const DigitalVideo = lazy(() => import("@/pages/DigitalDesk/CMS/Video").then(m => ({ default: m.VideoLibraries })));
export const DigitalViewfaq = lazy(() => import("@/pages/DigitalDesk/CMS/Viewfaq").then(m => ({ default: m.Viewfaq })));
export const DigitalFaq = lazy(() => import("@/pages/DigitalDesk/CMS/Faq").then(m => ({ default: m.Faq })));
export const DigitalHelpArticles = lazy(() => import("@/pages/DigitalDesk/CMS/HelpArticles").then(m => ({ default: m.HelpArticles })));
export const DigitalInTheNews = lazy(() => import("@/pages/DigitalDesk/CMS/InTheNews").then(m => ({ default: m.InTheNews })));
export const DigitalTestimonials = lazy(() => import("@/pages/DigitalDesk/CMS/Testimonials").then(m => ({ default: m.Testimonials })));
export const DigitalTeamDirectory = lazy(() => import("@/pages/DigitalDesk/CMS/TeamDirectory").then(m => ({ default: m.TeamDirectory })));
export const DigitalExams = lazy(() => import("@/pages/DigitalDesk/Libraries/Exams").then(m => ({ default: m.Exams })));
export const DigitalCareers = lazy(() => import("@/pages/DigitalDesk/Libraries/Careers").then(m => ({ default: m.Careers })));
export const DigitalDegrees = lazy(() => import("@/pages/DigitalDesk/Libraries/Degrees").then(m => ({ default: m.Degrees })));
export const DigitalCourses = lazy(() => import("@/pages/DigitalDesk/Libraries/Courses").then(m => ({ default: m.Courses })));
export const DigitalScholarships = lazy(() => import("@/pages/DigitalDesk/Libraries/Scholarships").then(m => ({ default: m.Scholarships })));
export const DigitalSkills = lazy(() => import("@/pages/DigitalDesk/Libraries/Skills").then(m => ({ default: m.Skills })));
export const DigitalReview = lazy(() => import("@/pages/DigitalDesk/Engage/Review").then(m => ({ default: m.Review })));
export const DigitalComments = lazy(() => import("@/pages/DigitalDesk/Engage/Comments").then(m => ({ default: m.Comments })));
export const DigitalFeedback = lazy(() => import("@/pages/DigitalDesk/Engage/Feedback").then(m => ({ default: m.Feedback })));
export const DigitalHelpful = lazy(() => import("@/pages/DigitalDesk/Engage/Helpful").then(m => ({ default: m.Helpful })));
export const DigitalFileManager = lazy(() => import("@/pages/DigitalDesk/FileManager").then(m => ({ default: m.FileManager })));
export const DigitalMetaInformation = lazy(() => import("@/pages/DigitalDesk/MetaInformation").then(m => ({ default: m.MetaInformation })));

// Finance Desk Components
export const FinanceDesk = lazy(() => import("@/pages/FinanceDesk/Finance").then(m => ({ default: m.Finance })));
export const FinancePayments = lazy(() => import("@/pages/FinanceDesk/Payments").then(m => ({ default: m.Payments })));
export const FinanceCommission = lazy(() => import("@/pages/FinanceDesk/Commission").then(m => ({ default: m.Commission })));
export const FinancePayout = lazy(() => import("@/pages/FinanceDesk/Payout").then(m => ({ default: m.Payout })));
export const FinancePlatform = lazy(() => import("@/pages/FinanceDesk/Platform").then(m => ({ default: m.Platform })));
export const FinanceEarning = lazy(() => import("@/pages/FinanceDesk/Earning").then(m => ({ default: m.Earning })));
export const FinanceReports = lazy(() => import("@/pages/FinanceDesk/Reports").then(m => ({ default: m.Reports })));
export const FinanceWithdrawal = lazy(() => import("@/pages/FinanceDesk/Withdrawal").then(m => ({ default: m.Withdrawal })));
export const FinanceViewPayment = lazy(() => import("@/pages/FinanceDesk/ViewPayment").then(m => ({ default: m.ViewPayment })));

// DevOps Desk Components
export const DevopsDesk = lazy(() => import("@/pages/DevopsDesk/DevopsDesk").then(m => ({ default: m.DevopsDesk })));
export const DevopsMycases = lazy(() => import("@/pages/DevopsDesk/Mycases").then(m => ({ default: m.MyCase })));
export const DevopsCases = lazy(() => import("@/pages/DevopsDesk/Cases").then(m => ({ default: m.Cases })));
export const DevopsLeaderboard = lazy(() => import("@/pages/DevopsDesk/Leaderboard").then(m => ({ default: m.Leaderboard })));

// HRMS Desk Components
export const HRMSDesk = lazy(() => import("@/pages/HRMS/Desk").then(m => ({ default: m.Desk })));
export const HRMSFollowUp = lazy(() => import("@/pages/HRMS/FollowUp").then(m => ({ default: m.FollowUp })));
export const HRMSCurrentOpening = lazy(() => import("@/pages/HRMS/CurrenOpenings").then(m => ({ default: m.CurrenOpenings })));
export const HRMSJobApplication = lazy(() => import("@/pages/HRMS/JobApplication").then(m => ({ default: m.JobApplication })));

// Common components
export const Login = lazy(() => import("@/pages/Login"));
